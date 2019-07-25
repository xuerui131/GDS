using GDS.Comon;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{
    /// <summary>
    /// SqlSugar
    /// </summary>
    public class SugarDao
    {
        //禁止实例化
        private SugarDao()
        {

        }
        public static string ConnectionStringGDS
        {
            get
            {
                string reval = Comon.ConnectionManager.GDS;
                return reval;
            }
        }

        public static SqlSugarClient GetInstance()
        {
            var db = new SqlSugarClient(ConnectionStringGDS);
            db.IsEnableAttributeMapping = true;//启用属性映射
            db.IsIgnoreErrorColumns = true;//忽略非数据库列
#if DEBUG
            db.IsEnableLogEvent = true;//启用日志事件
            db.LogEventStarting = (sql, par) => { Loger.LogErr(sql + " " + par + "\r\n"); }; //记录数据库脚本日志
#endif
            return db;
        }
    }
}
