using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class Department : ModelBase
    {
        public string DepmentNo { get; set; }
        public string Name { get; set; }
        public string NameEN { get; set; }
        public int RegionID { get; set; }
        public int ParentID { get; set; }
        public int TypeID { get; set; }
        public int DeptTypeID { get; set; }
        public int CompanyID { get; set; }
        public string Address { get; set; }
        public string AddressEN { get; set; }
        public string Zip { get; set; }
        public int SortID { get; set; }
        public DateTime AddTime { get; set; }
        public bool IsDel { get; set; }
        public int IsAgent { get; set; }
        public int IsEnabled { get; set; }

        public string Auditor { get; set; }
        public string ChargePerson { get; set; }

    }
}