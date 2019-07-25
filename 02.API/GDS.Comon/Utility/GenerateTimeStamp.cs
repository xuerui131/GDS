using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class ToolTimeStamp
    {
        /// <summary>
        /// 生产时间戳
        /// </summary>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static string GenerateTimeStamp()
        {
            DateTime dt = DateTime.Now;
            TimeSpan ts = dt.ToUniversalTime() - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return Convert.ToInt64(ts.TotalSeconds).ToString();
        }

        public static DateTime IntToDateTime(int timestamp)
        {
            return TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1, 0, 0, 0, 0)).AddSeconds(timestamp);
        }

        /// <summary>
        /// 订单编码生产 类型加上商户Id（6位）+时间戳
        //AO+商户Id+497753573 询价单编号
        //AO+商户Id+497753596 询价单编号
        //SO+商户Id+497753573 销售单编号
        //SO+商户Id+497753596 销售单编号
        //PO+商户Id+497753573 进货单编号
        //PO+商户Id+497753596 进货单编号
        //BO+班车方Id+497753596 班车发货单编号
        /// </summary>
        /// <param name="Type"></param>
        /// <param name="ForeUserId"></param>
        /// <returns></returns>
        public static string GenerateOrderNumber(string Type, int ForeUserId)
        {
            string prefix = "0000000000000000000";
            string ForeUserstr = ForeUserId.ToString();
            ForeUserstr = prefix.Substring(0, 6 - ForeUserstr.Length) + ForeUserId.ToString();
            string OrderNum = Type + ForeUserstr + GenerateTimeStamp();
            return OrderNum;
        }
        public static string GenerateOrderNumber_wl(string Type, int ForeUserId)
        {
            string OrderNum = Type  + GenerateTimeStamp();
            return OrderNum;
        }
    }
}
