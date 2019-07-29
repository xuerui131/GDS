using System.Text;
using System.Xml;
using System.Xml.Serialization;
using System.IO;

namespace GDS.Comon
{
    /// <summary>
    /// Xml帮助类
    /// </summary>
    public static class XmlHelper
    {
        /// <summary>
        /// 序列化xml
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public static T SerializerXmlToObject<T>(string xml)
        {
            if (string.IsNullOrEmpty(xml))
                return default(T);

            var doc = new XmlDocument();

            doc.LoadXml(xml);

            var xe = doc.DocumentElement;
            var rootName = xe.Name;
            var nameSpace = xe.NamespaceURI ?? string.Empty;

            var rootAttr = new XmlRootAttribute(rootName) { Namespace = nameSpace };
            var serializer = new XmlSerializer(typeof(T), rootAttr);

            var xmlnsMgr = new XmlNamespaceManager(doc.NameTable);
            xmlnsMgr.AddNamespace("wi", nameSpace);

            using (var reader = new StreamReader(new MemoryStream(Encoding.UTF8.GetBytes(doc.SelectSingleNode("/wi:" + rootName, xmlnsMgr).OuterXml ?? ""))))
            {
                var sObject = (T)serializer.Deserialize(reader);

                return sObject;
            }
        }

        /// <summary>
        /// 序列化Xml文件
        /// </summary>
        /// <typeparam name="T">类型</typeparam>
        /// <param name="file">文件</param>
        /// <returns>序列化后的对象</returns>
        public static T SerializerXmlToObject<T>(FileInfo file)
        {
            TextReader tr = new StreamReader(file.FullName);
            var xml = tr.ReadToEnd();
            tr.Close();

            return SerializerXmlToObject<T>(xml);
        }

        public static FileInfo GetXmlInfo(string path)
        {
            if (!string.IsNullOrEmpty(path) && File.Exists(path))
            {
                return new FileInfo(path);
            }
            else
            {
                throw new FileNotFoundException();
            }
        }

        /// <summary>
        /// 序列化
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static T SerializerXmlToObjectByPath<T>(string xmlpath)
        {
            return SerializerXmlToObject<T>(GetXmlInfo(xmlpath));
        }
    }
}
