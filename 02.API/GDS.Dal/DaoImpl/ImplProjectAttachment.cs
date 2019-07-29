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

    public class ImplProjectAttachment : ImplDaoBase<ProjectAttachment>, IProjectAttachmentDao<ProjectAttachment>
    {
        public List<ProjectAttachment> GetProjectAttachments(int TypeId, int type)
        {
            List<ProjectAttachment> li = new List<ProjectAttachment>();
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    li = db.Queryable<ProjectAttachment>().Where(x => x.ProjectId == TypeId).ToList();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
            return li;
        }

        public List<View_ProjectAttachment> GetView_ProjectAttachmentByPhaseId(int ProjectPhaseId, int TemplatePhaseId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_ProjectAttachment>(@" 
    select a.* 
      ,b.id as TemplateMustContentId
      ,b.[Name] as MustContentName
      ,b.[Description]
      ,b.[IsMust]
      ,b.[ProjectType]
      ,b.[FormId]
      ,b.[MustContentType]
      ,b.[TemplatePhaseId]
from (select * from ProjectAttachment where ProjectPhaseId = @ProjectPhaseId) a full join (select * from View_TemplateMustContent where TemplatePhaseId = @TemplatePhaseId ) b on  a.ProjectMustContentId = b.id
 order by isnull(b.id, 999999)
", new { ProjectPhaseId, TemplatePhaseId });

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