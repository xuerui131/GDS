using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class Mapper
    {
        public static object ToEntity(DataRow adaptedRow, Type entityType)
        {
            if (entityType == null || adaptedRow == null)
            {
                return null;
            }

            object entity = Activator.CreateInstance(entityType);
            CopyToEntity(entity, adaptedRow);

            return entity;
        }

        public static T ToEntity<T>(DataRow adaptedRow) where T : new()
        {
            T item = new T();
            if (adaptedRow == null)
            {
                return item;
            }

            item = Activator.CreateInstance<T>();
            CopyToEntity(item, adaptedRow);

            return item;
        }

        public static IList<T> ToListEntity<T>(DataTable dt, IList<T> list) where T : new()
        {
            IList<T> listResult = new List<T>();



            if (dt == null || dt.Rows.Count == 0 || list == null)
            {
                return null;
            }
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                T item = new T();
                CopyToEntity(item, dt.Rows[i]);
                listResult.Add(item);
            }

            return listResult;
        }
        public static IList<T> ToListEntity<T>(DataTable dt) where T : new()
        {
            IList<T> listResult = new List<T>();



            if (dt == null || dt.Rows.Count == 0)
            {
                return null;
            }
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                T item = new T();
                CopyToEntity(item, dt.Rows[i]);
                listResult.Add(item);
            }

            return listResult;
        }
        public static void CopyToEntity(object entity, DataRow adaptedRow)
        {
            if (entity == null || adaptedRow == null)
            {
                return;
            }
            PropertyInfo[] propertyInfos = entity.GetType().GetProperties();

            foreach (PropertyInfo propertyInfo in propertyInfos)
            {
                if (!CanSetPropertyValue(propertyInfo, adaptedRow))
                {
                    continue;
                }

                try
                {
                    if (adaptedRow[propertyInfo.Name] is DBNull)
                    {
                        propertyInfo.SetValue(entity, null, null);
                        continue;
                    }
                    SetPropertyValue(entity, adaptedRow, propertyInfo);
                }
                finally
                {

                }
            }
        }

        private static bool CanSetPropertyValue(PropertyInfo propertyInfo, DataRow adaptedRow)
        {
            if (!propertyInfo.CanWrite)
            {
                return false;
            }

            if (!adaptedRow.Table.Columns.Contains(propertyInfo.Name))
            {
                return false;
            }

            return true;
        }

        private static void SetPropertyValue(object entity, DataRow adaptedRow, PropertyInfo propertyInfo)
        {
            if (propertyInfo.PropertyType == typeof(DateTime?) ||
                propertyInfo.PropertyType == typeof(DateTime))
            {
                DateTime date = DateTime.MaxValue;
                DateTime.TryParse(adaptedRow[propertyInfo.Name].ToString(),
                    CultureInfo.CurrentCulture, DateTimeStyles.None, out date);

                propertyInfo.SetValue(entity, date, null);
            }
            else
            {
                propertyInfo.SetValue(entity, adaptedRow[propertyInfo.Name], null);
            }
        }

        public static List<T> DataConvert<T>(DataTable tb)
        {
            List<T> lst = new List<T>();
            DataConvert<T>(tb, ref lst);
            return lst;
        }

        public static List<T> DataConvert<T>(DataTable tb, ref List<T> lst)
        {
            for (int i = 0; i < tb.Rows.Count; i++)
            {
                lst.Add(DataConvert<T>(tb.Rows[i]));
            }
            return lst;
        }

        public static T DataConvert<T>(DataRow row)
        {
            var type = typeof(T);
            object obj = type.Assembly.CreateInstance(type.FullName);
            var c = (T)obj;
            DataConvert(row, ref c);
            return c;
        }

        public static T DataConvert<T>(DataRow row, ref T t)
        {
            var ps = t.GetType().GetProperties();
            var tbColumns = row.Table.Columns;
            foreach (var c in ps)
            {
                var colName = c.Name;
                if (tbColumns.Contains(colName))
                {
                    object nr = row[colName] == DBNull.Value ? null : row[colName];
                    if (nr == null)
                    {
                        c.SetValue(t, nr, null);
                    }
                    else
                    {
                        var nrType = c.PropertyType;
                        if (nrType == typeof(decimal) || nrType == typeof(decimal?))
                        {
                            nr = Convert.ToDecimal(nr);
                        }
                        else if (nrType == typeof(Int64) || nrType == typeof(Int64?))
                        {
                            nr = Convert.ToInt64(nr);
                        }
                        else if (nrType == typeof(double) || nrType == typeof(double?))
                        {
                            nr = Convert.ToDouble(nr);
                        }
                        else if (nrType == typeof(Int32) || nrType == typeof(Int32?))
                        {
                            nr = Convert.ToInt32(nr);
                        }
                        else if (nrType == typeof(Int16) || nrType == typeof(Int16?))
                        {
                            nr = Convert.ToInt16(nr);
                        }
                        c.SetValue(t, nr, null);
                    }

                }
            }
            return t;
        }

        public static List<T> DataConvertForExcel<T>(DataTable tb)
        {
            List<T> lst = new List<T>();
            DataConvertForExcel<T>(tb, ref lst);
            return lst;
        }

        public static List<T> DataConvertForExcel<T>(DataTable tb, ref List<T> lst)
        {
            for (int i = 0; i < tb.Rows.Count; i++)
            {
                lst.Add(DataConvertForExcel<T>(tb.Rows[i]));
            }
            return lst;
        }

        public static T DataConvertForExcel<T>(DataRow row)
        {
            var type = typeof(T);
            object obj = type.Assembly.CreateInstance(type.FullName);
            var c = (T)obj;
            DataConvertForExcel(row, ref c);
            return c;
        }

        public static T DataConvertForExcel<T>(DataRow row, ref T t)
        {
            var ps = t.GetType().GetProperties();
            var tbColumns = row.Table.Columns;
            foreach (var c in ps)
            {
                var colName = c.Name;
                if (tbColumns.Contains(colName))
                {
                    object nr = row[colName] == DBNull.Value ? null : row[colName];
                    if (nr == null)
                    {
                        c.SetValue(t, nr, null);
                    }
                    else
                    {
                        var nrType = c.PropertyType;
                        c.SetValue(t, nr.ToString(), null);
                    }
                }
            }
            return t;
        }
    }
}
