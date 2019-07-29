using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GDS.WebApi.Models
{
    public class UserLogin
    {
        public string LoginName { get; set; }
        public string Password { get; set; }
        public string VerifyCode { get; set; }
    }

    /// <summary>
    /// 登录用户信息
    /// </summary>
    public class LoginUserVo
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 登录名
        /// </summary>
        public string LoginName { get; set; }

        ///// <summary>
        ///// 显示名
        ///// </summary>
        //public string NickName { get; set; }

        /// <summary>
        /// 真实姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public int UserType { get; set; }

        public string UserTypeDesc { get; set; }

        public int Department { get; set; }

        /// <summary>
        /// Token
        /// </summary>
        public string loginToken { get; set; }

    }

    /// <summary>
    /// 初始化配置信息
    /// </summary>
    public class InitialLoginInfo
    {
        /// <summary>
        /// 是否已登录
        /// </summary>
        public bool IsLogin { get; set; }

        /// <summary>
        /// 当前用户可访问页面
        /// </summary>
        public List<BackMenu> AccessableMenus { get; set; }

    }
}