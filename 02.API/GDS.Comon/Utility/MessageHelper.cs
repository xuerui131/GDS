using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using System.Configuration;

namespace GDS.Comon
{
    /// <summary>
    /// 验证码生成
    /// </summary>
    public static class MessageResCode
    {
        public static XElement root;
        public static string path = ConfigurationManager.AppSettings["MessageResCodePath"];
        static MessageResCode()
        {
            root = XDocument.Load(path).Root;
        }

        public static string GetMessage(string code)
        {
            try
            {
                if (string.IsNullOrEmpty(code))
                {
                    return code;
                }

                return root.Elements().FirstOrDefault(x => x.Attribute("code").Value == code).Attribute("desc").Value;
            }
            catch
            {
                return null;
            }
        }

    
    }
}
