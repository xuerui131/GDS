using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IProjectDao<T> : IDaoBase<T> where T : class
    {
        View_ProjectPreview GetProjectPreviewByProjectId(int ProjectId);

        View_Index GetIndex(string user);

        List<Project> GetDataByName(string Name);

        int GetTodayCreateProject();

        View_Project GetView_ProjectByProjectId(int ProjectId);
    }
}
