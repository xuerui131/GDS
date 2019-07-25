using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System;
using System.Text.RegularExpressions;
using GDS.Comon;

namespace GDS.Comon
{
    public static class WebHelper
    {
        #region HttpWebRequest(请求网络资源)

        /// <summary>
        /// 请求网络资源,返回响应的文本
        /// </summary>
        /// <param name="url">网络资源地址</param>
        public static string HttpWebRequest(string url)
        {
            return HttpWebRequest(url, string.Empty, Encoding.GetEncoding("utf-8"));
        }

        /// <summary>
        /// 请求网络资源,返回响应的文本
        /// </summary>
        /// <param name="url">网络资源Url地址</param>
        /// <param name="parameters">提交的参数,格式：参数1=参数值1&amp;参数2=参数值2</param>
        public static string HttpWebRequest(string url, string parameters)
        {
            return HttpWebRequest(url, parameters, Encoding.GetEncoding("utf-8"), true);
        }

        /// <summary>
        /// 请求网络资源,返回响应的文本
        /// </summary>
        /// <param name="url">网络资源地址</param>
        /// <param name="parameters">提交的参数,格式：参数1=参数值1&amp;参数2=参数值2</param>
        /// <param name="encoding">字符编码</param>
        /// <param name="isPost">是否Post提交</param>
        /// <param name="contentType">内容类型</param>
        /// <param name="cookie">Cookie容器</param>
        /// <param name="timeout">超时时间</param>
        public static string HttpWebRequest(string url, string parameters, Encoding encoding, bool isPost = false,
             string contentType = "application/x-www-form-urlencoded", CookieContainer cookie = null, int timeout = 120000)
        {
            var request = (HttpWebRequest)WebRequest.Create(url);
            request.Timeout = timeout;
            request.CookieContainer = cookie;
            if (isPost)
            {
                byte[] postData = encoding.GetBytes(parameters);
                request.Method = "POST";
                request.ContentType = contentType;
                request.ContentLength = postData.Length;
                using (Stream stream = request.GetRequestStream())
                {
                    stream.Write(postData, 0, postData.Length);
                }
            }
            var response = (HttpWebResponse)request.GetResponse();
            string result;
            using (Stream stream = response.GetResponseStream())
            {
                if (stream == null)
                    return string.Empty;
                using (var reader = new StreamReader(stream, encoding))
                {
                    result = reader.ReadToEnd();
                }
            }
            return result;
        }

        #endregion

