﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace GDS.Entity
{

    [Serializable]
    public class ProjectPhase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProjectId { get; set; }
        public int TemplatePhaseId { get; set; }
        public DateTime? PlannedStartTime { get; set; }
        public string PlannedStartTimeStr { get; set; }
        public DateTime? StartTime { get; set; }
        public string StartTimeStr { get; set; }
        public DateTime? PlannedEndTime { get; set; }
        public string PlannedEndTimeStr { get; set; }
        public DateTime? EndTime { get; set; }
        public string EndTimeStr { get; set; }
        public Nullable<int> Status { get; set; }
    
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public Nullable<int> IsDelete { get; set; }
        public string Remark { get; set; }

        public string DocListContentJson { get; set; }

        public string LinkedFormContentJson { get; set; }

        public string AMDContentJson { get; set; }

        /// <summary>
        /// 每个阶段下的任务列表，由PM添加，给指定的User。 每个User可以更改自己任务的状态。
        /// </summary>
        public string TaskJson { get; set; }

        /// <summary>
        /// 风险列表
        /// </summary>
        public string RiskJson { get; set; }
    }
}