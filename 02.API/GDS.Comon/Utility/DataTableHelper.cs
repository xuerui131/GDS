using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class DataTableHelper
    {
        /// datatable去重  
        /// </summary>  
        /// <param name="dtSource">需要去重的datatable</param>  
        /// <param name="columnNames">依据哪些列去重</param>  
        /// <returns></returns>  
        public static DataTable GetDistinctTable(DataTable dtSource, params string[] columnNames)
        {
            DataTable distinctTable = dtSource.Clone();
            try
            {
                if (dtSource != null && dtSource.Rows.Count > 0)
                {
                    DataView dv = new DataView(dtSource);
                    distinctTable = dv.ToTable(true, columnNames);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
            }
            return distinctTable;
        }

        /// <summary>  
        /// datatable去重  
        /// </summary>  
        /// <param name="dtSource">需要去重的datatable</param>  
        /// <returns></returns>  
        public static DataTable GetDistinctTable(DataTable dtSource)
        {
            DataTable distinctTable = null;
            try
            {
                if (dtSource != null && dtSource.Rows.Count > 0)
                {
                    string[] columnNames = GetTableColumnName(dtSource);
                    DataView dv = new DataView(dtSource);
                    distinctTable = dv.ToTable(true, columnNames);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
            }
            return distinctTable;
        }

        //获取所有列名
        public static string[] GetTableColumnName(DataTable dt)
        {
            string cols = string.Empty;
            for (int i = 0; i < dt.Columns.Count; i++)
            {
                cols += (dt.Columns[i].ColumnName + ",");
            }
            cols = cols.TrimEnd(',');
            return cols.Split(',');
        }

        //判断指定列是否包含中文字符
        public static bool ExistChinesePunctuation(DataTable dt, string column)
        {
            if (dt.Columns.Contains(column))
            {
                foreach (DataRow row in dt.Rows)
                {
                    if (StringHelper.IsChinesePunctuation(row[column].ToString()))
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
