using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    /// <summary>
    /// 菜单
    /// </summary>
    public class BackMenu : ModelBase
    {
        /// <summary>
        /// 菜单编号
        /// </summary>
        public string MenuNo { get; set; }

        /// <summary>
        /// 上级菜单Id
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// 菜单类型EmMenuType（Menu,PopMenu,Dictionary）
        /// </summary>
        public int MenuType { get; set; }

        /// <summary>
        /// 地址类型EmUrlType（Inner,Outer）
        /// </summary>
        public int UrlType { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 显示顺序
        /// </summary>
        public int Sequence { get; set; }

        /// <summary>
        /// 访问地址
        /// </summary>
        public string AccessUrl { get; set; }

        /// <summary>
        /// 菜单图标
        /// </summary>
        public string MenuIcon { get; set; }

        /// <summary>
        /// 是否显示
        /// </summary>
        public int IsShow { get; set; }

        /// <summary>
        /// 是否有效
        /// </summary>
        public int IsEnable { get; set; }
    }

    public class View_BackMenu : BackMenu
    {
        public int OperationRight { get; set; }  //操作权限
    }

    public class View_DispalyBackMenu : View_BackMenu
    {
        public List<View_BackMenu> SubMenuList { get; set; }
    }

    public class DispalyBackMenu : BackMenu
    {
        public List<BackMenu> SubMenuList { get; set; }
    }
    public class BindMenu : View_BackMenu
    {
        public int IsBind { get; set; }
        public List<BindMenu> SubMenuList { get; set; }
    }
}
