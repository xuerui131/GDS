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

namespace GDS.WebApi.Controllers
{
    public class BackRoleController : BaseController
    {
        // GET: BackRole
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 角色信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackRoleList()
        {
            try
            {
                var queryParams = new NameValueCollection();
                if (!ParamHelper.CheckParaQ(ref queryParams))
                {
                    return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
                }

                var query = new BackRoleQuery(queryParams);

                var sqlCondition = new StringBuilder();
                sqlCondition.Append("ISNULL(IsDelete,0)!=1");
                PageRequest preq = new PageRequest
                {
                    TableName = " [BackRole] ",
                    Where = sqlCondition.ToString(),
                    Order = " Sequence asc ",
                    IsSelect = true,
                    IsReturnRecord = true,
                    PageSize = query.PageSize,
                    PageIndex = query.PageIndex,
                    FieldStr = "*"
                };

                var result = new BackRoleBLL().GetDataByPage(preq);

                var response = new ResponseEntity<object>(true, string.Empty,
                    new DataGridResultEntity<BackRole>
                    {
                        TotalRecords = preq.Out_AllRecordCount,
                        DisplayRecords = preq.Out_PageCount,
                        ResultData = result
                    });

                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new ResponseEntity<object>(-999, string.Empty, "系统异常"), JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据Id获取角色信息
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackRoleById(int Id)
        {
            var result = new BackRoleBLL().GetDataById(Id);

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

        /// <summary>
        /// 保存角色
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveBackRole(BackRole entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackRoleBLL().AddBackRole(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeAdd, GDS.Entity.Constant.ConstantDefine.ActionSaveRole, $"{result.Data}");

            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackRoleBLL().UpdateBackRole(entity);
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

                new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeUpdate, GDS.Entity.Constant.ConstantDefine.ActionUpdateRole, $"{entity.Id}");

            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteBackRole(int Id)
        {
            var result = new BackRoleBLL().DeleteBackRole(Id);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            new LogBLL().LogEvent(CurrenUserInfo.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData,
                GDS.Entity.Constant.ConstantDefine.TypeDelete, GDS.Entity.Constant.ConstantDefine.ActionDeleteRole, $"{Id}");

            return Json(response, JsonRequestBehavior.AllowGet);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult BindMenu(int Id, string MenuIds)
        {
            var result = new BackRoleMenuBindBLL().BindMenu(Id, MenuIds);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetMenuIdsByRoleId(int Id)
        {
            List<BackRoleMenuBind> BindListMenu = new List<BackRoleMenuBind>();
            BindListMenu = new BackRoleMenuBindBLL().GetMenuIdsByRoleId(Id).ToList();

            List<BackMenu> ListMenu = new List<BackMenu>();
            ListMenu = new BackMenuBLL().GetDataAll();

            List<BindMenu> MyMenu = new List<BindMenu>();
            foreach (var v in ListMenu.Where(T => T.ParentId == 0))
            {
                int IsBind = 0;
                int operationRight = 0;

                if (BindListMenu.Exists(T => T.MenuId == v.Id))
                {
                    IsBind = 1;

                    operationRight = BindListMenu.Where(x => x.MenuId == v.Id).Max(x => x.OperationRight);
                }

                MyMenu.Add(new BindMenu
                {
                    Id = v.Id,
                    MenuIcon = v.MenuIcon,
                    ParentId = 0,
                    AccessUrl = v.AccessUrl,
                    Sequence = v.Sequence,
                    Name = v.Name,
                    MenuNo = v.MenuNo,
                    IsBind = IsBind,
                    OperationRight = operationRight
                });
            }
            MyMenu = MyMenu.OrderBy(T => T.Sequence).ToList();

            foreach (var v in MyMenu)
            {
                List<BindMenu> subMenuLi = new List<BindMenu>();

                foreach (var va in ListMenu.Where(T => T.ParentId == v.Id))
                {
                    int IsBind = 0;
                    int operationRight = 0;

                    if (BindListMenu.Exists(T => T.MenuId == va.Id))
                    {
                        IsBind = 1;

                        operationRight = BindListMenu.Where(x => x.MenuId == va.Id).Max(x => x.OperationRight);
                    }
                    subMenuLi.Add(new BindMenu
                    {
                        Id = va.Id,
                        MenuIcon = va.MenuIcon,
                        ParentId = va.ParentId,
                        AccessUrl = va.AccessUrl,
                        Sequence = va.Sequence,
                        Name = va.Name,
                        MenuNo = va.MenuNo,
                        IsBind = IsBind,
                        OperationRight = operationRight
                    });
                }
                v.SubMenuList = subMenuLi;
            }


            return Json(new ResponseEntity<dynamic>(0, "获取菜单成功", MyMenu), JsonRequestBehavior.AllowGet);
        }

    }
}