using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Enums
{
    /// <summary>
    /// 项目审核状态
    /// </summary>
    public enum ProjectStatus
    {
        Draft = -1,
        PendingApproval = 0,
        Approved = 1,
        Rejected = 2
    }

    /// <summary>
    /// 项目进行状态
    /// </summary>
    public enum ProjectProgressStatus
    {
        NotStarted = 0,
        InProgress = 1,
        Complete = 2
    }
}
