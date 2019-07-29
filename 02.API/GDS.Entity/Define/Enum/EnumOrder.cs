using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Enum
{
    /// <summary>
    /// 报价单状态
    /// </summary>
    public enum EQuoteOrderSate
    {
        /// <summary>
        /// 全部（用于数据过滤）
        /// </summary>
        All = -1,

        /// <summary>
        /// 未报价
        /// </summary>
        NotQuote = 1,

        /// <summary>
        /// 已报价
        /// </summary>
        HasQuote = 2,

        /// <summary>
        /// 已成交
        /// </summary>
        HasFinished = 3
    }

    /// <summary>
    /// 销售单状态
    /// </summary>
    public enum ESalesOrderSate
    {
        /// <summary>
        /// 全部（用于数据过滤）
        /// </summary>
        All = -1,

        /// <summary>
        /// 确认订单
        /// </summary>
        Confirm = 1,

        /// <summary>
        /// 交易中
        /// </summary>
        Pending = 2,

        /// <summary>
        /// 交易完成
        /// </summary>
        Finished = 3,

        /// <summary>
        /// 交易关闭
        /// </summary>
        Closed = 4
    }

    /// <summary>
    /// 进货单状态
    /// </summary>
    public enum EPurchaseOrderSate
    {
        /// <summary>
        /// 全部（用于数据过滤）
        /// </summary>
        All = -1,

        /// <summary>
        /// 确认订单
        /// </summary>
        Confirm = 1,

        /// <summary>
        /// 交易中
        /// </summary>
        Pending = 2,

        /// <summary>
        /// 交易完成
        /// </summary>
        Finished = 3,

        /// <summary>
        /// 交易关闭
        /// </summary>
        Closed = 4
    }
}
