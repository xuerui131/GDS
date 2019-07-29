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
    public class DepartmentController : BaseController
    {
        // GET: Department
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetDepartmentList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new DepartmentQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [Department] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new DepartmentBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<Department>
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetDepartmentAuditorList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new DepartmentQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [Department] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new DepartmentBLL().GetView_DepartmentAuditorByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_DepartmentAuditor>
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
        public ActionResult GetDepartmentById(int Id)
        {
            var result = new DepartmentBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<Department>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<Department>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveDepartment(Department entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDel = false;
                entity.AddTime = DateTime.Now;

                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new DepartmentBLL().InsertDepartment(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveDepartment, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new DepartmentBLL().UpdateDepartment(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateDepartment, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteDepartment(int Id)
        {
            var result = new DepartmentBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteDepartment, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult SetAuditor(int Id, string Auditor)
        {
            var result = new DepartmentBLL().UpdateAuditor(Id, Auditor);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveAuditor + Auditor, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult SetChargePerson(int Id, string ChargePerson)
        {
            var result = new DepartmentBLL().UpdateChargePerson(Id, ChargePerson);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveChargePerson + ChargePerson, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllDepartment(string name)
        {
            var result = new DepartmentBLL().GetDataAll();

            if (!string.IsNullOrEmpty(name))
            {
                result = result.Where(x => !string.IsNullOrEmpty(x.Name) && x.Name.IndexOf(name, StringComparison.InvariantCultureIgnoreCase) > -1).ToList();
            }

            if (result != null)
            {
                var response = new ResponseEntity<List<Department>>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<List<Department>>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetDepartmentStructure()
        {
            var result = new DepartmentBLL().GetView_Departments();

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