using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class ProjectType : ModelBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        //public int? Auditor { get; set; }

        public int DepartId { get; set; }
    }
}