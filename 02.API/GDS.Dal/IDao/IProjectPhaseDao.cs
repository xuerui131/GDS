using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IProjectPhaseDao<T> : IDaoBase<T> where T : class
    {
        List<View_ProjectPhase> GetProjectPhaseListByProjectId(int ProjectId, int TemplateId);

        string GetTaskSubjects();

        string GetRiskSetting(string key);
    }
}
