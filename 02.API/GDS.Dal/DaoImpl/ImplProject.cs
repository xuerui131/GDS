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

    public class ImplProject : ImplDaoBase<Project>, IProjectDao<Project>
    {
        public View_ProjectPreview GetProjectPreviewByProjectId(int ProjectId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_ProjectPreview>(@" 
  select a.*, b.name as projecttypename , b.DepartId, c.supplier as suppiername, d.name as templatename
     from  project a left join projecttype b on a.projecttype = b.id
     left join supplierinfo c on a.Supplier = c.id
	 left join template d on a.TemplateId = b.id  where a.Id = @ProjectId", new { ProjectId });

                    return li.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
        }

        public View_Index GetIndex(string user)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_Index>(@" 
   select count(1) as ProjectTotalCount,  sum(case when currentstatus = 1 then 1 else 0 end ) ProcessingCount,
	      sum(case when currentstatus = 2 then 1 else 0 end )  CompleteCount
   from  project");

                    string sql = $@" 
	 select count(1)
     from  project where projectmanager = '{user}' or charindex(';{user};', ';' + TeamMembers + ';') > 0";

                    var fellowCount = db.SqlQuery<int>(sql).FirstOrDefault();

                    if (li != null && li.Count == 1)
                    {
                        li[0].FellowCount = fellowCount;
                    }

                    return li.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }

        }

        public List<Project> GetDataByName(string Name)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<Project>().Where(x => x.Name == Name).ToList();

                    return li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public int GetTodayCreateProject()
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    DateTime today = DateTime.Today;

                    var obj = db.Queryable<Project>().Where(x => x.CreateTime > today).Count();

                    return obj;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public View_Project GetView_ProjectByProjectId(int ProjectId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_Project>(@" 
  select *
     from  View_project where Id = @ProjectId", new { ProjectId });

                    return li.FirstOrDefault();
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