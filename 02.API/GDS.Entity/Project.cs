//------------------------------------------------------------------------------
// <auto-generated>
//     此代码已从模板生成。
//
//     手动更改此文件可能导致应用程序出现意外的行为。
//     如果重新生成代码，将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace GDS.Entity
{
    using System;
    using System.Collections.Generic;

    public partial class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string No { get; set; }
        public string Description { get; set; }
        public Nullable<int> ProjectType { get; set; }
        public int TemplateId { get; set; }
        public string ProjectManager { get; set; }
        public Nullable<System.DateTime> StartTime { get; set; }
        public string StartTimeStr { get; set; }
        public Nullable<System.DateTime> EndTime { get; set; }
        public string EndTimeStr { get; set; }
        public int? Supplier { get; set; }

        public string ReadOnlyRight { get; set; }
        public string EditRight { get; set; }
        public string Remark { get; set; }
        /// <summary>
        /// -1草稿 0待审批  1同意  2拒绝
        /// </summary>
        public int CurrentStatus { get; set; }
        public string CurrentPhase { get; set; }
        /// <summary>
        /// 0 未启动，1 进行中，2 已完成
        /// </summary>
        public int Status { get; set; }
        public string CreateBy { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
        public string CreateTimeStr { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> UpdateTime { get; set; }
        public Nullable<int> IsDelete { get; set; }

        public int ApprovalStatus { get; set; }
        public int BusinessDept { get; set; }
        public string BizPerson { get; set; }
        public string ProjectBackground { get; set; }
        public string ProjectRequest { get; set; }
        public string ProjectBenefit { get; set; }
        public string Deliverables { get; set; }
        public string ProjectOverall { get; set; }
        public string ProjectScope { get; set; }
        public string InScope { get; set; }
        public string OutScope { get; set; }
        public string SuccessCriteria { get; set; }
        public string ProjectResourcesCost { get; set; }
        public string ProjectSponsor { get; set; }
        public string SteeringGroup { get; set; }
        public string TeamMembers { get; set; }
        public string OutMembers { get; set; }
        public decimal MandaysCost { get; set; }
        public decimal SoftwareCost { get; set; }
        public decimal HardwareCost { get; set; }
        public decimal ProjectTotalCost { get; set; }
        public string Comments { get; set; }

        /// <summary>
        /// 签约客户
        /// </summary>
        public string SignedCustomer { get; set; }

        /// <summary>
        /// 数据中心
        /// </summary>
        public string DataCenter { get; set; }

        /// <summary>
        /// 项目范围
        /// </summary>
        public string Scope { get; set; }

        /// <summary>
        /// 项目成员
        /// </summary>
        public string ProjectMembers { get; set; }

        /// <summary>
        /// 成员职责
        /// </summary>
        public string Duty { get; set; }

        /// <summary>
        /// 风险
        /// </summary>
        public string Risk { get; set; }

        /// <summary>
        /// 声明
        /// </summary>
        public string Statement { get; set; }

        /// <summary>
        /// 立项时间
        /// </summary>
        public DateTime? ApprovedAt { get; set; }

        public string ApprovedAtStr { get; set; }

        /// <summary>
        /// 计划验收时间
        /// </summary>
        public DateTime? PlanCheckAt { get; set; }

        public string PlanCheckAtStr { get; set; }
    }
}