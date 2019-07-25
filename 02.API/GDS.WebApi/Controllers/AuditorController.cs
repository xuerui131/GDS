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
    public class AuditorController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        /*
        有权限用户（部门负责人）可在此进行流程审核操作。
        各个部门负责人只能看到各自部门的流程记录，管理员和超级用户能看到所有部门的流程记录。
        */
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAuditorList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new AuditorQuery(queryParams);

                int userType = CurrenUserInfo.UserType;
                string loginName = CurrenUserInfo.LoginName;

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (userType != GDS.Entity.Constant.ConstantDefine.Admin)
                {
                    var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName);

                    if (departmentList != null && departmentList.Count > 0)
                    {
                        sqlCondition.Append($" and DepartId in ({string.Join(",", departmentList.Select(x=>x.Id))}");
                    }
                    else
                    {
                        return Json(new ResponseEntity<dynamic>(10, "权限不足", null), JsonRequestBehavior.AllowGet);
                    }
                }

                if (!string.IsNullOrEmpty(query.DepartId))
                {
                    sqlCondition.Append($" and DepartId = {query.DepartId}");
                }

                if (!string.IsNullOrEmpty(query.Status))
                {
                    sqlCondition.Append($" and Status = {query.Status}");
                }

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and Name like '%{query.Name}%'");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [View_Auditor] ",
                    Where = sqlCondition.ToString(),
                    Order = " createtime DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new ProjectBLL().GetView_AuditorByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<View_Auditor>
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
    }
}