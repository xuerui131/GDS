using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    /// <summary>
    /// 手机号相关帮助类
    /// </summary>
    public class MobileHelper
    {
        /// <summary>
        /// 获取加星手机号
        /// </summary>
        /// <param name="mobile"></param>
        /// <returns></returns>
        public static string GetMobileWithStar(string mobile)
        {
            if (string.IsNullOrEmpty(mobile) == false && mobile.Length > 10)
            {
                return mobile.Substring(0, 3) + "****" + mobile.Substring(mobile.Length - 4);
            }

            return mobile;
        }

        /// <summary>
        /// 获取手机号末尾几位
        /// </summary>
        /// <param name="mobile"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public static string GetMobileByLastLenth(string mobile, int length)
        {
            if (string.IsNullOrEmpty(mobile) == false && mobile.Length > length)
            {
                return mobile.Substring(mobile.Length - length, length);
            }

            return mobile;
        }
    }
}
