using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace GDS.Comon.Utility
{
    public class ExportExcelHelp
    {
        public void ExportExcel(DataTable dt)
        {
            try
            {
                //创建一个工作簿
                IWorkbook workbook = new HSSFWorkbook();

                //创建一个 sheet 表
                ISheet sheet = workbook.CreateSheet(dt.TableName);

                //创建一行
                IRow rowH = sheet.CreateRow(0);

                //创建一个单元格
                ICell cell = null;

                //创建单元格样式
                ICellStyle cellStyle = workbook.CreateCellStyle();

                //创建格式
                IDataFormat dataFormat = workbook.CreateDataFormat();

                //设置为文本格式，也可以为 text，即 dataFormat.GetFormat("text");
                cellStyle.DataFormat = dataFormat.GetFormat("@");

                //设置列名
                foreach (DataColumn col in dt.Columns)
                {
                    //创建单元格并设置单元格内容
                    rowH.CreateCell(col.Ordinal).SetCellValue(col.Caption);

                    //设置单元格格式
                    rowH.Cells[col.Ordinal].CellStyle = cellStyle;
                }

                //写入数据
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    //跳过第一行，第一行为列名
                    IRow row = sheet.CreateRow(i + 1);

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        cell = row.CreateCell(j);
                        cell.SetCellValue(dt.Rows[i][j].ToString());
                        cell.CellStyle = cellStyle;
                    }
                }

                //设置导出文件路径
                string path = HttpContext.Current.Server.MapPath("/ImportExcel/");

                //设置新建文件路径及名称
                string savePath = path + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls";

                //创建文件
                FileStream file = new FileStream(savePath, FileMode.CreateNew, FileAccess.Write);

                //创建一个 IO 流
                MemoryStream ms = new MemoryStream();

                //写入到流
                workbook.Write(ms);

                //转换为字节数组
                byte[] bytes = ms.ToArray();

                file.Write(bytes, 0, bytes.Length);
                file.Flush();

                //还可以调用下面的方法，把流输出到浏览器下载
                OutputClient(bytes);

                //释放资源
                bytes = null;

                ms.Close();
                ms.Dispose();

                file.Close();
                file.Dispose();

                workbook.Close();
                sheet = null;
                workbook = null;
            }
            catch (Exception ex)
            {

            }
        }

        public void OutputClient(byte[] bytes)
        {
            HttpResponse response = HttpContext.Current.Response;

            response.Buffer = true;

            response.Clear();
            response.ClearHeaders();
            response.ClearContent();

            response.ContentType = "application/vnd.ms-excel";
            response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}.xls", DateTime.Now.ToString("yyyyMMddHHmmss")));

            response.Charset = "GB2312";
            response.ContentEncoding = Encoding.GetEncoding("GB2312");

            response.BinaryWrite(bytes);
            response.Flush();

            response.Close();
        }

        //生成xlsx后缀
        public void OutputClientXlsx(byte[] bytes)
        {
            HttpResponse response = HttpContext.Current.Response;

            response.Buffer = true;

            response.Clear();
            response.ClearHeaders();
            response.ClearContent();

            response.ContentType = "application/vnd.ms-excel";
            response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}.xlsx", DateTime.Now.ToString("yyyyMMddHHmmss")));

            response.Charset = "GB2312";
            response.ContentEncoding = Encoding.GetEncoding("GB2312");

            response.BinaryWrite(bytes);
            response.Flush();

            response.Close();
        }


        public void ExportExcelDouble(DataTable dt)
        {
            try
            {
                //创建一个工作簿
                IWorkbook workbook = new HSSFWorkbook();

                //创建一个 sheet 表
                ISheet sheet = workbook.CreateSheet(dt.TableName);

                //创建第一行
                IRow rowFirst = sheet.CreateRow(0);

                //创建第二行
                IRow rowSecond = sheet.CreateRow(1);

                //创建一个单元格
                ICell cell = null;

                //创建单元格样式
                ICellStyle cellStyle = workbook.CreateCellStyle();
                cellStyle.VerticalAlignment = VerticalAlignment.Justify;//垂直对齐(默认应该为center，如果center无效则用justify)
                cellStyle.Alignment = HorizontalAlignment.Center;//水平对齐
                //创建格式
                IDataFormat dataFormat = workbook.CreateDataFormat();

                //设置为文本格式，也可以为 text，即 dataFormat.GetFormat("text");
                cellStyle.DataFormat = dataFormat.GetFormat("@");

                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 0, 2));
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 3, 5));
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 6, 8));
                sheet.AddMergedRegion(new CellRangeAddress(0, 0, 10, 12));

                rowFirst.CreateCell(0).SetCellValue("考试内容");
                rowFirst.Cells[0].CellStyle = cellStyle;

                rowFirst.CreateCell(3).SetCellValue("考试要求");
                rowFirst.Cells[1].CellStyle = cellStyle;

                rowFirst.CreateCell(6).SetCellValue("难度值");
                rowFirst.Cells[2].CellStyle = cellStyle;

                rowFirst.CreateCell(9).SetCellValue("题型");
                rowFirst.Cells[3].CellStyle = cellStyle;

                rowFirst.CreateCell(10).SetCellValue("题目来源");
                rowFirst.Cells[4].CellStyle = cellStyle;


                //设置列名
                foreach (DataColumn col in dt.Columns)
                {
                    //创建单元格并设置单元格内容
                    rowSecond.CreateCell(col.Ordinal).SetCellValue(col.Caption);

                    //设置单元格格式
                    rowSecond.Cells[col.Ordinal].CellStyle = cellStyle;
                }

                //写入数据
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    //跳过第一行，第一行为列名
                    IRow row = sheet.CreateRow(i + 2);

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        cell = row.CreateCell(j);
                        cell.SetCellValue(dt.Rows[i][j].ToString());
                        cell.CellStyle = cellStyle;
                    }
                }

                //设置导出文件路径
                string path = HttpContext.Current.Server.MapPath("/ImportExcel/");

                //设置新建文件路径及名称
                string savePath = path + DateTime.Now.ToString("yyyyMMddHHmmss") + ".xls";

                //创建文件
                FileStream file = new FileStream(savePath, FileMode.CreateNew, FileAccess.Write);

                //创建一个 IO 流
                MemoryStream ms = new MemoryStream();

                //写入到流
                workbook.Write(ms);

                //转换为字节数组
                byte[] bytes = ms.ToArray();

                file.Write(bytes, 0, bytes.Length);
                file.Flush();

                //还可以调用下面的方法，把流输出到浏览器下载
                OutputClient(bytes);

                //释放资源
                bytes = null;

                ms.Close();
                ms.Dispose();

                file.Close();
                file.Dispose();

                workbook.Close();
                sheet = null;
                workbook = null;
            }
            catch (Exception ex)
            {

            }
        }
    }
}