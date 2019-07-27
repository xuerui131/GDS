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
using Newtonsoft.Json;

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

        /// <summary>
        /// 更新任务
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateTask(TaskJsonRequest request)
        {
            var result = new ProjectPhaseBLL().GetDataById(request.projectPhaseId);

            if (result == null)
            {
                return Json(new ResponseEntity<int>(false, "阶段不存在", 0), JsonRequestBehavior.AllowGet);
            }

            var tasks = new List<Task>();

            if (!string.IsNullOrEmpty(result.TaskJson))
            {
                tasks = JsonConvert.DeserializeObject<List<Task>>(result.TaskJson);
            }

            if (!request.newTask) //更新
            {
                var targetTask = tasks.FirstOrDefault(t => t.id == request.task.id);
                if (targetTask.id != 0)
                {
                    targetTask.subject = request.task.subject;
                    targetTask.log = request.task.log;
                    targetTask.owner = request.task.owner;
                    targetTask.description = request.task.description;
                    targetTask.detail = request.task.detail;
                    targetTask.startTime = request.task.startTime;
                    targetTask.endTime = request.task.endTime;
                    targetTask.updateTime = request.task.updateTime;
                    targetTask.workaround = request.task.workaround;
                    targetTask.status = request.task.status;
                }
            }
            else { //插入新的task
                tasks.Add(request.task);
            }

            string taskJson = JsonConvert.SerializeObject(tasks);

            var updateResult = new ProjectPhaseBLL().UpdateTask(request.projectPhaseId, taskJson);
            var response = new ResponseEntity<int>(updateResult.Success, updateResult.Message, updateResult.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{request.projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteTask(TaskJsonRequest request)
        {
            var result = new ProjectPhaseBLL().GetDataById(request.projectPhaseId);

            if (result == null)
            {
                return Json(new ResponseEntity<int>(false, "阶段不存在", 0), JsonRequestBehavior.AllowGet);
            }

            var tasks = new List<Task>();

            if (!string.IsNullOrEmpty(result.TaskJson))
            {
                tasks = JsonConvert.DeserializeObject<List<Task>>(result.TaskJson);
            }

            if (request.task.id != 0) //更新
            {
                var targetTask = tasks.FirstOrDefault(t => t.id == request.task.id);
                tasks.Remove(targetTask);
            }
          
            string taskJson = JsonConvert.SerializeObject(tasks);

            var updateResult = new ProjectPhaseBLL().UpdateTask(request.projectPhaseId, taskJson);
            var response = new ResponseEntity<int>(updateResult.Success, updateResult.Message, updateResult.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{request.projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 任务分类
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetTaskSubjectList()
        {
            var tasksStr = new ProjectPhaseBLL().GetTaskSubjects();
            var tasks = tasksStr.Split(';');
            var response = new ResponseEntity<string[]>(true, "", tasks);
            
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 更新风险
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult UpdateRisk(RiskJsonRequest request)
        {
            var result = new ProjectPhaseBLL().GetDataById(request.projectPhaseId);

            if (result == null)
            {
                return Json(new ResponseEntity<int>(false, "阶段不存在", 0), JsonRequestBehavior.AllowGet);
            }

            var risks = new List<Risk>();

            if (!string.IsNullOrEmpty(result.RiskJson))
            {
                risks = JsonConvert.DeserializeObject<List<Risk>>(result.RiskJson);
            }

            if (!request.newRisk) //更新
            {
                var targetRisk = risks.FirstOrDefault(t => t.id == request.risk.id);
                if (targetRisk.id != 0)
                {
                    targetRisk.riskType = request.risk.riskType;
                    targetRisk.severity = request.risk.severity;
                    targetRisk.detail = request.risk.detail;
                    targetRisk.nextSteps = request.risk.nextSteps;
                    targetRisk.assignedTo = request.risk.assignedTo;
                    targetRisk.targetDate = request.risk.targetDate;
                    targetRisk.status = request.risk.status;
                }
            }
            else
            { //插入新的risk
                risks.Add(request.risk);
            }

            string riskJson = JsonConvert.SerializeObject(risks);

            var updateResult = new ProjectPhaseBLL().UpdateRisk(request.projectPhaseId, riskJson);
            var response = new ResponseEntity<int>(updateResult.Success, updateResult.Message, updateResult.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{request.projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DeleteRisk(RiskJsonRequest request)
        {
            var result = new ProjectPhaseBLL().GetDataById(request.projectPhaseId);

            if (result == null)
            {
                return Json(new ResponseEntity<int>(false, "阶段不存在", 0), JsonRequestBehavior.AllowGet);
            }

            var risks = new List<Risk>();

            if (!string.IsNullOrEmpty(result.RiskJson))
            {
                risks = JsonConvert.DeserializeObject<List<Risk>>(result.RiskJson);
            }

            if (request.risk.id != 0) //更新
            {
                var targetRisk = risks.FirstOrDefault(t => t.id == request.risk.id);
                risks.Remove(targetRisk);
            }

            string riskJson = JsonConvert.SerializeObject(risks);

            var updateResult = new ProjectPhaseBLL().UpdateRisk(request.projectPhaseId, riskJson);
            var response = new ResponseEntity<int>(updateResult.Success, updateResult.Message, updateResult.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateProjectPhase, $"{request.projectPhaseId}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 风险类别
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetRiskTypeList()
        {
            var riskTypeStr = new ProjectPhaseBLL().getRiskSettings("TaskRiskType");
            var riskTypes = riskTypeStr.Split(';');
            var response = new ResponseEntity<string[]>(true, "", riskTypes);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 风险严重性
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetRiskSeverityList()
        {
            var riskSeveritiesStr = new ProjectPhaseBLL().getRiskSettings("TaskRiskSeverity");
            var riskSeverities = riskSeveritiesStr.Split(';');
            var response = new ResponseEntity<string[]>(true, "", riskSeverities);

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }

    public struct LinkedFormJsonRequest
    {   
        public int projectPhaseId { get; set; }
        public string linkedFormJson { get; set; }
    }

    public struct TaskJsonRequest
    {
        public int projectPhaseId { get; set; }
        public Task task { get; set; }

        public bool newTask { get; set; }
    }

    public class Task {
        public int id { get; set; }
        /// <summary>
        /// 分类
        /// </summary>
        public string subject { get; set; }

        /// <summary>
        /// 任务详情
        /// </summary>
        public string detail { get; set; }

        /// <summary>
        /// 任务描述
        /// </summary>
        public string description { get; set; }

        /// <summary>
        /// 状态记录
        /// </summary>
        public string log { get; set; }

        /// <summary>
        /// 负责人
        /// </summary>
        public string owner { get; set; }

        /// <summary>
        /// 开始日期
        /// </summary>
        public string startTime { get; set; }

        /// <summary>
        /// 完成日期
        /// </summary>
        public string endTime { get; set; }

        /// <summary>
        /// 变更日期
        /// </summary>
        public string updateTime { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 变通方案
        /// </summary>
        public string workaround { get; set; }
    }

    public struct RiskJsonRequest {
        public int projectPhaseId { get; set; }
        public Risk risk { get; set; }

        public bool newRisk { get; set; }
    }
    public class Risk {
        public int id { get; set; }

        /// <summary>
        /// 风险类别
        /// </summary>
        public string riskType { get; set; }

        /// <summary>
        /// 严重性
        /// </summary>
        public string severity { get; set; }

        /// <summary>
        /// 风险描述
        /// </summary>
        public string detail { get; set; }

        /// <summary>
        /// 后续工作计划
        /// </summary>
        public string nextSteps { get; set; }

        /// <summary>
        /// 责任人
        /// </summary>
        public string assignedTo { get; set; }

        /// <summary>
        /// 目标完成日期
        /// </summary>
        public string targetDate { get; set; }

        public string status { get; set; }

        /// <summary>
        /// 应急预案
        /// </summary>
        public string workaround { get; set; }
    }
}