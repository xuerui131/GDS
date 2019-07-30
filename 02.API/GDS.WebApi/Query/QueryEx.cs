using System;
using System.Collections.Generic;
using System.Collections.Specialized;

namespace GDS.Query
{
    public class LogQuery : BaseQuery
    {

        public string OperationModule { get; set; }
        public LogQuery()
        {
        }
        public LogQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            OperationModule = queryParams["OperationModule"];
        }
    }

    public class TemplateQuery : BaseQuery
    {
        //public string ProjectType { get; set; }
        public string DepartId { get; set; }

        public string Name { get; set; }

        public string CreateBy { get; set; }

        public TemplateQuery()
        {

        }
        public TemplateQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
            DepartId = queryParams["DepartId"];
            CreateBy = queryParams["CreateBy"];
        }
    }

    public class ProjectQuery : BaseQuery
    {
        public string ProjectType { get; set; }

        public string DepartId { get; set; }

        public string Name { get; set; }

        public string No { get; set; }

        public string ProjectManager { get; set; }

        public string Status { get; set; }


        public string UserName { get; set; }

        //我管理的项目1 ， 我参与的项目2 ，所有项目0
        public string View { get; set; }


        public string UserType { get; set; }

        public string CreateBy { get; set; }

        public ProjectQuery()
        {
        }
        public ProjectQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            DepartId = queryParams["DepartId"];
            ProjectType = queryParams["ProjectType"];
            View = queryParams["View"];
          
            Name = queryParams["Name"];
            No = queryParams["No"];
            Status = queryParams["Status"];

            ProjectManager = queryParams["ProjectManager"];

            CreateBy = queryParams["CreateBy"];
        }
    }

    public class ProjectAttachmentQuery : BaseQuery
    {
        public ProjectAttachmentQuery()
        {
        }
        public ProjectAttachmentQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class ProjectPhaseQuery : BaseQuery
    {
        public ProjectPhaseQuery()
        {
        }
        public ProjectPhaseQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class BaseDataQuery : BaseQuery
    {
        public string GroupType { get; set; }


        public BaseDataQuery()
        {
        }
        public BaseDataQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            GroupType = queryParams["GroupType"];
        }
    }

    public class TemplatePhaseQuery : BaseQuery
    {
        public TemplatePhaseQuery()
        {
        }
        public TemplatePhaseQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class TemplateMustContentQuery : BaseQuery
    {
        public TemplateMustContentQuery()
        {
        }
        public TemplateMustContentQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class ProjectTypeQuery : BaseQuery
    {
        public string Name { get; set; }

        public ProjectTypeQuery()
        {
        }
        public ProjectTypeQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
        }
    }

    public class FormLibraryQuery : BaseQuery
    {
        public string DepartId { get; set; }

        public string ProjectType { get; set; }

        public string Name { get; set; }

        public FormLibraryQuery()
        {

        }
        public FormLibraryQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            DepartId = queryParams["DepartId"];
            ProjectType = queryParams["ProjectType"];
            Name = queryParams["Name"];
        }
    }

    public class SupplierInfoQuery : BaseQuery
    {
        public SupplierInfoQuery()
        {
        }
        public SupplierInfoQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class AuditorQuery : BaseQuery
    {
        public string DepartId { get; set; }

        public string Status { get; set; }

        public string Name { get; set; }

        public AuditorQuery()
        {

        }
        public AuditorQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            DepartId = queryParams["DepartId"];
            Status = queryParams["Status"];
            Name = queryParams["Name"];
        }
    }

    public class DepartmentQuery : BaseQuery
    {
        public string Name { get; set; }

        public DepartmentQuery()
        {
        }
        public DepartmentQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
        }
    }

    public class PositionQuery : BaseQuery
    {
        public string Name { get; set; }

        public PositionQuery()
        {
        }
        public PositionQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
        }
    }

    public class UserDetailQuery : BaseQuery
    {
        public UserDetailQuery()
        {
        }
        public UserDetailQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class UsersQuery : BaseQuery
    {
        public string Name { get; set; }

        public UsersQuery()
        {
        }
        public UsersQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
        }
    }


    public class OutMemberInfoQuery : BaseQuery
    {
        public string Name { get; set; }

        public OutMemberInfoQuery()
        {
        }
        public OutMemberInfoQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
            Name = queryParams["Name"];
        }
    }

}

