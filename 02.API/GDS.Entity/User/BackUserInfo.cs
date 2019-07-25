using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    [Serializable]
    public class BackUserInfo : ModelBase
    {
        public string LoginName { get; set; }
      
        public string Name { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
       
        /// <summary>
        /// 用户状态（0：在职，1：离职，2：停职）
        /// </summary>
        public int State { get; set; }
      
        public string loginToken { get; set; } //最后登录的token
        public DateTime? loginTokenTime { get; set; } //最后登录的时间

        public int UserType { get; set; }
        public string UserTypeDesc { get; set; }
        public int Department { get; set; }


    }
}
