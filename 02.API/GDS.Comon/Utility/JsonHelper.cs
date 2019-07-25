using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class JsonHelper
    {
        /// <summary>
        /// 对象序列化成Json
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string Serializer<T>(T t)
        {
            try
            {
                IsoDateTimeConverter timeFormat = new IsoDateTimeConverter();
                timeFormat.DateTimeFormat = "yyyy-MM-dd HH:mm:ss";
                // Response.Write(JsonConvert.SerializeObject(bll.GetModelList(strWhere), Newtonsoft.Json.Formatting.Indented, timeFormat));
                string json = JsonConvert.SerializeObject(t, Formatting.Indented, timeFormat);
                return json;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }

        }
        /// <summary>
        /// Json反序列化成对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T Deserialize<T>(string json)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(json);
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }
    }
}
