using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IProjectAttachmentDao<T> : IDaoBase<T> where T : class
    {
        List<ProjectAttachment> GetProjectAttachments(int TypeId, int type);


        List<View_ProjectAttachment> GetView_ProjectAttachmentByPhaseId(int ProjectPhaseId, int TemplatePhaseId);
    }
}
