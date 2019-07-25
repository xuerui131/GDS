using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class ExcelUtility : IDisposable
    {
        private string fileName = null; //文件名
        private bool disposed;

        public ExcelUtility(string fileName)
        {
            this.fileName = fileName;
            disposed = false;
        }

        /// <summary>
        /// 将DataTable数据导入到excel中
        /// </summary>
        /// <param name="data">要导入的数据</param>
        /// <param name="isColumnWritten">DataTable的列名是否要导入</param>
        /// <param name="sheetName">要导入的excel的sheet的名称</param>
        /// <returns>导入数据行数(包含列名那一行)</returns>
        public int DataTableToExcel(DataTable data, string sheetName, bool isColumnWritten)
        {
            var totalCount = 0;
            ISheet sheet = null;
            IWorkbook workbook = null;

            using (var fs = new FileStream(fileName, FileMode.OpenOrCreate, FileAccess.ReadWrite))
            {
                if (fileName.IndexOf(".xlsx") > 0) // 2007版本
                    workbook = new XSSFWorkbook();
                else if (fileName.IndexOf(".xls") > 0) // 2003版本
                    workbook = new HSSFWorkbook();

                try
                {
                    if (workbook != null)
                    {
                        sheet = workbook.CreateSheet(sheetName);
                    }
                    else
                    {
                        return -1;
                    }

                    if (isColumnWritten == true) //写入DataTable的列名
                    {
                        IRow row = sheet.CreateRow(0);
                        for (var j = 0; j < data.Columns.Count; ++j)
                        {
                            row.CreateCell(j).SetCellValue(data.Columns[j].ColumnName);
                        }

                        totalCount = 1;
                    }
                    else
                    {
                        totalCount = 0;
                    }

                    for (var i = 0; i < data.Rows.Count; ++i)
                    {
                        IRow row = sheet.CreateRow(totalCount);

                        for (var j = 0; j < data.Columns.Count; ++j)
                        {
                            row.CreateCell(j).SetCellValue(data.Rows[i][j].ToString());
                        }

                        ++totalCount;
                    }

                    workbook.Write(fs);

                    return totalCount;
                }
                catch (Exception ex)
                {
                    Loger.LogErr(ex);
                    Console.WriteLine("Exception: " + ex.Message);
                    return -1;
                }
            }
        }

        /// <summary>
        /// 获取所有Sheet
        /// </summary>
        /// <returns></returns>
        public IList<ISheet> GetAllSheet()
        {
            IList<ISheet> allSheet = new List<ISheet>();
            IWorkbook workbook = null;

            try
            {
                using (var fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                {
                    if (fileName.IndexOf(".xlsx") > 0) // 2007版本
                        workbook = new XSSFWorkbook(fs);
                    else if (fileName.IndexOf(".xls") > 0) // 2003版本
                        workbook = new HSSFWorkbook(fs);

                    var sheetCount = workbook.NumberOfSheets;
                    for (var i = 0; i < sheetCount; i++)
                    {
                        var sheet = workbook.GetSheetAt(i);

                        allSheet.Add(sheet);
                    }
                }

                return allSheet;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                Console.WriteLine("Exception: " + ex.Message);
                return null;
            }
        }

        /// <summary>
        /// 将excel中的数据导入到DataSet中
        /// </summary>
        /// <param name="isFirstRowColumn">第一行是否是DataTable的列名</param>
        /// <returns>返回的DataSet</returns>
        public DataSet ExcelToDataSet(bool isFirstRowColumn)
        {
            DataSet result = new DataSet();

            try
            {
                var allSheet = GetAllSheet();

                for (var i = 0; i < allSheet.Count; i++)
                {
                    var dataTable = ExcelToDataTable(i, isFirstRowColumn);
                    result.Tables.Add(dataTable);
                }

                return result;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                Console.WriteLine("Exception: " + ex.Message);
                return null;
            }
        }

        /// <summary>
        /// 将excel中的数据导入到DataTable中
        /// </summary>
        /// <param name="sheetName">excel工作薄sheet的名称</param>
        /// <param name="isFirstRowColumn">第一行是否是DataTable的列名</param>
        /// <returns>返回的DataTable</returns>
        public DataTable ExcelToDataTable(int sheetIndex, bool isFirstRowColumn)
        {
            DataTable result = new DataTable();
            IWorkbook workbook = null;
            ISheet sheet = null;
            var startRow = 0;

            IFormulaEvaluator evalor = null;

            try
            {
                using (var fs = new FileStream(fileName, FileMode.Open, FileAccess.Read))
                {
                    if (fileName.IndexOf(".xlsx") > 0) // 2007版本
                    {
                        workbook = new XSSFWorkbook(fs);
                        evalor = new XSSFFormulaEvaluator(workbook);
                    }

                    else if (fileName.IndexOf(".xls") > 0) // 2003版本
                    {
                        workbook = new HSSFWorkbook(fs);
                        evalor = new HSSFFormulaEvaluator(workbook);
                    }


                    sheet = workbook.GetSheetAt(sheetIndex);

                    sheet.ForceFormulaRecalculation = true;  //解决计算列为空的问题

                    if (sheet == null)
                    {
                        return result;
                    }

                    IRow firstRow = sheet.GetRow(0);
                    if (firstRow == null)
                    {
                        return result;
                    }

                    int cellCount = firstRow.LastCellNum; //一行最后一个cell的编号 即总的列数

                    if (isFirstRowColumn)
                    {
                        for (int i = firstRow.FirstCellNum; i < cellCount; ++i)
                        {
                            ICell cell = firstRow.GetCell(i);
                            if (cell != null)
                            {
                                
                                string cellValue = cell.StringCellValue;
                                if (string.IsNullOrEmpty(cellValue) == false)
                                {
                                    if (result.Columns.Contains(cellValue) == false)
                                    {
                                        DataColumn column = new DataColumn(cellValue);
                                        result.Columns.Add(column);
                                    }
                                    else
                                    {
                                        var repeatColumn = cellValue + "_R";
                                        while (result.Columns.Contains(repeatColumn))
                                        {
                                            repeatColumn = repeatColumn + "_R";
                                        }

                                        DataColumn column = new DataColumn(repeatColumn);
                                        result.Columns.Add(column);
                                    }
                                }
                                else //解决空的赋值问题
                                {
                                    DataColumn column = new DataColumn("");
                                    result.Columns.Add(column);
                                }
                            }
                        }
                        startRow = sheet.FirstRowNum + 1;
                    }
                    else
                    {
                        startRow = sheet.FirstRowNum;
                    }

                    //最后一列的标号
                    int rowCount = sheet.LastRowNum;
                    for (int i = startRow; i <= rowCount; ++i)
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue; //没有数据的行默认是null

                        DataRow dataRow = result.NewRow();

                        if (row.FirstCellNum > -1)
                        {
                            for (int j = row.FirstCellNum; j < cellCount; ++j)
                            {
                                var cell = row.GetCell(j);
                                if (cell == null)
                                {
                                    dataRow[j] = "";
                                }
                                else
                                {
                                    //CellType(Unknown = -1,Numeric = 0,String = 1,Formula = 2,Blank = 3,Boolean = 4,Error = 5,)  
                                    switch (cell.CellType)
                                    {
                                        case CellType.Blank:
                                            dataRow[j] = "";
                                            break;
                                        case CellType.Numeric:
                                            short format = cell.CellStyle.DataFormat;
                                            //对时间格式（2015.12.5、2015/12/5、2015-12-5等）的处理  
                                            if (format == 14 || format == 31 || format == 57 || format == 58)
                                                dataRow[j] = cell.DateCellValue;
                                            else
                                                dataRow[j] = cell.NumericCellValue;
                                            break;
                                        case CellType.String:
                                            dataRow[j] = cell.StringCellValue;
                                            break;
                                        case CellType.Formula:
                                            var formulaValue = evalor.Evaluate(cell);
                                            if (formulaValue.CellType == CellType.Numeric)
                                            {
                                                dataRow[j] = formulaValue.NumberValue;
                                            }
                                            else if (formulaValue.CellType == CellType.String)
                                            {
                                                dataRow[j] = formulaValue.StringValue;
                                            }

                                            break;

                                    }
                                }
                            }
                        }

                        result.Rows.Add(dataRow);
                    }

                    result.TableName = sheet.SheetName;
                }

                return result;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                Console.WriteLine("Exception: " + ex.Message);
                return null;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                }

                disposed = true;
            }
        }
    }
}