using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Enum
{
    public enum EnumDateRange
    {
        /// <summary>
        /// 今天
        /// </summary>
        Today = 1,

        /// <summary>
        /// 昨天
        /// </summary>
        Yesterday = 2,

        /// <summary>
        /// 本周
        /// </summary>
        ThisWeek = 3,

        /// <summary>
        /// 上周
        /// </summary>
        LastWeek = 4,

        /// <summary>
        /// 本月
        /// </summary>
        ThisMonth = 5,

        /// <summary>
        /// 上月
        /// </summary>
        LastMonth = 6,

        /// <summary>
        /// 本年
        /// </summary>
        ThisYear = 7,
    }
}
