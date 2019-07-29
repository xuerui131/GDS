using ServiceStack.Redis;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Cache
{
    public class ReidsManager
    {
        private static ReidsManager uniqueInstance;//定义一个静态变量来保存类的实例
        private static readonly object locker = new object();//定义一个线程锁
        public static IRedisClient Redisclient;//实例化一个Reids对象

        #region 全局访问点
        public ReidsManager()
        {
            string RedisCacheStr = ConfigurationManager.AppSettings["RedisServerReadWrite"];
            string[] RedisArray = RedisCacheStr.Split(':');
            if (RedisArray.Count() == 2)
            {
                Redisclient = new RedisClient(RedisArray[0], int.Parse(RedisArray[1]));
            }
        }

        /// <summary>
        /// 全局访问点
        /// </summary>
        /// <returns></returns>
        public static ReidsManager GetInstance()
        {
            if (uniqueInstance == null)
            {
                lock (locker)
                {
                    if (uniqueInstance == null)
                    {
                        uniqueInstance = new ReidsManager();
                    }
                }
            }
            return uniqueInstance;
        }
        #endregion


        //获取缓存值
        public static T Get<T>(string key)
        {
            return Redisclient.Get<T>(key);
        }

        //设置缓存值
        public static bool Set<T>(string key, T value)
        {
            return Redisclient.Set(key, value);
        }

        /// <summary>
        /// 设置缓存值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <param name="Minutes">分钟</param>
        /// <returns></returns>
        public static bool Set<T>(string key, T value, int Minutes)
        {
            return Redisclient.Set(key, value, DateTime.Now.AddMinutes(Minutes));
        }

        /// <summary>
        /// 删除缓存
        /// </summary>
        /// <param name="key"></param>
        public static void Remove(string key)
        {
            Redisclient.Remove(key);
        }

        /// <summary>
        /// 添加一个对象到一个集合
        /// </summary>
        /// <param name="SetId"></param>
        /// <param name="value"></param>
        public static void AddItemToSet(string SetId, string value)
        {
            Redisclient.AddItemToSet(SetId, value);
        }
        /// <summary>
        /// 添加一个对象到一个集合
        /// </summary>
        /// <param name="SetId"></param>
        /// <param name="value"></param>
        public static void AddItemToSet(string SetId, List<string> value)
        {
            Redisclient.AddRangeToSet(SetId, value);
        }

        /// <summary>
        /// 删除一个对象到一个集合
        /// </summary>
        /// <param name="SetId"></param>
        /// <param name="value"></param>
        public static void RemoveItemFromSet(string SetId, string value)
        {
            Redisclient.RemoveItemFromSet(SetId, value);
        }


        //判断一个对象是否在集合里面
        public static bool SetContainsItem(string SetId, string value)
        {
            return Redisclient.SetContainsItem(SetId, value);
        }

        //出队里
        public static string Popqueue(string listId)
        {
            return Redisclient.DequeueItemFromList(listId);
        }

        //如队列
        public static void Pushqueue(string listId, string value)
        {
            Redisclient.EnqueueItemOnList(listId, value);
        }


        public static void SetValue<T>(string key, T entity, int minute)
        {
            TimeSpan timeSpan = TimeSpan.FromMinutes(minute);
            Redisclient.As<T>().SetEntry(key, entity, timeSpan);
        }

        public static T GetValue<T>(string key)
        {
            return Redisclient.As<T>().GetValue(key);
        }
    }
}
