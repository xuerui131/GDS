using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Define.Enum
{
    /// <summary>
    /// 物流商打印状态
    /// </summary>
    public enum EBusState
    {
        /// <summary>
        /// 待打印
        /// </summary>
        Print = 0,

        /// <summary>
        /// 待确认
        /// </summary>
        Confirm = 1,

        /// <summary>
        /// 已打印，再次打印
        /// </summary>
        PrintAgain = 2,

        /// <summary>
        /// 已关闭
        /// </summary>
        Closed = 3
    }

    /// <summary>
    /// 发件人打印状态
    /// </summary>
    public enum ESenderState
    {
        /// <summary>
        /// 待打印
        /// </summary>
        Print = 0,

        /// <summary>
        /// 已打印，再次打印
        /// </summary>
        PrintAgain = 1
    }
}
