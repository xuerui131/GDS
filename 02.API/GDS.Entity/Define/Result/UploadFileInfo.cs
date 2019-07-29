using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    /// <summary>
    /// 上传接口返回值
    /// </summary>
    [Serializable]
    public class UploadFileInfo
    {
        /// <summary>
        /// 是否成功
        /// </summary>
        public virtual string state { get; set; }
        /// <summary>
        /// 路径
        /// </summary>
        public virtual string url { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public virtual string msg { get; set; }
    }
}
