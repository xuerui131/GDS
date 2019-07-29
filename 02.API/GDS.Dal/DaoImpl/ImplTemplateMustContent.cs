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

    public class ImplTemplateMustContent : ImplDaoBase<TemplateMustContent>, ITemplateMustContentDao<TemplateMustContent>
    {

        public List<TemplateMustContent> GetTemplateMustContentsByTemplatePhaseId(int templatePhaseId)
        {
          
            List<TemplateMustContent> li = new List<TemplateMustContent>();
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    li = db.SqlQuery<TemplateMustContent>(@"select a.[Id]
      ,case  when [MustContentType] = 1 then a.name else b.Name end name
      ,case  when [MustContentType] = 1 then [Description] else b.content end [Description]
      ,a.[IsMust]
      ,a.[ProjectType]
      ,a.[FormId]
      ,a.[MustContentType]
      ,a.[TemplatePhaseId]
      ,a.[CreateBy]
      ,a.[CreateTime]
      ,a.[UpdateBy]
      ,a.[UpdateTime]
      ,a.[IsDelete]
      ,a.[Remark]
       from TemplateMustContent a left join FormLibrary b on a.FormId = b.id where a.templatePhaseId = @templatePhaseId", new { templatePhaseId }).ToList();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
            return li;
           
        }
    }
}