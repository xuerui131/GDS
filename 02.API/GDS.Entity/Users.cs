using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class Users:ModelBase
    {
     
        public string PowerNum { get; set; }
        public string StaffNo { get; set; }
        public string Name { get; set; }
        public string NameEN { get; set; }
        public string PinyinJC { get; set; }
        public string UserName { get; set; }
        public string Pwd { get; set; }
        public string Phone { get; set; }
        public string Tel { get; set; }
        public string FixedTel { get; set; }
        public string MilitaryTel { get; set; }
        public string Email { get; set; }
        public string BirthDay { get; set; }
        public string JoinJob { get; set; }
        public decimal WorkingAge { get; set; }
        public string EntryDate { get; set; }
        public int Sex	 {get;set;}
        public int IsMarry { get; set; }
        public bool Disable { get; set; }   //禁用启用标识 0启用  1禁用
        public byte[] Images { get; set; }  //image
        public string IDCard { get; set; }
        public string Spouse { get; set; }  
        public int IsDel { get; set; }
        public DateTime AddTime { get; set; }

        public string loginToken { get; set; } //最后登录的token
        public DateTime? loginTokenTime { get; set; } //最后登录的时间

    }
}