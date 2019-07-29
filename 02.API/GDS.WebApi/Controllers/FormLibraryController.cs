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
    public class FormLibraryController : BaseController
    {
        // GET: FormLibrary
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetFormLibraryList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new FormLibraryQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

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

                PageRequest preq = new PageRequest
                {
                    TableName = " [View_FormLibrary] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new FormLibraryBLL().GetView_FormLibraryByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_FormLibrary>
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
        public ActionResult GetFormLibraryById(int Id)
        {
            var result = new FormLibraryBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<FormLibrary>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<FormLibrary>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
        public ActionResult SaveFormLibrary(FormLibrary entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                var list = new FormLibraryBLL().GetDataByName(entity.Name);

                if (list != null && list.Count > 0)
                {
                    return Json(new ResponseEntity<object>(-999, "表单已存在", ""), JsonRequestBehavior.AllowGet);
                }

                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new FormLibraryBLL().InsertFormLibrary(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
             GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveFormLibrary, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new FormLibraryBLL().UpdateFormLibrary(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
             GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateFormLibrary, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteFormLibrary(int Id)
        {
            var result = new FormLibraryBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
             GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteFormLibrary, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}