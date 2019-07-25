using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public static class StringHelper
    {
        /// <summary>
        /// 判断字符串是否为空 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool IsEmpty(this string str)
        {
            return str == null || string.IsNullOrEmpty(str.Trim());
        }

        /// <summary>
        /// 判断字符串是否为空 
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static bool IsNotEmpty(this string str)
        {
            return !str.IsEmpty();
        }

        public static int StringToInt(this string str)
        {
            return Convert.ToInt32(str);
        }


        /// <summary>
        /// 字符串转utf-8字节数组
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static byte[] ToUtf8Bytes(this string str)
        {
            return Encoding.UTF8.GetBytes(str);
        }

        /// <summary>
        /// utf-8字节数组转字符串
        /// </summary>
        /// <param name="bytes"></param>
        /// <returns></returns>
        public static string FromUtf8Bytes(this byte[] bytes)
        {
            return Encoding.UTF8.GetString(bytes);
        }
        public static string TruncationStr(string Content, int Length)
        {
            if (Content.Length > Length)
            {
                return Content.Substring(0, Length);
            }
            return Content;
        }

        //如果是true 就是中文 
        public static bool IsChinese(string Conetent)
        {
            return Regex.IsMatch(Conetent, @"[\u4e00-\u9fa5]");
        }

        //去除特殊符码信息 只剩下数字和字母
        public static string RemoveSpecialletters(string Conetent)
        {
            if (Conetent == "" || Conetent == null)
            {
                return Conetent;
            }
            Conetent = Regex.Replace(Conetent, "[^0-9A-Za-z]", "");
            return Conetent;
        }

        public static string FromBase64(string s)
        {
            byte[] outputb = Convert.FromBase64String(s);
            return Encoding.Default.GetString(outputb);
        }

        //匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
        //[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5] 
        //
        public static bool IsChinesePunctuation(string Content)
        {
            return Regex.IsMatch(Content, @"[\u3002\uff1b\uff0c\uff1a\u2018\u2019\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u2014]");
        }

        public const int EmptyToInt = 999999999;

        public static int GetEmptyToInt(int? data)
        {
            return data.HasValue ? data.Value : EmptyToInt;
        }
    }
}
