using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public static class StringExtensions
    {
        public static int ToInteger(this string value)
        {
            int result = 0;
            int.TryParse(value, out result);

            return result;
        }

        /// <summary>
        /// 把字符串转成日期
        /// </summary>
        /// <param name="_value">字符串</param>
        /// <param name="_defaultValue">默认值</param>
        /// <returns></returns>
        public static DateTime ToDate(this string value, DateTime defaultValue)
        {
            if (IsStringDate(value))
                return Convert.ToDateTime(value);
            else
                return defaultValue;
        }

        /// <summary>
        /// 获取指定长度的字符串
        /// </summary>
        /// <param name="value"></param>
        /// <param name="length"></param>
        /// <returns></returns>
        public static string SubStr(this string value, int length)
        {
            if (String.IsNullOrEmpty(value)) return value;
            if (value.Length <= length) return value;
            return value.Substring(0, length);
        }

        #region 校验类

        /// <summary>
        /// 检查一个字符串是否可以转化为日期，一般用于验证用户输入日期的合法性。
        /// </summary>
        /// <param name="_value">需验证的字符串。</param>
        /// <returns>是否可以转化为日期的bool值。</returns>
        public static bool IsStringDate(this string value)
        {
            DateTime dTime;
            try
            {
                dTime = DateTime.Parse(value);
            }
            catch (FormatException e)
            {
                //日期格式不正确时
                Console.WriteLine(e.Message);
                return false;
            }
            return true;
        }

        /// <summary>
        /// 检测是否有中文字符
        /// </summary>
        /// <param name="inputData"></param>
        /// <returns></returns>
        public static bool IsHasChinese(this string value)
        {
            Regex RegChinese = new Regex("[/u4e00-/u9fa5]");
            Match m = RegChinese.Match(value);
            return m.Success;
        }

        /// <summary>
        /// 检查一个字符串是否是纯字母和数字构成的，一般用于查询字符串参数的有效性验证。
        /// </summary>
        /// <param name="_value">需验证的字符串。</param>
        /// <returns>是否合法的bool值。</returns>
        public static bool IsLetterOrNumber(this string value)
        {
            return QuickValidate("^[a-zA-Z0-9_]*$", value);
        }

        /// <summary>
        /// 检查一个字符串是否是纯数字构成的，一般用于查询字符串参数的有效性验证。
        /// </summary>
        /// <param name="_value">需验证的字符串。。</param>
        /// <returns>是否合法的bool值。</returns>
        public static bool IsNumeric(this string value)
        {
            return QuickValidate("^[1-9]*[0-9]*$", value);
        }

        /// <summary>
        /// 判断是否是数字，包括小数和整数。
        /// </summary>
        /// <param name="_value">需验证的字符串。</param>
        /// <returns>是否合法的bool值。</returns>
        public static bool IsNumber(this string value)
        {
            return QuickValidate("^(0|([1-9]+[0-9]*))(.[0-9]+)?$", value);
        }

        /// <summary>
        /// 判断一个字符串是否为Int
        /// </summary>
        /// <param name="_value"></param>
        /// <returns></returns>
        public static bool IsInteger(this string value)
        {
            Regex regex = new Regex(@"^[1-9]\d*$");
            if (regex.Match(value).Success)
            {
                if ((long.Parse(value) > 0x7fffffffL) || (long.Parse(value) < -2147483648L))
                {
                    return false;
                }
                return true;
            }
            return false;
        }

        /// <summary>
        /// 判断一个字符串是否为手机号码
        /// </summary>
        /// <param name="_value"></param>
        /// <returns></returns>
        public static bool IsMobileNum(this string value)
        {
            Regex regex = new Regex(@"^13/d$", RegexOptions.IgnoreCase);
            return regex.Match(value).Success;
        }

        /// <summary>
        /// 判断一个字符串是否为电话号码
        /// </summary>
        /// <param name="_value"></param>
        /// <returns></returns>
        public static bool IsPhoneNum(this string value)
        {
            Regex regex = new Regex(@"^(86)?(-)?(0/d{2,3})?(-)?(/d{7,8})(-)?(/d{3,5})?$", RegexOptions.IgnoreCase);
            return regex.Match(value).Success;
        }

        /// <summary>
        /// 判断一个字符串是否为邮件
        /// </summary>
        /// <param name="_value"></param>
        /// <returns></returns>
        public static bool IsEmail(this string value)
        {
            Regex regex = new Regex(@"^/w+([-+.]/w+)*@(/w+([-.]/w+)*/.)+([a-zA-Z]+)+$", RegexOptions.IgnoreCase);
            return regex.Match(value).Success;
        }

        /// <summary>
        /// 判断一个字符串是否为网址
        /// </summary>
        /// <param name="_value"></param>
        /// <returns></returns>
        public static bool IsUrl(this string value)
        {
            Regex regex = new Regex(@"(http://)?([/w-]+/.)*[/w-]+(/[/w- ./?%&=]*)?", RegexOptions.IgnoreCase);
            return regex.Match(value).Success;
        }

        /// <summary>
        /// 快速验证一个字符串是否符合指定的正则表达式。
        /// </summary>
        /// <param name="_express">正则表达式的内容。</param>
        /// <param name="_value">需验证的字符串。</param>
        /// <returns>是否合法的bool值。</returns>
        public static bool QuickValidate(string _express, string value)
        {
            System.Text.RegularExpressions.Regex myRegex = new System.Text.RegularExpressions.Regex(_express);
            if (value.Length == 0)
            {
                return false;
            }
            return myRegex.IsMatch(value);
        }

        #endregion
    }
}
