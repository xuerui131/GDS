using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface ISupplierInfoDao<T> : IDaoBase<T> where T : class
    {
        List<SupplierInfo> GetDataByName(string Name);
    }
}
