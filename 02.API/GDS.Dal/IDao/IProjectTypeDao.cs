using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IProjectTypeDao<T> : IDaoBase<T> where T : class
    {
        List<ProjectType> GetProjectTypesByDepartId(int DepartId);

        List<TempProjectType> GetTempProjectTypeList();

        List<ProjectType> GetDataByName(string Name);
    }
}
