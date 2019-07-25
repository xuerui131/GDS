using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Extentions
{
    /// <summary>
    /// 一些方法的拓展
    /// </summary>
    public static class Extension
    {
        #region String extension

        /// <summary>
        /// 替换字符
        /// </summary>
        /// <param name="template"></param>
        /// <param name="values"></param>
        /// <returns></returns>
        public static string Replaces(this string template, Dictionary<string, string> values)
        {
            if (template.IsNullOrWhiteSpace())
                return null;

            foreach (var value in values)
            {
                template = template.Replace($"{value.Key}", value.Value);
            }

            return template;
        }

        public static bool IsNullOrWhiteSpace(this string obj)
        {
            return String.IsNullOrWhiteSpace(obj);
        }

        public static bool IsNotNullOrWhiteSpace(this string obj)
        {
            return !String.IsNullOrWhiteSpace(obj);
        }

        public static String FormatWith(this String str, params object[] obj)
        {
            return String.Format(str, obj);
        }

        /// <summary>
        /// 字符脱敏
        /// </summary>
        /// <param name="str">字符</param>
        /// <param name="len">脱敏字符数</param>
        /// <returns></returns>
        public static String Sensitive(this string str, int len = 0)
        {
            if (str.IsNullOrWhiteSpace())
                return str;
            if (str.Length < 3)
                return str;

            int start = str.Length / 3;
            if (len == 0)
                len = str.Length - start * 2;

            string temp = new string('*', len);

            return str.Substring(0, start) + temp + str.Substring((start + len) > str.Length ? str.Length : (start + len));
        }

        #endregion

        #region Byte Array 可用于Session存储

        /// <summary>
        /// 对象转byte数组
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static byte[] ToByteArray(this object obj)
        {
            if (obj == null)
                return null;

            string json = JsonConvert.SerializeObject(obj);
            return System.Text.Encoding.UTF8.GetBytes(json);
        }

        /// <summary>
        /// byte数组转对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="buff"></param>
        /// <returns></returns>
        public static T ToObject<T>(this byte[] buff)
        {
            string json = System.Text.Encoding.UTF8.GetString(buff);
            return JsonConvert.DeserializeObject<T>(json);
        }

        #endregion
        
        #region Object extension

        #region 转换 Nullable

        public static String ToNullableString(this object obj)
        {
            if (obj == null)
                return null;
            return obj.ToString().Trim();
        }

        public static int? ToNullableInt32(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return null;
            return Convert.ToInt32(obj);
        }

        public static long? ToNullableInt64(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return null;
            return Convert.ToInt64(obj);
        }

        public static decimal? ToNullableDecimal(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return null;
            return Convert.ToDecimal(obj);
        }


        public static decimal ToDecimal(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return 0;
            return Convert.ToDecimal(obj);
        }

        public static DateTime? ToNullableDateTime(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return null;
            return Convert.ToDateTime(obj);
        }

        public static Boolean? ToNullableBoolean(this object obj)
        {
            if (obj == null || obj == DBNull.Value || obj.ToString() == "")
                return null;
            return Convert.ToBoolean(obj);
        }

        #endregion

        #endregion

        #region Enum / Dictionary / List extension

        public static Dictionary<String, int> EnumToDictionary<T>()
        {
            Dictionary<String, int> dic = new Dictionary<String, int>();
            Type enumType = typeof(T);
            foreach (int i in Enum.GetValues(enumType))
            {
                String temp = Enum.GetName(enumType, i);

                MemberInfo mInfo = enumType.GetMember(temp)[0];
                Object[] displays = mInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (displays.Length > 0)
                {
                    DescriptionAttribute display = displays[0] as DescriptionAttribute;

                    temp = display.Description;
                }

                dic.Add(temp, i);
            }

            return dic;
        }


        public static Dictionary<string, bool> YesNos()
        {
            Dictionary<string, bool> items = new Dictionary<string, bool>();
            items.Add("是", true);
            items.Add("否", false);
            return items;
        }

        public static List<String> EnumToList<T>()
        {
            List<String> list = new List<String>();
            Type enumType = typeof(T);
            foreach (int i in Enum.GetValues(enumType))
            {
                String temp = Enum.GetName(enumType, i);

                MemberInfo mInfo = enumType.GetMember(temp)[0];
                Object[] displays = mInfo.GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (displays.Length > 0)
                {
                    DescriptionAttribute display = displays[0] as DescriptionAttribute;

                    temp = display.Description;
                }

                list.Add(temp);
            }
            return list;
        }

        public static string EnumToString<T>(T obj)
        {
            string result = "";

            Dictionary<String, int> datas = EnumToDictionary<T>();
            foreach (var data in datas)
            {
                if ((data.Value & Convert.ToInt32(obj)) > 0)
                {
                    result += data.Key + ",";
                }
            }

            return result.TrimEnd(',');
        }

        public static T String2Enum<T>(this string str)
        {
            return (T)Enum.Parse(typeof(T), str);
        }

        #endregion

    }
}
