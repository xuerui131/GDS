using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GDS.Entity;
using SqlSugar;
using GDS.Comon;

namespace GDS.Dal
{

    public class ImplDepartment : ImplDaoBase<Department>, IDepartmentDao<Department>
    {
        public List<Department> GetDepartmentByAuditor(string Auditor)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<Department>().Where(x => x.Auditor == Auditor).ToList();

                    return li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<View_Department> GetView_Departments()
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_Department>(@"  select a.*, b.name parentdepartname 
from [Department] a left join  [Department] b on a.parentid = b.id
 ");

                    return li;
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
        }
    }
}