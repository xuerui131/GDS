using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IFormLibraryDao<T> : IDaoBase<T> where T : class
    {
        List<FormLibrary> GetDataByName(string Name);
    }
}
