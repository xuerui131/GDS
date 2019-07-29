using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public static class CollectionExtensions
    {
        /// <summary>
        /// 获取多name数组
        /// </summary>
        /// <param name="value"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public static string[] GetDefaultValues(this NameValueCollection value, string name)
        {
            var result = value.GetValues(name);

            return result ?? new string[0];
        }
    }
}
