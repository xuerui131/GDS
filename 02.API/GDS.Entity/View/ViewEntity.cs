using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    public class View_Project:Project
    {
        public string ProjectTypeName { get; set; }

        public int DepartId { get; set; }

        public string CreateTimeStr { get; set; }
    }

    public class View_ProjectPreview:Project
    {
        public string ProjectTypeName { get; set; }

        public int DepartId { get; set; }

        public string TemplateName { get; set; }

        public string SupplierName { get; set; }

        public List<View_TemplatePhase> TemplatePhases { get; set; }
        public List<ProjectAttachment> ProjectAttachments { get; set; }
    }

    public class View_ProjectDetail : Project
    {
        public string ProjectTypeName { get; set; }

        public int DepartId { get; set; }

        public string TemplateName { get; set; }

        public string SupplierName { get; set; }

        public List<View_ProjectPhase> ProjectPhases { get; set; }
        public List<ProjectAttachment> ProjectAttachments { get; set; }
    }

    //public class View_ProjectBaseInfo : Project
    //{
    //    public string ProjectTypeName { get; set; }

    //    public int DepartId { get; set; }

    //    public string TemplateName { get; set; }

    //    public string SupplierName { get; set; }

    //    public List<ProjectAttachment> ProjectAttachments { get; set; }
    //}


    public class View_Template:Template
    {
        public string ProjectTypeName { get; set; }

        public int DepartId { get; set; }

        public string CreateTimeStr { get; set; }
    }

    public class View_TemplatePhase:TemplatePhase
    {
        public List<TemplateMustContent> MustContentList { get; set; }
    }

    public class View_ProjectPhase : TemplatePhase
    {
        public int ProjectPhaseId { get; set; }
        public int ProjectId { get; set; }
        public int TemplatePhaseId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public Nullable<int> Status { get; set; }

        public List<View_ProjectAttachment> MustContentAttachmentList { get; set; }

        public List<View_ProjectAttachment> OthersAttachmentList { get; set; }
    }

    public class View_ProjectAttachment : ProjectAttachment
    {
        public int? TemplateMustContentId { get; set; }
        public string MustContentName { get; set; }  //必要内容的名称
        public string Description { get; set; }
        public Nullable<int> IsMust { get; set; }
        public Nullable<int> ProjectType { get; set; }
        public Nullable<int> FormId { get; set; }
        public Nullable<int> MustContentType { get; set; }
        public Nullable<int> TemplatePhaseId { get; set; }

        public int UploadStatus { get; set; } //上传状态 1 已上传 0 未上传
    }

    //聚合项目和模板
    public class View_Auditor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Nullable<int> ProjectType { get; set; }  

        public int DepartId { get; set; }  //部门
        public Nullable<int> Status { get; set; }

        public int Type { get; set; }  //0代表模板, 1代表项目

        public string CreateBy { get; set; }
        public Nullable<System.DateTime> CreateTime { get; set; }
    }

    //public class View_ProjectType
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //    public int ParentId { get; set; }
    //    public List<View_ProjectType> NextLevels { get; set; }
    //}

    public class View_FormLibrary : FormLibrary
    {
        public string ProjectTypeName { get; set; }

        public int DepartId { get; set; }
    }

    public class View_Index
    {
        public int ProjectTotalCount { get; set; }

        public int ProcessingCount { get; set; }

        public int CompleteCount { get; set; }

        public int FellowCount { get; set; }
    }

    public class View_DepartmentAuditor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Auditor { get; set; }
    }

    public class View_DepartAndProjectType
    {
        public int DepartId { get; set; }

        public string DepartName { get; set; }

        public List<View_ProjectType> ProjectTypes{get;set;}
    }

    public class View_ProjectType
    {
        public int ProjectTypeId { get; set; }

        public string ProjectTypeName { get; set; }
    }

    public class TempProjectType
    {
        public int DepartId { get; set; }

        public string DepartName { get; set; }

        public int ProjectTypeId { get; set; }

        public string ProjectTypeName { get; set; }
    }

    public class View_Department : Department
    {
        public string ParentDepartName { get; set; }

        public List<View_Department> SubDepartments { get; set; }  //下级部门
    }
}
