//using LY.Middleware.Comon.Helper;
//using ServiceStack.Redis;
//using ServiceStack.Redis.Support;
using GDS.Comon;
using GDS.Comon.Config;
using ServiceStack.Redis;
using ServiceStack.Redis.Support;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;

namespace LY.Middleware.Comon.Cache
{
    public class RedisClientService
    {
        private static IDictionary<string, RedisClientService> _instances = new Dictionary<string, RedisClientService>();
        const string INSTANCE_KEY = "RedisServer";
        static object locker = new object();
        public PooledRedisClientManager Manager { get; set; }
        public static RedisClientService Instance
        {
            get
            {
                return CreateFromAppKey(INSTANCE_KEY);
            }
        }

        /// <summary>
        /// 防止实例化
        /// </summary>
        private RedisClientService() { }


        public static RedisClientService CreateFromAppKey(string key)
        {
            if (!_instances.ContainsKey(key))
            {
                lock (locker)
                {
                    _instances[key] = new RedisClientService(key);
                }
            }
            return _instances[key];
        }

        public RedisClientService(string key, int maxReadPoolSize = 80, int maxWritePoolSize = 50)
        {
            string[] redisServerReadWrite = ConfigParam.RedisServerReadWrite.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            string[] redisServerRead = ConfigParam.RedisServerRead.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

            Manager = new PooledRedisClientManager(redisServerReadWrite, redisServerRead,
                new RedisClientManagerConfig() { MaxReadPoolSize = maxReadPoolSize, MaxWritePoolSize = maxWritePoolSize });
        }

        //#region redis命令

