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

    public class ImplTemplate : ImplDaoBase<Template>, ITemplateDao<Template>
    {
        public List<Template> GetDataByName(string Name)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<Template>().Where(x => x.Name == Name).ToList();

                    return li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public View_Template GetView_TemplateByTemplateId(int TemplateId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var li = db.SqlQuery<View_Template>(@" 
  select *
     from  View_Template where Id = @TemplateId", new { TemplateId });

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