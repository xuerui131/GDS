﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace GDS.Comon
{
    public class CookieHelper
    { /// <summary>  
        /// 清除指定Cookie  
        /// </summary>  
        /// <param name="cookiename">cookiename</param>  
        public static void ClearCookie(string cookiename)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[cookiename];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddYears(-3);
                HttpContext.Current.Response.Cookies.Add(cookie);
            }
        }
        /// <summary>  
        /// 获取指定Cookie值  
        /// </summary>  
        /// <param name="cookiename">cookiename</param>  
        /// <returns></returns>  
        public static string GetCookieValue(string cookiename)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[cookiename];
            string str = string.Empty;
            if (cookie != null)
            {
                str = cookie.Value;
            }
            return str;
        }

        /// <summary>  
        /// 添加一个Cookie  
        /// </summary>  
        /// <param name="cookiename">cookie名</param>  
        /// <param name="cookievalue">cookie值</param>  
        /// <param name="expires">过期时间 DateTime</param>  
        public static void SetCookie(string cookiename, string cookievalue, int Minutes)
        {
            HttpCookie cookie = new HttpCookie(cookiename)
            {
                Value = cookievalue,
                Expires = DateTime.Now.AddMinutes(Minutes)
            };
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}
