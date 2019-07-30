using GDS.BLL;
using GDS.Comon;
using GDS.Entity;
using GDS.Entity.Constant;
using GDS.Entity.Result;

using GDS.Query;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using GDS.WebApi.Models;
using GDS.Comon.Enums;

namespace GDS.WebApi.Controllers
{
    public class ProjectController : BaseController
    {
        // GET: Project
        public ActionResult Index()
        {
            return View();
        }

        /*
        管理员：能看到所有项目，对所有项目有编辑权限。
        项目经理：进入能看到自己创建的项目及参与的项目，但对自己创建的项目有权限；
        普通用户：能看到所有自己参与的项目，可进行文档上传操作和表单的填写
        */
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                int userType = CurrenUserInfo.UserType;
                string loginName = CurrenUserInfo.LoginName;

                var query = new ProjectQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and CurrentStatus=1"); //CurrentStatus审批状态为1（同意）

                if (userType == GDS.Entity.Constant.ConstantDefine.ProjectManager) //
                {
                    sqlCondition.Append($" and (createby = '{loginName}' or charindex('{loginName}', projectmanager) >  0 or charindex('{loginName}', TeamMembers) > 0) ");
                }
                else if(userType == GDS.Entity.Constant.ConstantDefine.User) //
                {
                    sqlCondition.Append($"and charindex('{loginName}', TeamMembers) > 0");
                }

                if (!string.IsNullOrEmpty(query.DepartId) && query.DepartId!="0")
                {
                    sqlCondition.Append($" and BusinessDept = {query.DepartId}");
                }

                if (!string.IsNullOrEmpty(query.Status))
                {
                    sqlCondition.Append($" and Status = {query.Status}");
                }

                if (!string.IsNullOrEmpty(query.ProjectType))
                {
                    sqlCondition.Append($" and ProjectType = {query.ProjectType}");
                }

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                if (!string.IsNullOrEmpty(query.ProjectManager))
                {
                    sqlCondition.Append($" and ProjectManager like '%{query.ProjectManager}%'");
                }

                if (!string.IsNullOrEmpty(query.No))
                {
                    sqlCondition.Append($" and No like '%{query.No}%'");
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
                    project.CreateTimeStr = project.CreateTime.HasValue? project.CreateTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                });

