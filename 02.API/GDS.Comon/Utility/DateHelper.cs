using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class DateHelper
    {

        //获取当前月最后一天
        public DateTime CurrentLastDayOfMonth()
        {
            DateTime dt = DateTime.Now;  //当前时间
            DateTime startMonth = dt.AddDays(1 - dt.Day);  //本月月初
            DateTime endMonth = startMonth.AddMonths(1).AddDays(-1);  //本月月末
            return endMonth;
        }


        //获取当前双月最后一天
        public DateTime CurrentLastDayOfDoubleMonth()
        {
            DateTime dt = DateTime.Now;  //当前时间
            DateTime startMonth = dt.AddDays(1 - dt.Day);  //本月月初
            int month = dt.Month % 2;
            DateTime endMonth = startMonth.AddMonths(month + 1).AddDays(-1);  //本月月末
            return endMonth;
        }

        //获本季度末最后一天
        public DateTime CurrentLastDayOfQuarter()
        {
            DateTime dt = DateTime.Now;  //当前时间
            DateTime startQuarter = dt.AddMonths(0 - (dt.Month - 1) % 3).AddDays(1 - dt.Day);  //本季度初
            DateTime endQuarter = startQuarter.AddMonths(3).AddDays(-1);  //本季度末
            return endQuarter;
        }

        //获本半年最后一天
        public DateTime CurrentLastDayOfHalfYear()
        {
            DateTime dt = DateTime.Now;  //当前时间
            if (1 <= dt.Month && dt.Month <= 6)
            {
                return DateTime.Parse(dt.Year + "-06" + "-30");
            }
            return DateTime.Parse(dt.Year + "-12" + "-31");
        }

        //获取结算日期下月最后一天
        public DateTime CurrentLastDayOfNextMonth(DateTime dt)
        {
            DateTime startMonth = dt.AddDays(1 - dt.Day);  //本月月初
            DateTime endMonth = startMonth.AddMonths(2).AddDays(-1);  //本月月末
            return endMonth;
        }
        
    }
}
