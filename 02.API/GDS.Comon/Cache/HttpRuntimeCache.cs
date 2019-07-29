using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace GDS.Comon
{
    public class HttpRuntimeCache
    {

        private const int DefaultExpireTime = 30;

        public static void Add(string key, object value, bool isExpire = true)
        {
            var absoluteExpiration = DateTime.Now.AddMinutes(DefaultExpireTime);
            if (isExpire == false)
            {
                absoluteExpiration = DateTime.Now.Add(TimeSpan.MaxValue);
            }
            HttpRuntime.Cache.Insert(key, value, null, absoluteExpiration, TimeSpan.Zero);
        }
        public static void Add(string key, object value, int DefaultExpireTime)
        {
            var absoluteExpiration = DateTime.Now.AddMinutes(DefaultExpireTime);
            HttpRuntime.Cache.Insert(key, value, null, absoluteExpiration, TimeSpan.Zero);
        }
        public static void Add(string key, object value, TimeSpan timeSpan)
        {
            HttpRuntime.Cache.Insert(key, value, null, DateTime.Now.Add(timeSpan), TimeSpan.Zero);
        }

        public static void Update(string key, object value)
        {
            Add(key, value);
        }

        public static T Get<T>(string key)
        {
            return (T)HttpRuntime.Cache.Get(key);
        }

        public static object Get(string key)
        {
            return HttpRuntime.Cache.Get(key);
        }
        public static object GetClone<T>(string key)
        {
            return JsonHelper.Deserialize<T>(JsonHelper.Serializer(HttpRuntime.Cache.Get(key)));
        }

        public static bool Exists(string key)
        {
            return HttpRuntime.Cache.Get(key) != null;
        }

        public static void Remove(string key)
        {
            HttpRuntime.Cache.Remove(key);
        }
    }
}
