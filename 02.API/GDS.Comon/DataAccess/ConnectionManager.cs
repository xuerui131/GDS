using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class ConnectionManager
    {
        /// <summary>
        /// 数据库链接字符串
        /// </summary>
        public static string LY
        {
            get
            {
               // return ConfigurationManager.ConnectionStrings["LY"].ConnectionString;
                return ConfigurationManager.ConnectionStrings["GDS"].ConnectionString;
            }
        }

        public static string GDS
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["GDS"].ConnectionString;
            }
        }

        public static string LYLog
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["LYLog"].ConnectionString;
            }
        }
        public static string LYDemo
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["LYDemo"].ConnectionString;
            }
        }

        public static string LYWeb
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["LYWeb"].ConnectionString;
            }
        }
    }
}
