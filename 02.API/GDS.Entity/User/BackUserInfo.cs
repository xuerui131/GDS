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
        /// <summary>
        /// 对应数据库中的UserName，账号
        /// </summary>
        public string LoginName { get; set; }
      
        /// <summary>
        /// 显示名（中文名）
        /// </summary>
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
