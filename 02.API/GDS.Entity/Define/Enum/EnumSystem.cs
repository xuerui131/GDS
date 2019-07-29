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
    public enum EMenuType
    {
        /// <summary>
        /// 内嵌菜单
        /// </summary>
        Menu = 1,

        /// <summary>
        /// 弹出菜单
        /// </summary>
        PopMenu = 2,

        /// <summary>
        /// 目录
        /// </summary>
        Directory = 3
    }

    /// <summary>
    /// 地址类型
    /// </summary>
    public enum EUrlType
    {
        /// <summary>
        /// 内部地址
        /// </summary>
        Inner = 1,

        /// <summary>
        /// 外部地址
        /// </summary>
        Outer = 2
    }

    /// <summary>
    /// 功能类型
    /// </summary>
    public enum EFuncType
    {
        /// <summary>
        /// 按钮
        /// </summary>
        Button = 1,

        /// <summary>
        /// 数据项
        /// </summary>
        DataItem = 2,

        /// <summary>
        /// 数据访问链接
        /// </summary>
        DataLink = 3
    }

    /// <summary>
    /// 权限类型
    /// </summary>
    public enum ERightType
    {
        /// <summary>
        /// 菜单权限
        /// </summary>
        Menu = 1,

        /// <summary>
        /// 功能权限
        /// </summary>
        Function = 2
    }

    /// <summary>
    /// 前台用户类型
    /// </summary>
    public enum ELoginUserType
    {
        /// <summary>
        /// 签约主账号
        /// </summary>
        SignedUser = 1,

        /// <summary>
        /// 子账号
        /// </summary>
        ChildUser = 2,

        /// <summary>
        /// 电商VIP用户
        /// </summary>
        EBusinessUser = 3,
    }

    /// <summary>
    /// 后台用户类型
    /// </summary>
    public enum EBackLoginUserType
    {
        /// <summary>
        /// 平台方
        /// </summary>
        Platform = 1,

        /// <summary>
        /// 物流商
        /// </summary>
        RegularBusAdmin = 2,
    }
}
