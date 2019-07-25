using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class ExcelHelper
    {
        /// <summary>
        /// 读取Excel
        /// </summary>
        /// <param name="Path"></param>
        /// <returns></returns>
        public static DataSet ExcelToDS(string fileName)
        {
            string fileType = "";
            var arr = fileName.Split('.');
            fileType = arr[arr.Length - 1];
            string strConn = "";
            if (fileType == ".xls")
                strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + fileName + ";" + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";
            else
                strConn = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + fileName + ";" + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1\"";

            OleDbConnection conn = new OleDbConnection(strConn);
            conn.Open();
            string strExcel = "";
            OleDbDataAdapter myCommand = null;
            DataSet ds = null;
            strExcel = "select * from [sheet1$]";
            myCommand = new OleDbDataAdapter(strExcel, strConn);
            ds = new DataSet();
            myCommand.Fill(ds, "table1");
            return ds;
        }

        //Excel数据转DataTable 使用的oledb读取方式
        public static DataTable ReadExcelToDataTable(string filePath)
        {
            string fileType = Path.GetExtension(filePath);
            string strConn = "";
            if (fileType == ".xls")
                strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + filePath + ";" + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";
            else
                strConn = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + filePath + ";" + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1\"";

            OleDbDataAdapter adapter = new OleDbDataAdapter("select * From[Sheet1$]", strConn); //默认读取的Sheet1,你也可以把它封装变量,动态读取你的Sheet工作表
            DataTable table = new DataTable("TempTable");
            adapter.Fill(table);

            return table;
        }


     
        /// <summary>
        /// 连接Excel
        /// </summary>
        /// <returns></returns>
        public static OleDbConnection Conn(string filePath)
        {
            string fileType = Path.GetExtension(filePath);
            string strConn = "";
            if (fileType == ".xls")
                strConn = "Provider=Microsoft.Jet.OLEDB.4.0;" + "Data Source=" + filePath + ";" + ";Extended Properties=\"Excel 8.0;HDR=YES;IMEX=1\"";
            else
                strConn = "Provider=Microsoft.ACE.OLEDB.12.0;" + "Data Source=" + filePath + ";" + ";Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1\"";
            OleDbConnection conn = new OleDbConnection(strConn);

            return conn;
        }

        /// <summary>
        /// 读取所有工作薄
        /// </summary>
        /// <returns></returns>
        public static string[] GetAllExeclWorkBook(string filePath)
        {
            using (OleDbConnection conn = Conn(filePath))
            {
                conn.Open();
                DataTable SheetNames = conn.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);

                string[] TableNames = new string[SheetNames.Rows.Count];
                for (int k = 0; k < SheetNames.Rows.Count; ++k)
                {
                    TableNames[k] = SheetNames.Rows[k][2].ToString();
                }
                return TableNames;
            }
        }

        /// <summary>
        /// 根据Sql读取Excel中的数据
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static DataTable Query(string sql, string DataTableName, string filePath)
        {
            using (OleDbConnection conn = Conn(filePath))
            {
                conn.Open();
                OleDbDataAdapter da = new OleDbDataAdapter(sql, conn);
                DataTable ds = new DataTable();
                da.Fill(ds, DataTableName);
                return ds;
            }
        }
    }
}
