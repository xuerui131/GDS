using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    [Serializable]
    public class ModelBase
    {
        public int Id { get; set; }
        public DateTime? CreateTime { get; set; }  //创建时间
        public string CreateBy { get; set; }       //创建人
        public DateTime? UpdateTime { get; set; }  //最后修改时间
        public string UpdateBy { get; set; }       //最后人
        //public DateTime? DeleteTime { get; set; }  //删除时间
        //public string DeleteBy { get; set; }       //删除人
        public int IsDelete { get; set; }          //1表示删除
        public string Remark { get; set; }          //备注 描述信息
    }
}
