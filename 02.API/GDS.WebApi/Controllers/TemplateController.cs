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

namespace GDS.WebApi.Controllers
{
    public class TemplateController : BaseController
    {
        // GET: Template
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetTemplateList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new TemplateQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and Status=1");

                if (!string.IsNullOrEmpty(query.DepartId))
                {
                    sqlCondition.Append($" and DepartId = {query.DepartId}");
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

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_Template>
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

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetApprovalList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new TemplateQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1 and status=0");//Status审批状态为0（草稿）,1同意，2拒绝

                int userType = CurrenUserInfo.UserType;
                string loginName = CurrenUserInfo.LoginName;

                if (userType != GDS.Entity.Constant.ConstantDefine.Admin)  //验证审批权限
                {
                    var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

                    if (departmentList != null && departmentList.Count > 0)
                    {
                        sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x => x.Id))}) ");
                    }
                    else
                    {
                        return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
                    }
                }

                if (!string.IsNullOrEmpty(query.DepartId) && query.DepartId != "0")
                {
                    sqlCondition.Append($" and DepartId = {query.DepartId}");
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

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_Template>
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


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetTemplateById(int Id)
        {
            var result = new TemplateBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<Template>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<Template>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveTemplate(Template entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                //
                var list = new TemplateBLL().GetDataByName(entity.Name);

                if (list != null && list.Count > 0)
                {
                    return Json(new ResponseEntity<object>(-999, "项目模板名称已存在", ""), JsonRequestBehavior.AllowGet);
                }

                entity.IsDelete = 0;
                entity.CreateBy = CurrenUserInfo.LoginName;
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new TemplateBLL().InsertTemplate(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                 GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveTemplate, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = CurrenUserInfo.LoginName;
                entity.UpdateTime = DateTime.Now;
                var result = new TemplateBLL().UpdateTemplate(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateTemplate, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteTemplate(int Id)
        {
            var result = new TemplateBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                 GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteTemplate, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateStatus(int Id, int Status)
        {
            //var entity = new TemplateBLL().GetDataById(Id);
            //if (entity != null && entity.Status == Status)
            //{
            //    return Json(new ResponseEntity<object>(0, "不能重复设置模板状态", ""), JsonRequestBehavior.AllowGet);
            //}

            var ok = new TemplateBLL().VerifyAduitRight(CurrenUserInfo.LoginName, CurrenUserInfo.UserType, Id);

            if(!ok)
            {
                return Json(new ResponseEntity<object>(-999, "权限不足", ""), JsonRequestBehavior.AllowGet);
            }

            var result = new TemplateBLL().UpdateStatus(Id, Status);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionAudit, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult VerifyAduitRight(int TemplateId)
        {
            var ok = new TemplateBLL().VerifyAduitRight(CurrenUserInfo.LoginName, CurrenUserInfo.UserType, TemplateId);

            if (ok)
            {
                return Json(new ResponseEntity<object>(0, "", true), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new ResponseEntity<object>(-999, "权限不足", false), JsonRequestBehavior.AllowGet);
            }
        }
    }
}