using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Result
{
    public class DataGridResultEntity<T>
    {

        public int TotalRecords { get; set; }

        public int DisplayRecords { get; set; }

        public IList<T> ResultData { get; set; }
    }
}
