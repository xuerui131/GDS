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

    public class ImplProjectType : ImplDaoBase<ProjectType>, IProjectTypeDao<ProjectType>
    {
        public List<ProjectType> GetProjectTypesByDepartId(int DepartId)
        {

            List<ProjectType> li = new List<ProjectType>();
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    li = db.Queryable<ProjectType>().Where(x => x.DepartId == DepartId).ToList();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
            return li;

        }

        public List<TempProjectType> GetTempProjectTypeList()
        {

            List<TempProjectType> li = new List<TempProjectType>();
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    li = db.SqlQuery<TempProjectType>(@"
  select a.id departid, a.name departname, b.id projectypeid, b.name projecttypename
  from department a inner join projecttype b on a.id = b.departid
");
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
            return li;

        }

        public List<ProjectType> GetDataByName(string Name)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<ProjectType>().Where(x => x.Name == Name).ToList();

                    return li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}