        #region 格式化文本（防止SQL注入）
        /// <summary>
        /// 格式化文本（防止SQL注入）
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string Formatstr(string html)
        {
            System.Text.RegularExpressions.Regex regex1 = new System.Text.RegularExpressions.Regex(@"<script[\s\S]+</script *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex2 = new System.Text.RegularExpressions.Regex(@" href *= *[\s\S]*script *:", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex3 = new System.Text.RegularExpressions.Regex(@" on[\s\S]*=", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex4 = new System.Text.RegularExpressions.Regex(@"<iframe[\s\S]+</iframe *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex5 = new System.Text.RegularExpressions.Regex(@"<frameset[\s\S]+</frameset *>", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex10 = new System.Text.RegularExpressions.Regex(@"select", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex11 = new System.Text.RegularExpressions.Regex(@"update", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            System.Text.RegularExpressions.Regex regex12 = new System.Text.RegularExpressions.Regex(@"delete", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
            html = regex1.Replace(html, ""); //过滤<script></script>标记
            html = regex2.Replace(html, ""); //过滤href=javascript: (<A>) 属性
            html = regex3.Replace(html, " _disibledevent="); //过滤其它控件的on...事件
            html = regex4.Replace(html, ""); //过滤iframe
            html = regex10.Replace(html, "s_elect");
            html = regex11.Replace(html, "u_pudate");
            html = regex12.Replace(html, "d_elete");
            html = html.Replace("'", "’");
            html = html.Replace("&nbsp;", " ");
            return html;
        }
        #endregion

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
                    if (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null && !string.IsNullOrEmpty(HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString()))
                    {
                        userHostAddress = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
                    }
                }

                //否则直接读取REMOTE_ADDR获取客户端IP地址
                if (string.IsNullOrEmpty(userHostAddress))
                {
                    userHostAddress = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }

                //前两者均失败，则利用Request.UserHostAddress属性获取IP地址，但此时无法确定该IP是客户端IP还是代理IP
                if (string.IsNullOrEmpty(userHostAddress))
                {
                    userHostAddress = HttpContext.Current.Request.UserHostAddress;
                }

                //最后判断获取是否成功，并检查IP地址的格式（检查其格式非常重要）
                if (!string.IsNullOrEmpty(userHostAddress) && IsIP(userHostAddress))
                {
                    return userHostAddress;
                }
            }
            catch
            {
                return "";
            }
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
        /// 获取UserAgent
        /// </summary>
        /// <returns></returns>
        public static string GetUserAgent()
        {
            try
            {
                return HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"];
            }
            catch (Exception ex)
            {
                Loger.LogErr($"获取UserAgent异常", ex);
                return "获取异常";
            }

        }

        /// <summary>
        /// 检查系统版本
        /// </summary>
        /// <returns></returns>
        public static string SystemCheck()
        {
            try
            {
                string userAgent = HttpContext.Current.Request.ServerVariables["HTTP_USER_AGENT"];
                if (userAgent.IsEmpty())
                    return "无法获取HTTP_USER_AGENT";
                string version = "未知";
                if (userAgent.Contains("NT 5.0"))
                    version = "Windows 2000";
                else if (userAgent.Contains("Mac"))
                    version = "Mac";
                else if (userAgent.Contains("Unix"))
                    version = "UNIX";
                else if (userAgent.Contains("Linux"))
                    version = "Linux";
                else if (userAgent.Contains("SunOS"))
                    version = "SunOS";
                else if (userAgent.Contains("YandexBot"))
                    version = "俄罗斯Yandex的爬虫程序";
                else if (userAgent.Contains("Baiduspider-mobile"))
                    version = "百度移动搜索爬虫程序";
                else if (userAgent.Contains("Baiduspider-image"))
                    version = "百度图片搜索爬虫程序";
                else if (userAgent.Contains("Baiduspider-video"))
                    version = "百度视频搜索爬虫程序";
                else if (userAgent.Contains("Baiduspider-news"))
                    version = "百度新闻搜索爬虫程序";
                else if (userAgent.Contains("Baiduspider"))
                    version = "百度爬虫程序";
                else if (userAgent.Contains("bingbot"))
                    version = "必应爬虫程序";
                else if (userAgent.Contains("Googlebot"))
                    version = "谷歌爬虫程序";
                else if (userAgent.Contains("MSNBot"))
                    version = "MSN爬虫程序";
                else if (userAgent.Contains("YoudaoBot"))
                    version = "有道爬虫程序";
                else if (userAgent.Contains("Sogou"))
                    version = "搜狗爬虫程序";
                else if (userAgent.Contains("JikeSpider"))
                    version = "即刻爬虫程序";
                else if (userAgent.Contains("Sosospider"))
                    version = "搜搜爬虫程序";
                else if (userAgent.Contains("360Spider"))
                    version = "360爬虫程序";
                else if (userAgent.Contains("Yahoo"))
                    version = "雅虎爬虫";
                else if (userAgent.Contains("NT 5.1"))
                    version = "Windows XP";
                else if (userAgent.Contains("NT 5.2"))
                    version = "Windows Server 2003";
                else if (userAgent.Contains("NT 6.0"))
                    version = "Windows Vista/Server 2008";
                else if (userAgent.Contains("NT 6.1"))
                    version = "Windows 7/Windows Server 2008 R2";
                else if (userAgent.Contains("NT 6.2"))
                    version = "Windows 8.0/Windows Server 2012/Windows Phone 8";
                else if (userAgent.Contains("NT 6.3"))
                    version = "Windows 8.1/Windows Server 2012 R2 ";
                else if (userAgent.Contains("NT 6.4"))
                    version = "Windows 10 NT6.4内核";
                else if (userAgent.Contains("NT 10"))
                    version = "Windows 10";
                else if (userAgent.Contains("Me"))
                    version = "Windows Me";
                else if (userAgent.Contains("98"))
                    version = "Windows 98";
                else if (userAgent.Contains("95"))
                    version = "Windows 95";
                else if (userAgent.Contains("NT"))
                    version = "Windows NT4.0以下";

                return version;
            }
            catch (Exception ex)
            {
                Loger.LogErr($"检查系统版本异常", ex);
                return "获取异常";
            }
        }
    }
}
