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
    public class UsersController : BaseController
    {
        // GET: Users
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetUsersList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new UsersQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");

                if (!string.IsNullOrEmpty(query.Name))
                {
                    sqlCondition.Append($" and (Name like '%{query.Name}%'  or UserName like '%{query.Name}%')");
                }

                PageRequest preq = new PageRequest
                {
                    TableName = " [Users] ",
                    Where = sqlCondition.ToString(),
                    Order = " Id DESC ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new UsersBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<Users>
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
        public ActionResult GetUsersById(int Id)
        {
            var result = new UsersBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<Users>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<Users>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveUsers(Users entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.AddTime = DateTime.Now;

                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new UsersBLL().InsertUsers(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveUsers, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new UsersBLL().UpdateUsers(entity);
               
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateUsers, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteUsers(int Id)
        {
            var result = new UsersBLL().DeleteDataById(Id);
            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteUsers, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetUsersByDepartId(int departId)
        {
            var result = new UsersBLL().GetUsersByDepartId(departId);
            var response = new ResponseEntity<object>(true, "", result);
            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateDisable(int Id, bool Disable)
        {
            var result = new UsersBLL().UpdateDisable(Id, Disable);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetAllUsers(string name)
        {
            var result = new UsersBLL().GetDataAll();

            if (!string.IsNullOrEmpty(name))
            {
                result = result.Where(x=> (!string.IsNullOrEmpty(x.Name) && x.Name.IndexOf(name, StringComparison.InvariantCultureIgnoreCase) > -1 )
                     || (!string.IsNullOrEmpty(x.UserName) && x.UserName.IndexOf(name, StringComparison.InvariantCultureIgnoreCase) > -1)).ToList();
            }

            if (result != null)
            {
                var response = new ResponseEntity<List<Users>>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<List<Users>>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetPM(string name)
        {
            //仅返回项目经理角色的UserId
            var pmUserIds = new BackUserRoleBindBLL().GetDataAll().Where(role => role.RoleId == 3).Select(u => u.UId); //UsersBLL().GetDataAll();

            //if (!string.IsNullOrEmpty(name))
            //{
            //    result = result.Where(x => (!string.IsNullOrEmpty(x.Name) && x.Name.IndexOf(name, StringComparison.InvariantCultureIgnoreCase) > -1)
            //         || (!string.IsNullOrEmpty(x.UserName) && x.UserName.IndexOf(name, StringComparison.InvariantCultureIgnoreCase) > -1)).ToList();
            //}

            var allUsers = new UsersBLL().GetDataAll().Where(user=> pmUserIds.Contains(user.Id)).ToList();
           
            if (allUsers != null)
            {
                var response = new ResponseEntity<List<Users>>(true, ConstantDefine.TipQuerySuccess, allUsers);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<List<Users>>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }
    }
}