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
    public class ProjectAttachmentController : BaseController
    {
        // GET: ProjectAttachment
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetProjectAttachmentList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new ProjectAttachmentQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");


                PageRequest preq = new PageRequest
                {
                    TableName = " [ProjectAttachment] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new ProjectAttachmentBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<ProjectAttachment>
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
        public ActionResult GetProjectAttachmentById(int Id)
        {
            var result = new ProjectAttachmentBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<ProjectAttachment>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<ProjectAttachment>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveProjectAttachment(ProjectAttachment entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectAttachmentBLL().InsertProjectAttachment(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                     GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpload, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new ProjectAttachmentBLL().UpdateProjectAttachment(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                     GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpload, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteProjectAttachment(int Id)
        {
            var result = new ProjectAttachmentBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                     GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionDeleteUpload, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateStatus(int Id, int Status)
        {
            var result = new ProjectAttachmentBLL().UpdateStatus(Id, Status, CurrenUserInfo.LoginName);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                     GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUploadAgree, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateUploadFile(int Id, string Url, string Name)
        {
            var result = new ProjectAttachmentBLL().UpdateUploadFile(Id, Url, Name);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleProject,
                     GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateUpload, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}