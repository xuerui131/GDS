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
    public class ProjectPhaseController : BaseController
    {
        // GET: ProjectPhase
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectPhaseList(int projectId)
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new ProjectPhaseQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (projectId != 0)
                {
                    sqlCondition.Append(string.Format(" and projectId={0}", projectId));
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [ProjectPhase] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id ASC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new ProjectPhaseBLL().GetDataByPage(preq);

                if (result != null)
                {
                    result.ForEach(pp =>
                    {
                        pp.StartTimeStr = pp.StartTime.HasValue ? pp.StartTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                        pp.PlannedStartTimeStr = pp.PlannedStartTime.HasValue ? pp.PlannedStartTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                        pp.EndTimeStr = pp.EndTime.HasValue ? pp.EndTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                        pp.PlannedEndTimeStr = pp.PlannedEndTime.HasValue ? pp.PlannedEndTime.Value.ToString("yyyy-MM-dd") : string.Empty;
                    });
                }

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<ProjectPhase>
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
        public ActionResult GetProjectPhaseById(int Id)
        {
            var result = new ProjectPhaseBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<ProjectPhase>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<ProjectPhase>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveProjectPhaseList(ProjectPhase[] listEntity)
        {
            ResponseEntity<int> response = new ResponseEntity<int>(true, string.Empty, 0);

            listEntity.ToList().ForEach(entity =>
            {
                SaveProjectPhase(entity);
            });

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveProjectPhase(ProjectPhase entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectPhaseBLL().InsertProjectPhase(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                    GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectPhaseBLL().UpdateProjectPhase(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                    GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteProjectPhase(int Id)
        {
            var result = new ProjectPhaseBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
               GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        //


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult CompletePhase(int Id)  //
        {
            var entity = new ProjectPhaseBLL().GetDataById(Id);
            if (entity != null && entity.Status == 2)
            {
                return Json(new ResponseEntity<object>(0, "该项目阶段已经完成", ""), JsonRequestBehavior.AllowGet);
            }

            var result = new ProjectPhaseBLL().CompletePhase(Id, 2);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionCompletePhase, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateStatus(int Id, int status)  //
        {
            var result = new ProjectPhaseBLL().UpdateStatus(Id, status);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateDocList(int projectPhaseId, string docListJson)  //更新阶段的文档列表
        {
            var result = new ProjectPhaseBLL().UpdateDocList(projectPhaseId, docListJson);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        //[AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateAMDList(int projectPhaseId, string amdContentJson)  //更新阶段的文档列表
        {
            var result = new ProjectPhaseBLL().UpdateAMDContent(projectPhaseId, amdContentJson);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateLinkedForm(LinkedFormJsonRequest request)//int projectPhaseId, string linkedFormJson)  //更新阶段的关联表单
        {
            var result = new ProjectPhaseBLL().UpdateLinkedForm(request.projectPhaseId, request.linkedFormJson);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{request.projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }

    public struct LinkedFormJsonRequest
    {   
        public int projectPhaseId { get; set; }
        public string linkedFormJson { get; set; }
    }
}