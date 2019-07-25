using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Config
{
    public class ConfigParam
    {

        /// <summary>
        /// redis读写服务器
        /// </summary>
        public static string RedisServerReadWrite => ConfigurationManager.AppSettings["RedisServerReadWrite"];

        /// <summary>
        /// redis读取服务器
        /// </summary>
        public static string RedisServerRead => ConfigurationManager.AppSettings["RedisServerRead"];

        /// <summary>
        /// 日记存放路径
        /// </summary>
        public static string LogPath => ConfigurationManager.AppSettings["LogPath"];
        /// <summary>
        /// 是否打印日记info信息
        /// </summary>
        public static bool IsInfoLogPrint
        {
            get
            {
                bool isInfoLogPrint = false;
                bool.TryParse(ConfigurationManager.AppSettings["IsInfoLogPrint"], out isInfoLogPrint);
                return isInfoLogPrint;
            }
        }
        /// <summary>
        /// 是否打印日记debug信息
        /// </summary>
        public static bool IsDebugLogPrint
        {
            get
            {
                bool isDebugLogPrint = false;
                bool.TryParse(ConfigurationManager.AppSettings["IsDebugLogPrint"], out isDebugLogPrint);
                return isDebugLogPrint;
            }
        }

        /// <summary>
        /// 首页未授权图片地址
        /// </summary>
        public static string UnauthImgUrl => ConfigurationManager.AppSettings["UnauthImgUrl"];

        public static string WritingImgUrl => ConfigurationManager.AppSettings["WritingImgUrl"];
    }
}
