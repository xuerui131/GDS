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

    public class ImplTemplatePhase : ImplDaoBase<TemplatePhase>, ITemplatePhaseDao<TemplatePhase>
    {
        public List<TemplatePhase> GetTemplatePhaseByTemplateId(int templateId)
        {
            List<TemplatePhase> li = new List<TemplatePhase>();
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    li = db.Queryable<TemplatePhase>().Where(x=>x.TemplateId == templateId).OrderBy(x=>x.Sort).ToList();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return null;
            }
            return li;
        }

        public bool UpdateSort(int TemplateId, int Sort, int direction)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    if (direction == 1)
                    {
                        var li = db.SqlQuery<int>(" update TemplatePhase set sort = sort + 1 where TemplateId = @TemplateId and Sort > @Sort" , new { TemplateId, Sort});
                    }
                    else {
                        var li = db.SqlQuery<int>(" update TemplatePhase set sort = sort - 1 where TemplateId = @TemplateId and Sort > @Sort", new { TemplateId, Sort });
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                return false;
            }
        }

        public List<TemplatePhase> GetDataByName(string Name, int TemplateId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<TemplatePhase>().Where(x => x.Name == Name && x.TemplateId == TemplateId).ToList();

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