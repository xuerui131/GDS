using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface ITemplatePhaseDao<T> : IDaoBase<T> where T : class
    {
        List<TemplatePhase> GetTemplatePhaseByTemplateId(int templateId);

        bool UpdateSort(int TemplateId, int Sort, int direction); //1 + , 0 -

        List<TemplatePhase> GetDataByName(string Name, int TemplateId);
    }
}
