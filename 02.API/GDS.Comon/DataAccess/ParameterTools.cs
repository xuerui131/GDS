using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    ///<summary> 
    ///Module ID：
    ///Depiction： 公共处理SqlParameter的工具类
    ///</summary>
    public class ParameterTools
    {
        /// <summary>
        /// 创建SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="value">参数值</param>
        /// <returns>SqlParameter对象</returns>
        public static SqlParameter CreateSqlParameter(string name, SqlDbType type, object value)
        {
            if (value == null)
            {
                value = DBNull.Value;
            }
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            SqlParameter sp = new SqlParameter(name, type);
            sp.Value = value;
            return sp;
        }

        public static SqlParameter CreateSqlParameter(string name, SqlDbType type)
        {
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            SqlParameter sp = new SqlParameter(name, type);
            return sp;
        }

        /// <summary>
        /// 创建SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="direction">参数值</param>
        /// <returns>SqlParameter对象</returns>
        public static SqlParameter CreateSqlParameter(string name, SqlDbType type, ParameterDirection direction)
        {
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            SqlParameter sp = new SqlParameter(name, type);
            sp.Direction = direction;
            return sp;
        }

        /// <summary>
        /// 创建SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="size">参数值</param>
        /// <param name="value">SqlParameter对象</param>
        /// <returns>SqlParameter对象</returns>
        public static SqlParameter CreateSqlParameter(string name, SqlDbType type, int size, object value)
        {
            if (value == null)
            {
                value = DBNull.Value;
            }
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            SqlParameter sp = new SqlParameter(name, type, size);
            sp.Value = value;
            return sp;
        }

        /// <summary>
        /// 创建SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="size">参数值</param>
        /// <param name="value">SqlParameter对象</param>
        /// <param name="direction">方向</param>
        /// <returns>SqlParameter对象</returns>
        public static SqlParameter CreateSqlParameter(string name, SqlDbType type, int size, object value, ParameterDirection direction)
        {
            if (value == null)
            {
                value = DBNull.Value;
            }
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            SqlParameter sp = new SqlParameter(name, type, size);
            sp.Direction = direction;
            sp.Value = value;
            return sp;
        }

        List<SqlParameter> lstPara = new List<SqlParameter>();
        /// <summary>
        /// 添加SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="value">值</param>
        public void AddSqlParameter(string name, SqlDbType type, object value)
        {
            lstPara.Add(CreateSqlParameter(name, type, value));
        }

        /// <summary>
        /// 添加SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="size">大小</param>
        /// <param name="value">值</param>
        public void AddSqlParameter(string name, SqlDbType type, int size, object value)
        {
            lstPara.Add(CreateSqlParameter(name, type, size, value));
        }

        /// <summary>
        /// 添加SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="size">大小</param>
        /// <param name="value">值</param>
        /// <param name="direction">方向</param>
        public void AddSqlParameter(string name, SqlDbType type, int size, object value, ParameterDirection direction)
        {
            lstPara.Add(CreateSqlParameter(name, type, size, value, direction));
        }

        /// <summary>
        /// 添加SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        internal void AddSqlParameter(string name, SqlDbType type)
        {
            lstPara.Add(CreateSqlParameter(name, type));
        }

        /// <summary>
        /// 添加SqlParameter对象
        /// </summary>
        /// <param name="name">名称</param>
        /// <param name="type">类型</param>
        /// <param name="direction">方向</param>
        public void AddSqlParameter(string name, SqlDbType type, ParameterDirection direction)
        {
            lstPara.Add(CreateSqlParameter(name, type, direction));
        }

        /// <summary>
        /// 得到SqlParameter数组
        /// </summary>
        /// <returns>SqlParameter数组</returns>
        public SqlParameter[] GetSqlParameters()
        {
            return lstPara.ToArray();
        }

        public static DateTime? GetDateTime(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return (DateTime)o;
            }
        }

        public static string GetString(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return o.ToString();
            }
        }

        public static Guid? GetGuid(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return (Guid)o;
            }
        }

        public static long? GetLong(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return (long)o;
            }
        }

        public static bool? GetBool(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return Convert.ToBoolean(o);
            }
        }

        public static int? GetInt(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else if (o is bool)
            {
                if ((bool)o)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return int.Parse(o.ToString());
            }
        }

        public static double? GetDouble(object o)
        {
            if (o == DBNull.Value)
            {
                return null;
            }
            else
            {
                return double.Parse(o.ToString());
            }
        }

        public SqlParameter GetSqlParameterByName(string name)
        {
            if (!name.StartsWith("@"))
            {
                name = "@" + name;
            }
            foreach (SqlParameter sp in lstPara)
            {
                if (sp.ParameterName == name)
                {
                    return sp;
                }
            }
            return null;
        }
        /// <summary>
        /// 根据参数名称得到SqlParameter
        /// </summary>
        /// <param name="name">参数名</param>
        /// <returns></returns>
        public SqlParameter GetParameter(String name)
        {
            foreach (SqlParameter s in lstPara)
            {
                if (s.ParameterName == "@" + name || s.ParameterName == name)
                {
                    return s;
                }
            }
            return null;
        }

    }
}