                result = result.OrderByDescending(r => r.CreateTime).ToList();

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_Project>
                    {
                        TotalRecords = preq.Out_AllRecordCount,
                        DisplayRecords = preq.Out_PageCount,
                        ResultData = result
                    });

                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new ResponseEntity<object>(-999, string.Empty, ""), JsonRequestBehavior.AllowGet);
            }
        }

        //[AcceptVerbs(HttpVerbs.Get)]
        //public ActionResult GetApprovalList()
        //{
        //    try
        //    {
        //        var queryParams = new NameValueCollection();
        //        if (!ParamHelper.CheckParaQ(ref queryParams))
        //        {
        //            return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
        //        }

        //        int userType = CurrenUserInfo.UserType;
        //        string loginName = CurrenUserInfo.LoginName;

        //        var query = new ProjectQuery(queryParams);

        //        var sqlCondition = new StringBuilder();
        //        sqlCondition.Append("ISNULL(IsDelete,0)!=1 and CurrentStatus=0"); //CurrentStatus审批状态为0（草稿）

        //        if (userType != GDS.Entity.Constant.ConstantDefine.Admin)  //验证审批权限
        //        {
        //            var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

        //            if (departmentList != null && departmentList.Count > 0)
        //            {
        //                sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
        //            }
        //            else
        //            {
        //                return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
        //            }
        //        }

        //        //if (userType == GDS.Entity.Constant.ConstantDefine.ProjectManager) //
        //        //{
        //        //    sqlCondition.Append($" and (createby = '{loginName}' or projectmanager = '{loginName}' or charindex(';{loginName};', ';' + TeamMembers + ';') > 0) ");
        //        //}
        //        //else if (userType == GDS.Entity.Constant.ConstantDefine.User) //
        //        //{
        //        //    sqlCondition.Append($"and charindex(';{loginName};', ';' + TeamMembers + ';') > 0");
        //        //}
        //        if (userType == GDS.Entity.Constant.ConstantDefine.ProjectManager) //
        //        {
        //            sqlCondition.Append($" and (createby = '{loginName}' or charindex('{loginName}', projectmanager) >  0 or charindex('{loginName}', TeamMembers) > 0) ");
        //        }
        //        //else if (userType == GDS.Entity.Constant.ConstantDefine.User) //
        //        //{
        //        //    sqlCondition.Append($"and charindex(';{loginName};', TeamMembers) > 0");
        //        //}

        //        if (!string.IsNullOrEmpty(query.DepartId) && query.DepartId != "0")
        //        {
        //            sqlCondition.Append($" and BusinessDept = {query.DepartId}");
        //        }

        //        if (!string.IsNullOrEmpty(query.ProjectType))
        //        {
        //            sqlCondition.Append($" and ProjectType = {query.ProjectType}");
        //        }

        //        if (!string.IsNullOrEmpty(query.Name))
        //        {
        //            sqlCondition.Append($" and Name like '%{query.Name}%'");
        //        }

        //        if (!string.IsNullOrEmpty(query.CreateBy))
        //        {
        //            sqlCondition.Append($" and CreateBy like '%{query.CreateBy}%'");
        //        }

        //        PageRequest preq = new PageRequest
        //        {
        //            TableName = " [View_Project] ",
        //            Where = sqlCondition.ToString(),
        //            Order = " Id DESC ",
        //            IsSelect = true,
        //            IsReturnRecord = true,
        //            PageSize = query.PageSize,
        //            PageIndex = query.PageIndex,
        //            FieldStr = "*"
        //        };

        //        var result = new ProjectBLL().GetView_ProjectByPage(preq);

        //        result.ForEach(project => {
        //            project.CreateTimeStr = project.CreateTime.HasValue ? project.CreateTime.Value.ToString("yyyy-MM-dd") : string.Empty;
        //        });

        //        var response = new ResponseEntity<object>(true, string.Empty,
        //            new DataGridResultEntity<View_Project>
        //            {
        //                TotalRecords = preq.Out_AllRecordCount,
        //                DisplayRecords = preq.Out_PageCount,
        //                ResultData = result
        //            });

        //        return Json(response, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new ResponseEntity<object>(-999, string.Empty, ""), JsonRequestBehavior.AllowGet);
        //    }
        //}

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectById(int Id)
        {
            var result = new ProjectBLL().GetDataById(Id);

            if (result != null)
            {
                result.StartTimeStr = result.StartTime.HasValue ? result.StartTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                result.EndTimeStr = result.EndTime.HasValue ? result.EndTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                result.ApprovedAtStr = result.ApprovedAt.HasValue ? result.ApprovedAt.Value.ToString("yyyy-MM-dd") : string.Empty;
                result.PlanCheckAtStr = result.PlanCheckAt.HasValue ? result.PlanCheckAt.Value.ToString("yyyy-MM-dd") : string.Empty;
                var response = new ResponseEntity<Project>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<Project>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveProject(Project entity)
        {
            ResponseEntity<int> response;

            if (entity.ApprovalStatus == 2)//是否需要审批，1是2否
            {
                entity.CurrentStatus = (int)ProjectStatus.Approved; //0待审批  1同意  2拒绝
            }

            //NameEN + 20190702 + 001
            if (string.IsNullOrEmpty(entity.No))
            {
                string departNameEn = "GDS";
                if (CurrenUserInfo.Department != 0)
                {
                    var department = new DepartmentBLL().GetDataById(CurrenUserInfo.Department);

                    if (department != null && !string.IsNullOrEmpty(department.NameEN))
                    {
                        departNameEn = department.NameEN;
                    }
                }

                string date = DateTime.Today.ToString("yyyyMMdd");

                int count = new ProjectBLL().GetTodayCreateProject() + 1;

                entity.No = $"{departNameEn}{date}{count.ToString("D3")}";
            }

            if (entity.Id == 0)
            {
                ////
                //var list = new ProjectBLL().GetDataByName(entity.Name);

                //if (list != null && list.Count > 0)
                //{
                //    return Json(new ResponseEntity<object>(-999, "项目名称已存在", ""), JsonRequestBehavior.AllowGet);
                //}

                entity.IsDelete = 0;
                entity.CreateBy = CurrenUserInfo.LoginName;
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectBLL().InsertProject(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject, 
                         GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveProject, $"{result.Data}");
            }
            else
            {
                entity.UpdateBy = CurrenUserInfo.LoginName;
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectBLL().UpdateProject(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                         GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProject, $"{entity.Id}");
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteProject(int Id)
        {
            var result = new ProjectBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                        GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteProject, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateStatus(int Id, int Status, string currentPhase)
        {
            var entity = new ProjectBLL().GetDataById(Id);
            //if (entity != null && entity.Status == Status)
            //{
            //    return Json(new ResponseEntity<object>(0, "不能重复设置项目状态", ""), JsonRequestBehavior.AllowGet);
            //}

            var result = new ProjectBLL().UpdateStatus(Id, Status);
            if (!string.IsNullOrEmpty(currentPhase))
            {
                new ProjectBLL().UpdatePhase(Id, currentPhase);
            }
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                       GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionAudit, $"{Id} {Status}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateApprovalStatus(int Id, int Status)
        {
            //var entity = new ProjectBLL().GetDataById(Id);
            //if (entity != null && entity.CurrentStatus == Status)
            //{
            //    return Json(new ResponseEntity<object>(0, "", ""), JsonRequestBehavior.AllowGet);
            //}

            var ok = new ProjectBLL().VerifyAduitRight(CurrenUserInfo.LoginName, CurrenUserInfo.UserType, Id);

            if(!ok)
            {
                return Json(new ResponseEntity<object>(-999, "权限不足", ""), JsonRequestBehavior.AllowGet);
            }

            var result = new ProjectBLL().UpdateApprovalStatus(Id, Status);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                       GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionAudit, $"{Id} {Status}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }



        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult StartProjectPhase(int Id)  //
        {
            var entity = new ProjectBLL().GetDataById(Id);

            if (entity != null && entity.Status != (int)ProjectProgressStatus.NotStarted)
            {
                return Json(new ResponseEntity<object>(-999, "项目已经启动", ""), JsonRequestBehavior.AllowGet);
            }

            var result = new ProjectPhaseBLL().StartProjectPhase(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                  GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionStartPhase, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectPhasesByProjectId(int ProjectId)
        {
            var result = new ProjectPhaseBLL().GetProjectPhaseListByProjectId(ProjectId);

            if (result != null)
            {
                var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<object>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

 
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult PreviewProjectByProjectId(int ProjectId)
        {
            var result = new ProjectBLL().GetProjectPreviewByProjectId(ProjectId);

            if (result != null)
            {
                var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<object>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectBaseInfoByProjectId(int ProjectId)
        {
            var result = new ProjectBLL().GetProjectBaseInfoByProjectId(ProjectId);

            if (result != null)
            {
                var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<object>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectDetailByProjectId(int ProjectId)
        {
            var result = new ProjectBLL().GetProjectDetailByProjectId(ProjectId);

            if (result != null)
            {
                var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<object>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult VerifyAduitRight(int ProjectId)
        {
            var ok = new ProjectBLL().VerifyAduitRight(CurrenUserInfo.LoginName, CurrenUserInfo.UserType, ProjectId);

            if (ok)
            {
                return Json(new ResponseEntity<object>(0, "", true), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new ResponseEntity<object>(-999, "权限不足", false), JsonRequestBehavior.AllowGet);
            }
        }

        #region 草稿相关
        [HttpPost]
        [Route("draft")]
        public ActionResult SaveDraft(Project project)
        {
            ResponseEntity<int> response;
            
            //草稿编号
            string prefix = "草稿";
            string date = DateTime.Today.ToString("yyyyMMdd");
            int count = new ProjectBLL().GetTodayCreateProject() + 1;
            project.No = $"{prefix}{date}{count.ToString("D3")}";
            project.CurrentStatus = (int)ProjectStatus.Draft;

            if (project.Id == 0)
            {
                
                project.IsDelete = 0;
                project.CreateBy = CurrenUserInfo.LoginName;
                project.CreateTime = DateTime.Now;
                project.UpdateBy = "";
                project.UpdateTime = DateTime.Now;
                var result = new ProjectBLL().InsertProject(project);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                         GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveProjectDraft, $"{result.Data}");
            }
            else
            {
                project.UpdateBy = CurrenUserInfo.LoginName;
                project.UpdateTime = DateTime.Now;
                var result = new ProjectBLL().UpdateProject(project);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                         GDS.Entity.Constant.ConstantDefine.ActionSaveProjectDraft, GDS.Entity.Constant.ConstantDefine.ActionUpdateProject, $"{project.Id}");
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetDraftList()
        {
            try
            {
                var queryParams = new NameValueCollection();

                int userType = CurrenUserInfo.UserType;
                string loginName = CurrenUserInfo.LoginName;

                var query = new ProjectQuery(queryParams);

                var sqlCondition = new StringBuilder();

                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and CurrentStatus=-1"); //CurrentStatus审批状态为1（同意）

                sqlCondition.Append($" and createby='{loginName}' ");

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
                    project.StartTimeStr = project.StartTime.HasValue ? project.StartTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                    project.EndTimeStr = project.EndTime.HasValue ? project.EndTime.Value.ToString("yyyy-MM-dd") : string.Empty;

                    project.CreateTimeStr = project.CreateTime.HasValue ? project.CreateTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                });

                result = result.OrderByDescending(r => r.CreateTime).ToList();

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_Project>
                    {
                        TotalRecords = preq.Out_AllRecordCount,
                        DisplayRecords = preq.Out_PageCount,
                        ResultData = result
                    });

                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new ResponseEntity<object>(-999, string.Empty, ""), JsonRequestBehavior.AllowGet);
            }
        }


        #endregion
    }
}