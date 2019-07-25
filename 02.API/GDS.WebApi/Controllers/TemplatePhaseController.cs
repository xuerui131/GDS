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
    public class TemplatePhaseController : BaseController
    {
        // GET: TemplatePhase
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetTemplatePhaseList(int templateId = 0)
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new TemplatePhaseQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (templateId != 0)
                {
                    sqlCondition.Append(string.Format(" and templateId={0}", templateId));
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [TemplatePhase] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id ASC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new TemplatePhaseBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<TemplatePhase>
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
        public ActionResult GetTemplatePhaseById(int Id)
        {
            var result = new TemplatePhaseBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<TemplatePhase>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<TemplatePhase>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveTemplatePhase(TemplatePhaseReq entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                var list = new TemplatePhaseBLL().GetDataByName(entity.Name, entity.TemplateId);

                if (list != null && list.Count > 0)
                {
                    return Json(new ResponseEntity<object>(-999, "模板阶段已存在", ""), JsonRequestBehavior.AllowGet);
                }

                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new TemplatePhaseBLL().InsertTemplatePhaseReq(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveTemplatePhase, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new TemplatePhaseBLL().UpdateTemplatePhase(AutoMapper.Mapper.Map<TemplatePhase>(entity));
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateTemplatePhase, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        public ActionResult SaveTemplatePhaseList(List<TemplatePhaseReq> entities)
        {
            entities.ForEach(entity =>
            {
                SaveTemplatePhase(entity);
            });

            ResponseEntity<int> response = new ResponseEntity<int>();

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteTemplatePhase(int Id)
        {
            var result = new TemplatePhaseBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleTemplate,
                GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteTemplatePhase, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetTemplatePhaseListByTemplateId(int templateId)
        {
            var result = new TemplatePhaseBLL().GetTemplatePhaseListByTemplateId(templateId);

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
    }
}