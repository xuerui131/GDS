using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class Position : ModelBase
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string NodeNum { get; set; }
        public int DepID { get; set; }
        public int ParentID { get; set; }
        public int CompanyID { get; set; }
        public string AddUser { get; set; }
        public DateTime AddTime { get; set; }
        public bool IsDel { get; set; }

    }
}