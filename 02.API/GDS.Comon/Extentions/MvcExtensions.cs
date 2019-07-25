using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace GDS.Comon
{
    public static class MvcExtensions
    {
        /// <summary>
        /// 给Url路径添加版本号，解决js缓存问题
        /// </summary>
        /// <param name="helper"></param>
        /// <param name="contentPath"></param>
        /// <returns></returns>
        public static string VersionContent(this UrlHelper helper, string contentPath)
        {
            contentPath = contentPath ?? "";

            var version = ConfigurationManager.AppSettings["PublishVersion"];
            version = string.IsNullOrEmpty(version) ? "20161201001" : version;

            var prefix = contentPath.Contains("?") ? "&" : "?";
            contentPath = string.Format("{0}{1}v={2}", contentPath, prefix, version);

            return helper.Content(contentPath);
        }
    }
}
