using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;

namespace GDS.Comon
{
    public static class HostHelper
    {
        /// <summary>
        /// 获取服务器IP
        /// </summary>
        /// <returns></returns>
        public static string GetLocalIp()
        {
            try
            {
                var ipHostEntry = Dns.GetHostEntry(Dns.GetHostName());
                var address = ipHostEntry.AddressList.FirstOrDefault(i => i.AddressFamily == AddressFamily.InterNetwork);
                var localIpAddress = address.ToString() ?? string.Empty;

                return localIpAddress;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取客户端IP
        /// </summary>
        /// <returns>客户端IP</returns>
        public static string GetClientIp()
        {
            //如果客户端使用了代理服务器，则利用HTTP_X_FORWARDED_FOR找到客户端IP地址
            string userHostAddress = string.Empty;

            try
            {
                //如果客户端使用了代理服务器，则利用HTTP_X_FORWARDED_FOR找到客户端IP地址
                if (string.IsNullOrEmpty(userHostAddress))
                {
                    if (System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null && !string.IsNullOrEmpty(System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString()))
                    {
                        userHostAddress = System.Web.HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
                    }
                }

                //否则直接读取REMOTE_ADDR获取客户端IP地址
                if (string.IsNullOrEmpty(userHostAddress))
                {
                    userHostAddress = System.Web.HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }

                //前两者均失败，则利用Request.UserHostAddress属性获取IP地址，但此时无法确定该IP是客户端IP还是代理IP
                if (string.IsNullOrEmpty(userHostAddress))
                {
                    userHostAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                }

                //最后判断获取是否成功，并检查IP地址的格式（检查其格式非常重要）
                if (!string.IsNullOrEmpty(userHostAddress) && HostHelper.IsIP(userHostAddress))
                {
                    return userHostAddress;
                }
            }
            catch
            {
                return "";
            }
            //return "127.0.0.1";
            return userHostAddress;
        }

        /// <summary>
        /// 检查IP地址格式
        /// </summary>
        /// <param name="ip"></param>
        /// <returns></returns>
        public static bool IsIP(string ip)
        {
            return System.Text.RegularExpressions.Regex.IsMatch(ip, @"^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$");
        }

        /// <summary>
        /// 获取绝对路径
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static string MapPath(string path)
        {
            var basedirectory = AppDomain.CurrentDomain.BaseDirectory;
            var root = basedirectory;
            if (basedirectory.IndexOf("bin", StringComparison.Ordinal) > 0)
            {
                root = basedirectory.Substring(0, basedirectory.IndexOf("bin", StringComparison.Ordinal));
            }
            root = root.TrimEnd("\\".ToCharArray());

            if (!string.IsNullOrEmpty(path))
            {
                path = path.Replace("/", "\\");
            }

            return root + path;
        }
    }
}
