using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{

    public class BackRole : ModelBase
    {
        public string Name { get; set; }

        public string RoleNo { get; set; }

        public int Sequence { get; set; }

        public int IsEnable { get; set; }
    }
    public class BindBackRole : BackRole
    {
        public int IsBind { get; set; }

        public int OperationId { get; set; }
    }
}
