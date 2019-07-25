using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Enum
{
    /// <summary>
    /// 菜单类型
    /// </summary>
    public enum EMerchantInfoLevel
    {
        /// <summary>
        /// 登记
        /// </summary>
        Login = 1,

        /// <summary>
        /// 标准
        /// </summary>
        Standard = 2,

        /// <summary>
        /// 关联
        /// </summary>
        Associate = 3
    }

    /// <summary>
    /// 商户信息来源
    /// </summary>
    public enum EMerchantInfoSource
    {
        /// <summary>
        /// 平台录入
        /// </summary>
        Platform = 1,

        /// <summary>
        /// 商户录入
        /// </summary>
        Merchant = 2
    }

    /// <summary>
    /// 商户联系人角色
    /// </summary>
    public enum EMerchantContactRole
    {
        /// <summary>
        /// 老板
        /// </summary>
        Boss = 1,

        /// <summary>
        /// 采购
        /// </summary>
        Purchaser = 2,

        /// <summary>
        /// 前台
        /// </summary>
        FrontDesk = 3,

        /// <summary>
        /// 总经理
        /// </summary>
        Manager = 4
    }
}
