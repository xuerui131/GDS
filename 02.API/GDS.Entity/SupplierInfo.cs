using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class SupplierInfo : ModelBase
    {
        public string Supplier { get; set; }
        public string SupplierContact { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}