        #region stringByHash
        public bool HExists(string hashid, string key)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                return mg.HExists(hashid, key.ToUtf8Bytes()) == 1;
            }
        }

        public string HGet(string hashid, string key)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                byte[] b = mg.HGet(hashid, key.ToUtf8Bytes());
                if (b == null)
                    return null;
                return Encoding.UTF8.GetString(b);
            }
        }

        public long HSet(string hashid, string key, string val)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                return mg.HSet(hashid, key.ToUtf8Bytes(), val.ToUtf8Bytes());
            }
        }


        public T HGet<T>(string hashid, string key)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                byte[] arr = mg.HGet(hashid, key.ToUtf8Bytes());
                if (arr != null)
                {
                    ObjectSerializer ser = new ObjectSerializer();
                    var obj = ser.Deserialize(arr);
                    if (obj != null)
                        return (T)obj;
                }
                return default(T);
            }
        }

        public long HSet<T>(string hashid, string key, T val)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                byte[] value = new ObjectSerializer().Serialize(val);

                return mg.HSet(hashid, key.ToUtf8Bytes(), value);
            }
        }

        public IList<T> HGetList<T>(string hashid, string[] keyList)
        {
            IList<T> list = new List<T>();
            using (var mg = (RedisClient)Manager.GetClient())
            {
                foreach (string key in keyList)
                {
                    byte[] arr = mg.HGet(hashid, key.ToUtf8Bytes());
                    if (arr != null)
                    {
                        ObjectSerializer ser = new ObjectSerializer();
                        var obj = ser.Deserialize(arr);
                        if (obj != null)
                            list.Add((T)obj);
                    }
                }
            }
            return list;
        }

        public long HSetDictionary<obj, T>(string hashid, IDictionary<obj, T> dicVal)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                int nResult = 0;
                byte[] value;
                ObjectSerializer objSerializer = new ObjectSerializer();
                foreach (KeyValuePair<obj, T> pair in dicVal)
                {
                    value = objSerializer.Serialize(pair.Value);
                    nResult = mg.HSet(hashid, pair.Key.ToString().ToUtf8Bytes(), value);
                    if (nResult <= 0)
                        break;
                }
                return nResult;
            }
        }
        public long HSetDictionary<obj, T>(string hashid, IDictionary<obj, T> dicVal, bool isRemoveListKey = false)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                int nResult = 0;
                byte[] keyList;
                byte[] value;
                ObjectSerializer objSerializer = new ObjectSerializer();
                foreach (KeyValuePair<obj, T> pair in dicVal)
                {
                    keyList = pair.Key.ToString().ToUtf8Bytes();
                    if (isRemoveListKey && mg.HExists(hashid, keyList) > 0)
                    {
                        nResult = mg.HDel(hashid, keyList);
                    }
                    value = objSerializer.Serialize(pair.Value);
                    nResult = mg.HSet(hashid, pair.Key.ToString().ToUtf8Bytes(), value);
                    if (nResult <= 0)
                        break;
                }
                return nResult;
            }
        }


        #region 移除功能
        public bool RemoveKey(string key)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                return mg.Remove(key);
            }
        }

        public int HRemoveKey(string hashid, string key)
        {
            using (var mg = (RedisClient)Manager.GetClient())
            {
                return mg.HDel(hashid, key.ToUtf8Bytes());
            }
        }

        #endregion

        //public Dictionary<Key, Value> GetDictionary<Key, Value>(string hashid, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        Dictionary<Key, Value> map = new Dictionary<Key, Value>();
        //        char[] aryChar = key.ToCharArray();
        //        foreach (char c in aryChar)
        //        {
        //            byte[] b = mg.HGet(hashid, key.ToUtf8Bytes());
        //            if (b != null)
        //                continue;
        //            map.Add(c.ToString().ToObject<Key>(), Encoding.UTF8.GetString(b).ToObject<Value>());

        //        }
        //        return map;
        //    }
        //}

        //public long SetDictionary<Key, Value>(string hashid, Dictionary<Key, Value> map)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        int nResult = 0;
        //        foreach (KeyValuePair<Key, Value> pair in map)
        //        {
        //            nResult = mg.HSet(hashid, pair.Key.ToString().ToUtf8Bytes(), pair.Value.ToJson().ToUtf8Bytes());
        //            if (nResult <= 0)
        //                break;
        //        }
        //        return nResult;
        //    }
        //}

        #endregion

        //#region ObjectByKey

        //public bool Exists(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.Exists(key) == 1;
        //    }
        //}

        //public bool Set(string key, string val, int cacheTotalMinutes = 0)// TimeSpan? expire = null)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        bool isReuslt;
        //        if (cacheTotalMinutes > 0)
        //        {
        //            TimeSpan expiresIn = TimeSpan.FromMinutes(cacheTotalMinutes);
        //            isReuslt = mg.Set(key, val, expiresIn);
        //            mg.ExpireEntryIn(key, expiresIn);
        //        }
        //        else
        //        {
        //            isReuslt = mg.Set(key, val);

        //        }
        //        return isReuslt;
        //    }
        //}

        //public string Get(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        try
        //        {
        //            return mg.Get<string>(key);
        //        }
        //        catch
        //        {
        //            return string.Empty;
        //        }
        //    }
        //}


        //public T GetObj<T>(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        try
        //        {
        //            return JsonHelper.ToObject<T>(mg.Get<string>(key));
        //        }
        //        catch
        //        {
        //            return mg.Get<T>(key);
        //        }
        //    }
        //}

        //public T GetObj<T>(string key, Func<T> func)
        //{
        //    return GetObj(key, 60, func);
        //}


        //public T GetObj<T>(string key, int cacheTotalMinutes, Func<T> func)
        //{
        //    if (Exists(key))
        //        return GetObj<T>(key);

        //    var result = func();
        //    SetObj(key, result, TimeSpan.FromMinutes(cacheTotalMinutes));
        //    SetObj(key + "V294", result, TimeSpan.FromHours(10));
        //    return result;
        //}

        //public bool SetObj<T>(string key, T val, TimeSpan? expire = null)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        if (expire == null)
        //        {
        //            //return mg.Set(key, JsonHelper.ToJson(val));

        //            return mg.Set<T>(key, val);
        //        }
        //        else
        //        {
        //            //var result = mg.Set(key, JsonHelper.ToJson(val), expire.Value);
        //            //mg.ExpireEntryIn(key, expire.Value);
        //            //return result;

        //            return mg.Set<T>(key, val, expire.Value);
        //        }
        //    }
        //}

        //public bool SetObj<T>(string key, T val, int cacheTotalMinutes)
        //{
        //    if (cacheTotalMinutes == 0)
        //    {
        //        return SetObj<T>(key, val);
        //    }
        //    else
        //    {
        //        return SetObj<T>(key, val, TimeSpan.FromMinutes(cacheTotalMinutes));
        //    }
        //}

        //public long Del(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.Del(key);
        //    }
        //}
        //#endregion

        //#region JsonByHash


        //public T JsonGet<T>(string hashid, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        string jsonval = mg.GetValueFromHash(hashid, key);

        //        if (!string.IsNullOrEmpty(jsonval))
        //        {
        //            T obj = jsonval.FromJson<T>();
        //            if (obj != null)
        //                return obj;
        //        }
        //    }

        //    return default(T);
        //}

        //public bool JsonSet<T>(string hashid, string key, T val)
        //{
        //    string json = "";

        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {

        //        if (val != null)
        //            json = val.ToJson();

        //        return mg.SetEntryInHash(hashid, key, json);
        //    }

        //}

        //public bool JsonDel(string hashid, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.RemoveEntryFromHash(hashid, key);
        //    }
        //}

        ///// <summary>
        ///// 获取hash集合，值为json
        ///// </summary>
        ///// <typeparam name="T">值类型</typeparam>
        ///// <param name="hashid">hash</param>
        ///// <returns>值列表</returns>
        //public List<T> JsonGetAll<T>(string hashid)
        //{
        //    List<T> result = new List<T>();

        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        List<String> jsonvals = mg.GetHashValues(hashid);

        //        if (result != null)
        //        {
        //            foreach (string jsonval in jsonvals)
        //            {
        //                try
        //                {
        //                    T obj = jsonval.FromJson<T>();
        //                    if (obj != null)
        //                        result.Add(obj);
        //                }
        //                catch
        //                {

        //                }
        //            }
        //        }
        //    }
        //    return result;
        //}


        //public Dictionary<string, T> JsonGetDict<T>(string hashid)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.HGetAll(hashid);
        //        Dictionary<string, T> result = new Dictionary<string, T>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i + 1];
        //                T obj = data.FromUtf8Bytes().FromJson<T>();

        //                if (obj != null)
        //                    result.Add(arr[i].FromUtf8Bytes(), obj);
        //            }
        //        }
        //        return result;
        //    }
        //}


        ///// <summary>
        ///// 返回 key 指定的哈希集中指定多个字段的值
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="hashid"></param>
        ///// <param name="keys"></param>
        ///// <param name="ignoreNullValue">返回列表中是否排除哈希集中不存在的每个字段，false = 包含不存在的字段值，true=不包含</param>
        ///// <returns></returns>
        //public List<T> JsonMGet<T>(string hashid, IEnumerable<string> keys, bool ignoreNullValue = true)
        //{
        //    if (keys == null || keys.Count() == 0)
        //    {
        //        return new List<T>();
        //    }
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.HMGet(hashid, keys.Select(d => d.ToUtf8Bytes()).ToArray());
        //        List<T> result = new List<T>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i++)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i];
        //                T obj = data.FromUtf8Bytes().FromJson<T>();
        //                if (obj != null)
        //                {
        //                    result.Add(obj);
        //                    continue;
        //                }
        //            }
        //            if (!ignoreNullValue)
        //            {
        //                result.Add(default(T));
        //            }
        //        }
        //        return result;
        //    }
        //}

        //public Dictionary<string, T> JsonMDict<T>(string hashid, IEnumerable<string> keys)
        //{
        //    Dictionary<string, T> result = new Dictionary<string, T>();
        //    if (keys == null || keys.Count() == 0)
        //    {
        //        return result;
        //    }
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        var keysArray = keys.ToArray();
        //        byte[][] arr = mg.HMGet(hashid, keysArray.Select(d => d.ToUtf8Bytes()).ToArray());
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i++)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i];
        //                T obj = data.FromUtf8Bytes().FromJson<T>();

        //                if (obj != null)
        //                    result.Add(keysArray[i], obj);
        //            }
        //        }
        //        return result;
        //    }
        //}


        //public void JsonMSet<T>(string hashid, Dictionary<string, T> map)
        //{
        //    if (map == null || map.Keys.Count == 0)
        //        return;
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        mg.HMSet(hashid, map.Keys.Select(d => d.ToUtf8Bytes()).ToArray(), map.Values.Select(d => d.ToJson().ToUtf8Bytes()).ToArray());
        //    }
        //}
        //#endregion

        //#region protobuf 屏蔽20180508 

        ////public long PSet<T>(string hashid, string key, T val)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        using (MemoryStream ms = new MemoryStream())
        ////        {
        ////            ProtoBuf.Serializer.Serialize<T>(ms, val);
        ////            return mg.HSet(hashid, key.ToUtf8Bytes(), ms.ToArray());
        ////        }
        ////    }
        ////}

        ////public void PMSet<T>(string hashid, string[] keys, T[] vals)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        mg.HMSet(hashid, keys.Select(d => d.ToUtf8Bytes()).ToArray(),
        ////            vals.Select(d =>
        ////            {
        ////                using (MemoryStream ms = new MemoryStream())
        ////                {
        ////                    ProtoBuf.Serializer.Serialize<T>(ms, d);
        ////                    return ms.ToArray();
        ////                }
        ////            }).ToArray());

        ////    }
        ////}


        /////// <summary>
        /////// 返回 key 指定的哈希集中指定多个字段的值
        /////// </summary>
        /////// <typeparam name="T"></typeparam>
        /////// <param name="hashid"></param>
        /////// <param name="keys"></param>
        /////// <param name="ignoreNullValue">返回列表中是否排除哈希集中不存在的每个字段</param>
        /////// <returns></returns>
        ////public List<T> PMGet<T>(string hashid, IEnumerable<string> keys, bool ignoreNullValue = true)
        ////{
        ////    if (keys == null || keys.Count() == 0)
        ////    {
        ////        return new List<T>();
        ////    }
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        byte[][] arr = mg.HMGet(hashid, keys.Select(d => d.ToUtf8Bytes()).ToArray());
        ////        List<T> result = new List<T>();
        ////        if (arr == null)
        ////            return result;
        ////        for (int i = 0; i < arr.Count(); i++)
        ////        {
        ////            if (arr[i] != null)
        ////            {
        ////                byte[] data = arr[i];
        ////                using (MemoryStream ms = new MemoryStream())
        ////                {
        ////                    ms.Write(data, 0, data.Length);
        ////                    ms.Position = 0;
        ////                    T obj = ProtoBuf.Serializer.Deserialize<T>(ms);
        ////                    ms.Close();
        ////                    if (obj != null)
        ////                    {
        ////                        result.Add(obj);
        ////                        continue;
        ////                    }
        ////                }

        ////            }
        ////            if (!ignoreNullValue)
        ////            {
        ////                result.Add(default(T));
        ////            }
        ////        }
        ////        return result;
        ////    }
        ////}

        ////public List<T> PGetAll<T>(string hashid)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        byte[][] arr = mg.HGetAll(hashid);
        ////        List<T> result = new List<T>();
        ////        if (arr == null)
        ////            return result;
        ////        for (int i = 0; i < arr.Count(); i += 2)
        ////        {
        ////            if (arr[i] != null)
        ////            {
        ////                byte[] data = arr[i + 1];
        ////                using (MemoryStream ms = new MemoryStream())
        ////                {
        ////                    ms.Write(data, 0, data.Length);
        ////                    ms.Position = 0;
        ////                    T obj = ProtoBuf.Serializer.Deserialize<T>(ms);
        ////                    ms.Close();

        ////                    if (obj != null)
        ////                        result.Add(obj);
        ////                }

        ////            }
        ////        }
        ////        return result;
        ////    }
        ////}

        ////public Dictionary<string, T> PGetDict<T>(string hashid)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        byte[][] arr = mg.HGetAll(hashid);
        ////        Dictionary<string, T> result = new Dictionary<string, T>();
        ////        if (arr == null)
        ////            return result;
        ////        for (int i = 0; i < arr.Count(); i += 2)
        ////        {
        ////            if (arr[i] != null && arr[i].Length > 0)
        ////            {
        ////                byte[] data = arr[i + 1];
        ////                using (MemoryStream ms = new MemoryStream())
        ////                {
        ////                    ms.Write(data, 0, data.Length);
        ////                    ms.Position = 0;
        ////                    T obj = ProtoBuf.Serializer.Deserialize<T>(ms);
        ////                    ms.Close();

        ////                    if (obj != null)
        ////                        result.Add(arr[i].FromUtf8Bytes(), obj);
        ////                }

        ////            }
        ////        }
        ////        return result;
        ////    }
        ////}


        ////public T PGet<T>(string hashid, string key)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        byte[] arr = mg.HGet(hashid, key.ToUtf8Bytes());
        ////        if (arr != null && arr.Length > 0)
        ////        {
        ////            using (MemoryStream ms = new MemoryStream())
        ////            {
        ////                ms.Write(arr, 0, arr.Length);
        ////                ms.Position = 0;
        ////                var obj = ProtoBuf.Serializer.Deserialize<T>(ms);
        ////                ms.Close();
        ////                if (obj != null)
        ////                    return obj;
        ////            }
        ////        }
        ////        return default(T);
        ////    }
        ////}
        //#endregion

        //#region Hash
        //public int HLen(string hashId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.HLen(hashId);
        //    }
        //}

        //public List<string> HKeys(string hash)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.HKeys(hash);
        //        List<string> result = new List<string>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Length; i++)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i];
        //                string obj = data.FromUtf8Bytes();
        //                if (obj != null)
        //                {
        //                    result.Add(obj);
        //                }
        //            }
        //        }
        //        return result;
        //    }
        //}


        //public long HSetList<T>(string hashid, Dictionary<string, T> dicVal)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        int nResult = 0;
        //        foreach (KeyValuePair<string, T> pair in dicVal)
        //        {
        //            byte[] value = new ObjectSerializer().Serialize(pair.Value);

        //            nResult = mg.HSet(hashid, pair.Key.ToUtf8Bytes(), value);
        //            if (nResult < 0)
        //                break;
        //        }
        //        return nResult;
        //    }
        //}

        //private List<T> HGetAll<T>(string hashid)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.HGetAll(hashid);
        //        List<T> result = new List<T>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i + 1];
        //                ObjectSerializer or = new ObjectSerializer();
        //                var item = or.Deserialize(data);

        //                if (item != null && item is T)
        //                    result.Add((T)item);

        //            }
        //        }
        //        return result;
        //    }
        //}

        //private Dictionary<string, T> HGetDict<T>(string hashid)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.HGetAll(hashid);
        //        Dictionary<string, T> result = new Dictionary<string, T>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i + 1];
        //                ObjectSerializer or = new ObjectSerializer();
        //                var item = or.Deserialize(data);

        //                if (item != null && item is T)
        //                    result.Add(arr[i].FromUtf8Bytes(), (T)item);

        //            }
        //        }
        //        return result;
        //    }
        //}


        //public List<T> HGetList<T>(string hashid, string[] keyList)
        //{
        //    List<T> list = new List<T>();
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        foreach (string key in keyList)
        //        {
        //            byte[] arr = mg.HGet(hashid, key.ToUtf8Bytes());
        //            if (arr != null)
        //            {
        //                ObjectSerializer ser = new ObjectSerializer();
        //                var obj = ser.Deserialize(arr);
        //                if (obj != null)
        //                    list.Add((T)obj);
        //            }
        //            //list.Add(default(T));
        //        }
        //    }
        //    return list;
        //}


        //public int HDel(string hashid, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.HDel(hashid, key.ToUtf8Bytes());
        //    }
        //}



        //#endregion

        //#region 原子操作

        //public long IncrBy(string key, int count)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.IncrBy(key, count);
        //    }
        //}

        ///// <summary>
        ///// 执行原子加1操作
        ///// </summary>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public long Incr(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.Incr(key);
        //    }
        //}

        //public int SetNX(string key, string value)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SetNX(key, value.ToUtf8Bytes());
        //    }
        //}

        //public int HIncrBy(string hash, string key, int incrementBy = 1)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.HIncrby(hash, key.ToUtf8Bytes(), incrementBy);
        //    }
        //}

        //public bool PExpire(string key, long ttlMs)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.PExpire(key, ttlMs);
        //    }
        //}
        //#endregion

        //#region 集合set

        //public int SIsMember(string setId, string value)
        //{
        //    if (value == null)
        //    {
        //        return 0;
        //    }
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SIsMember(setId, value.ToUtf8Bytes());
        //    }
        //}
        //public List<string> SMembers(string setId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.SMembers(setId);
        //        List<string> result = new List<string>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Length; i++)
        //        {
        //            if (arr[i] != null)
        //            {
        //                byte[] data = arr[i];
        //                string obj = data.FromUtf8Bytes();
        //                if (obj != null)
        //                {
        //                    result.Add(obj);
        //                }
        //            }
        //        }
        //        return result;
        //    }
        //}

        //public int SAdd(string setId, string value)
        //{
        //    if (value == null)
        //    {
        //        return 0;
        //    }
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SAdd(setId, value.ToUtf8Bytes());
        //    }
        //}
        //public int SAdd(string setId, List<string> values)
        //{
        //    if (values == null)
        //    {
        //        return 0;
        //    }
        //    int result = 0;
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        values.ForEach(value => result += mg.SAdd(setId, value.ToUtf8Bytes()));
        //    }
        //    return result;
        //}

        ///// <summary>
        ///// 返回集合存储的key的计数
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="setId"></param>
        ///// <param name="value"></param>
        ///// <returns></returns>
        //public int SCard(string setId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SCard(setId);
        //    }
        //}

        //public T SPop<T>(string setId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[] data = mg.SPop(setId);
        //        if (data != null)
        //        {
        //            return data.FromUtf8Bytes().FromJson<T>();
        //        }
        //    }
        //    return default(T);
        //}
        //public int SRem(string setId, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SRem(setId, key.ToUtf8Bytes());
        //    }
        //}

        //#endregion

        //#region 有序集合z

        ////public int ZCount(string setId, long min, long max)
        ////{
        ////    using (var mg = (RedisClient)Manager.GetClient())
        ////    {
        ////        return mg.ZCount(setId, min, max);
        ////    }
        ////}
        //public int ZCard(string setId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZCard(setId);
        //    }
        //}

        //public int ZAdd(string setId, long score, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZAdd(setId, score, key.ToUtf8Bytes());
        //    }
        //}


        //readonly static DateTime Date1970 = new DateTime(1970, 1, 1);

        //public int ZAdd(string setId, DateTime time, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZAdd(setId, (long)(time - Date1970).TotalMilliseconds, key.ToUtf8Bytes());
        //    }
        //}

        //public double ZIncrBy(string setId, long incr, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZIncrBy(setId, incr, key.ToUtf8Bytes());
        //    }
        //}

        ///// <summary>
        ///// 排名，不存在返回－1
        ///// </summary>
        ///// <param name="setId"></param>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public int ZRank(string setId, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZRank(setId, key.ToUtf8Bytes());
        //    }
        //}
        //public List<string> ZRange(string setId, int min, int max)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        //return mg.ZRange(setId, min, max).FromByteArray();
        //        return null;
        //    }
        //}
        //public Dictionary<string, long> ZRangeWithScore(string setId, int min, int max)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.ZRangeWithScores(setId, min, max);
        //        Dictionary<string, long> result = new Dictionary<string, long>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            result.Add(arr[i].FromUtf8Bytes(), arr[i + 1].FromUtf8Bytes().FromJson<long>());
        //        }
        //        return result;
        //    }
        //}
        //public Dictionary<string, long> ZRevRangeWithScore(string setId, int min, int max)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.ZRevRangeWithScores(setId, min, max);
        //        Dictionary<string, long> result = new Dictionary<string, long>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            result.Add(arr[i].FromUtf8Bytes(), arr[i + 1].FromUtf8Bytes().FromJson<long>());
        //        }
        //        return result;
        //    }
        //}


        //public Dictionary<string, long> ZRangeByScoreWithScores(string setId, long min, long max, int? skip, int? take)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.ZRangeByScoreWithScores(setId, min, max, skip, take);
        //        Dictionary<string, long> result = new Dictionary<string, long>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            result.Add(arr[i].FromUtf8Bytes(), arr[i + 1].FromUtf8Bytes().FromJson<long>());
        //        }
        //        return result;
        //    }
        //}

        //public Dictionary<string, long> ZRevRangeByScoreWithScores(string setId, long min, long max, int? skip, int? take)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[][] arr = mg.ZRevRangeByScoreWithScores(setId, min, max, skip, take);
        //        Dictionary<string, long> result = new Dictionary<string, long>();
        //        if (arr == null)
        //            return result;
        //        for (int i = 0; i < arr.Count(); i += 2)
        //        {
        //            result.Add(arr[i].FromUtf8Bytes(), arr[i + 1].FromUtf8Bytes().FromJson<long>());
        //        }
        //        return result;
        //    }
        //}



        //public List<string> ZRevRange(string setId, int min, int max)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        //return mg.ZRevRange(setId, min, max).FromByteArray();
        //        return null;
        //    }
        //}

        //public int ZRemRangeByRank(string setId, int start, int stop)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZRemRangeByRank(setId, start, stop);
        //    }
        //}

        //public int ZRemRangeByScore(string setId, long fromScore, long toScore)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZRemRangeByScore(setId, fromScore, toScore);
        //    }
        //}
        //public int ZRemRangeByScore(string setId, DateTime fromTime, DateTime toTime)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZRemRangeByScore(setId, (long)(fromTime - Date1970).TotalMilliseconds, (long)(toTime - Date1970).TotalMilliseconds);
        //    }
        //}



        ///// <summary>
        ///// 空值用 double.IsNaN判断
        ///// </summary>
        ///// <param name="setId"></param>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public double ZScore(string setId, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZScore(setId, key.ToUtf8Bytes());
        //    }
        //}


        //public int ZRem(string setId, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZRem(setId, key.ToUtf8Bytes());
        //    }
        //}

        //public List<string> ZRevRangeByScore(string setId, long min, long max, int? skip = null, int? take = null)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return null;
        //        //return mg.ZRevRangeByScore(setId, min, max, skip, take).FromByteArray();
        //    }
        //}

        //public List<string> ZRangeByScore(string setId, long min, long max, int? skip = null, int? take = null)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {

        //        // return mg.ZRangeByScore(setId, min, max, skip, take).FromByteArray();
        //        return null;
        //    }
        //}

        //#endregion

        //#region 列表

        ///// <summary>
        ///// 从右边入队
        ///// </summary>
        ///// <param name="listId"></param>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public int RPush(string listId, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.RPush(listId, key.ToUtf8Bytes());
        //    }
        //}


        //public string BLPop(string listid, int timeOutSecs)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        var data = mg.BLPop(listid, timeOutSecs);
        //        if (data != null && data.Length > 1)
        //        {
        //            return data[1].FromUtf8Bytes();
        //        }
        //    }
        //    return null;
        //}
        //public string LPop(string listId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        byte[] data = mg.LPop(listId);
        //        if (data != null && data.Length > 0)
        //        {
        //            return data.FromUtf8Bytes();
        //        }
        //    }
        //    return null;
        //}
        //public int LRem(string listId, int removeNoOfMatches, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.LRem(listId, removeNoOfMatches, key.ToUtf8Bytes());
        //    }
        //}


        //public int LLen(string listId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.LLen(listId);
        //    }
        //}
        //public List<string> LRange(string listId, int start, int stop)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return null;
        //        //return mg.LRange(listId, start, stop).FromByteArray();
        //    }
        //}


        //#endregion

        //#region 服务Server

        //public DateTime GetServerTime()
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        var arr = mg.Time();
        //        return new DateTime(1970, 1, 1)
        //                .AddSeconds(arr[0].FromUtf8Bytes().FromJson<long>())
        //                .AddMilliseconds(arr[1].FromUtf8Bytes().FromJson<double>() / 1000)
        //                .AddHours(8);
        //    }
        //}
        //#endregion




        //public bool RemoveEntry(string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.RemoveEntry(key);
        //    }
        //}


        //public byte[][] HVals(string hashId)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.HVals(hashId);
        //    }
        //}




        //public List<string> Keys(string pattern)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.SearchKeys(pattern);
        //    }
        //}

        //#region 订阅/发布

        ///// <summary>
        ///// 创建订阅
        ///// </summary>
        ///// <returns></returns>
        //public IRedisSubscription CreateSubscription()
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.CreateSubscription();
        //    }
        //}

        //public int PublishExpireMessage(string hash, string key)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.PublishMessage("channel:expirehash", hash + "->->" + key);
        //    }
        //}
        //public int PublishExpireMessage(string keyid)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.PublishMessage("channel:expirehash", keyid);
        //    }
        //}

        //public int ZUnionStore(string intoSetid, params string[] setIds)
        //{
        //    using (var mg = (RedisClient)Manager.GetClient())
        //    {
        //        return mg.ZUnionStore(intoSetid, setIds);
        //    }
        //}

        //#endregion

        //#endregion
    }
}
