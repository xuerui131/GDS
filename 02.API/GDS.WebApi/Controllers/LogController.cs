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
    public class LogController : BaseController
    {
        // GET: Log
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetLogList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new LogQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (!string.IsNullOrEmpty(query.OperationModule))
                {
                    sqlCondition.Append($" and OperationModule = '{query.OperationModule}' ");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [Log] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new LogBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<Log>
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
        public ActionResult GetLogById(int Id)
        {
            var result = new LogBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<Log>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<Log>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        //[AcceptVerbs(HttpVerbs.Post)]
        //public ActionResult SaveLog(Log entity)
        //{
        //    ResponseEntity<int> response;

        //    if (entity.Id == 0)
        //    {
        //        entity.IsDelete = 0;
           
        //        entity.CreateTime = DateTime.Now;
               
        //        var result = new LogBLL().InsertLog(entity);
               
        //        response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
        //    }
        //    else
        //    {
              
        //        var result = new LogBLL().UpdateLog(entity);
               
        //        response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
        //    }

        //    return Json(response, JsonRequestBehavior.AllowGet);
        //}


        //[AcceptVerbs(HttpVerbs.Get)]
        //public ActionResult DeleteLog(int Id)
        //{
        //    var result = new LogBLL().DeleteDataById(Id);
        //    var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
        //    return Json(response, JsonRequestBehavior.AllowGet);
        //}
    }
}