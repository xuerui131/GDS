using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class UserDetail : ModelBase
    {
   
        public string UserID { get; set; }
        public int PostID { get; set; }
        public int DepartID { get; set; }
        public int CompanyID { get; set; }
        public string Images { get; set; }
        public int IsAgent { get; set; }
        public string AddUser { get; set; }
        public DateTime AddTime { get; set; }
        public int IsDel { get; set; }
        public int IsExam { get; set; }


    }
}