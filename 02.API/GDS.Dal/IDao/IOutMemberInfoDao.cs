using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IOutMemberInfoDao<T> : IDaoBase<T> where T : class
    {
      
    }
}
