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

    public class ImplProjectPhase : ImplDaoBase<ProjectPhase>, IProjectPhaseDao<ProjectPhase>
    {
        public List<View_ProjectPhase> GetProjectPhaseListByProjectId(int ProjectId, int TemplateId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_ProjectPhase>(@" 
 select a.* 
      ,b.[Id] as ProjectPhaseId
      ,b.[ProjectId]
      ,b.[TemplatePhaseId]
      ,b.[StartTime]
      ,b.[EndTime]
      ,b.[Status]
 from TemplatePhase a left join (select * from ProjectPhase where ProjectId = @ProjectId  ) b on a.id = b.TemplatePhaseId 
       where a.TemplateId =@TemplateId  ", new { ProjectId, TemplateId });

                    return li;
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }


        }

        public string GetTaskSubjects()
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var subjectStr = db.GetString(@"select [value] from dbo.Settings where [key]='TaskSubjects'");

                    return subjectStr;
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