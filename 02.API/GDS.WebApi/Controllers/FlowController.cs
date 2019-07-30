using GDS.BLL;
using GDS.Comon;
using GDS.Entity;
using GDS.Entity.Result;
using GDS.Query;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace GDS.WebApi.Controllers
{
    public class FlowController : BaseController
    {
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetApprovalList()
        {
            var queryParams = new NameValueCollection();
            if (!ParamHelper.CheckParaQ(ref queryParams))
            {
                return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
            }

            int userType = CurrenUserInfo.UserType;
            string loginName = CurrenUserInfo.LoginName;

            List<Department> departmentList = new List<Department>();
            if (userType != GDS.Entity.Constant.ConstantDefine.Admin)  //验证审批权限
            {
                departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

                if (departmentList == null || departmentList.Count == 0)
                {                    
                    return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
                }
            }

            var templateApprovalList = getTemplateApprovalList(queryParams, departmentList);
            var projectApprovalList = getPojectApprovalList(queryParams, departmentList);

            var approvalList = templateApprovalList.Select(template =>
            {
                return new
                {
                    Id = template.Id,
                    ItemType = "模板",
                    Name = template.Name,
                    DepartId = template.DepartmentId,
                    Description = template.Description,
                    CreateAt = template.CreateTime,
                    CreateTimeStr = template.CreateTimeStr,
                    CreateBy = template.CreateBy,
                    Status = template.Status
                };
            }).ToList();

            approvalList.AddRange(
                projectApprovalList.Select(project =>
                {
                    return new
                    {
                        Id = project.Id,
                        ItemType = "项目",
                        Name = project.Name,
                        DepartId = project.BusinessDept,
                        Description = project.Comments,
                        CreateAt = project.CreateTime,
                        CreateTimeStr = project.CreateTimeStr,
                        CreateBy = project.CreateBy,
                        Status = project.Status
                    };
                }).ToList()
            );

            if (queryParams.AllKeys.Contains("SearchType") && !string.IsNullOrEmpty(queryParams["SearchType"]))
            {
                approvalList = approvalList.Where(approval => approval.ItemType == queryParams["SearchType"]).ToList();
            }
            

            var response = new ResponseEntity<object>(true, string.Empty,
                   approvalList.OrderByDescending(approval => approval.CreateAt));

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        private List<View_Template> getTemplateApprovalList(NameValueCollection queryParams, List<Department> departmentList)
        {
            try
            {
                var query = new TemplateQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and status=0");//Status审批状态为0（草稿）,1同意，2拒绝

                if (departmentList != null && departmentList.Count > 0)
                {
                    sqlCondition.Append($" and DepartmentId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
                }

                //if (userType != GDS.Entity.Constant.ConstantDefine.Admin)  //验证审批权限
                //{
                //    var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

                //    if (departmentList != null && departmentList.Count > 0)
                //    {
                //        sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
                //    }
                //    else
                //    {
                //        return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
                //    }
                //}

                if (!string.IsNullOrEmpty(query.DepartId) && query.DepartId != "0")
                {
                    sqlCondition.Append($" and DepartmentId = {query.DepartId}");
                }

                //if (!string.IsNullOrEmpty(query.ProjectType))
                //{
                //    sqlCondition.Append($" and ProjectType = {query.ProjectType}");
                //}

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                if (!string.IsNullOrEmpty(query.CreateBy))
                {
                    sqlCondition.Append($" and CreateBy like '%{query.CreateBy}%'");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [View_Template] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new TemplateBLL().GetView_TemplateByPage(preq);
                result.ForEach(template => {
                    template.CreateTimeStr = template.CreateTime.HasValue ? template.CreateTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                });

                //var response = new ResponseEntity<object>(true, string.Empty,
                //    new DataGridResultEntity<View_Template>
                //    {
                //        TotalRecords = preq.Out_AllRecordCount,
                //        DisplayRecords = preq.Out_PageCount,
                //        ResultData = result
                //    });

                return result; //Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return new List<View_Template>();
            }
        }

        private List<View_Project> getPojectApprovalList(NameValueCollection queryParams, List<Department> departmentList)
        {
            try
            {
                var query = new ProjectQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and CurrentStatus=0"); //CurrentStatus审批状态为0（草稿）

                if (departmentList != null && departmentList.Count > 0)
                {
                    sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
                }

                //if (userType != GDS.Entity.Constant.ConstantDefine.Admin)  //验证审批权限
                //{
                //    var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

                //    if (departmentList != null && departmentList.Count > 0)
                //    {
                //        sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
                //    }
                //    else
                //    {
                //        return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
                //    }
                //}

                int userType = CurrenUserInfo.UserType;
                string loginName = CurrenUserInfo.LoginName;

                if (userType == GDS.Entity.Constant.ConstantDefine.ProjectManager) //
                {
                    sqlCondition.Append($" and (createby = '{loginName}' or projectmanager = '{loginName}' or charindex(';{loginName};', ';' + TeamMembers + ';') > 0) ");
                }
                else if (userType == GDS.Entity.Constant.ConstantDefine.User) //
                {
                    sqlCondition.Append($"and charindex(';{loginName};', ';' + TeamMembers + ';') > 0");
                }
                if (!string.IsNullOrEmpty(query.DepartId) && query.DepartId != "0")
                {
                    sqlCondition.Append($" and BusinessDept = {query.DepartId}");
                }

                if (!string.IsNullOrEmpty(query.ProjectType))
                {
                    sqlCondition.Append($" and ProjectType = {query.ProjectType}");
                }

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                if (!string.IsNullOrEmpty(query.CreateBy))
                {
                    sqlCondition.Append($" and CreateBy like '%{query.CreateBy}%'");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [View_Project] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new ProjectBLL().GetView_ProjectByPage(preq);

                result.ForEach(project => {
                    project.CreateTimeStr = project.CreateTime.HasValue ? project.CreateTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                });

                //var response = new ResponseEntity<object>(true, string.Empty,
                //    new DataGridResultEntity<View_Project>
                //    {
                //        TotalRecords = preq.Out_AllRecordCount,
                //        DisplayRecords = preq.Out_PageCount,
                //        ResultData = result
                //    });

                return result;
            }
            catch (Exception ex)
            {
                return new List<View_Project>();
            }
        }
    }
}