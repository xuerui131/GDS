using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public static class EnumHelper
    {
        /// <summary>
        /// 获取枚举类型的中文描述
        /// </summary>
        /// <param name="e"></param>
        /// <returns></returns>
        public static string GetEnumDscription(Enum e)
        {
            FieldInfo EnumInfo = e.GetType().GetField(e.ToString());
            if (EnumInfo != null)
            {
                DescriptionAttribute[] EnumAttributes = (DescriptionAttribute[])EnumInfo.
                    GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (EnumAttributes.Length > 0)
                {
                    return EnumAttributes[0].Description;
                }
                return e.ToString();
            }
            return string.Empty;
        }

        /// <summary>
        /// 将int类型转化为自定义类型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <returns></returns>
        public static T ToEnum<T>(this int value)
        {
            EnumConverter converter = new EnumConverter(typeof(T));
            return (T)converter.ConvertFrom(value.ToString());
        }

        /// <summary>
        /// 获取枚举数据列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="e"></param>
        /// <returns></returns>
        public static Dictionary<string, int> GetEnumDataList<T>()
        {
            var eType = typeof(T);
            var enumNames = Enum.GetNames(eType);
            var enumValues = Enum.GetValues(eType).Cast<int>().ToArray();

            var result = new Dictionary<string, int>();

            for (var i = 0; i < enumNames.Length; i++)
            {
                result.Add(enumNames[i], enumValues[i]);
            }

            return result;
        }
    }
}
