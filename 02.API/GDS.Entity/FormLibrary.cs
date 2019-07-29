using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class FormLibrary : ModelBase
    {
        public string Name { get; set; }
        public string Content { get; set; }
        public int ProjectType { get; set; }
    }
}