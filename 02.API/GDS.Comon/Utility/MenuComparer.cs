using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Utility
{
    public class MenuComparer : IEqualityComparer<View_BackMenu>
    {
        public bool Equals(View_BackMenu x, View_BackMenu y)
        {
            if (x == null)
                return y == null;
            return x.Id == y.Id;
        }

        public int GetHashCode(View_BackMenu obj)
        {
            if (obj == null)
                return 0;
            return obj.Id.GetHashCode();
        }
    }
}
