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
    public class SupplierInfoController : BaseController
    {
        // GET: SupplierInfo
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetSupplierInfoList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new SupplierInfoQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");


                PageRequest preq = new PageRequest
                {
                    TableName = " [SupplierInfo] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new SupplierInfoBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<SupplierInfo>
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
        public ActionResult GetSupplierInfoById(int Id)
        {
            var result = new SupplierInfoBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<SupplierInfo>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<SupplierInfo>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveSupplierInfo(SupplierInfo entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new SupplierInfoBLL().InsertSupplierInfo(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                 GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveSupplier, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new SupplierInfoBLL().UpdateSupplierInfo(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                 GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateSupplier, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteSupplierInfo(int Id)
        {
            var result = new SupplierInfoBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                 GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteSupplier, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}