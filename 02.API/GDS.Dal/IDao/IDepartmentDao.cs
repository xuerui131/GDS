using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IDepartmentDao<T> : IDaoBase<T> where T : class
    {
        List<Department> GetDepartmentByAuditor(string Auditor);

        List<View_Department> GetView_Departments();
    }
}
