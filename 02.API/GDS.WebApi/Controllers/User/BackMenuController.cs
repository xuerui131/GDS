using GDS.BLL;
using GDS.Comon.Utility;
using GDS.Entity;
using GDS.Entity.Constant;
using GDS.Entity.Result;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GDS.WebApi.Controllers
{
    public class BackMenuController : BaseController
    {
        // GET: BackMenu
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// 根据Id获取菜单信息
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackMenuById(int Id)
        {
            var result = new BackMenuBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<BackMenu>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<BackMenu>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 保存菜单
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveBackMenu(BackMenu entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackMenuBLL().AddBackMenu(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
            }
            else
            {
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackMenuBLL().UpdateBackMenu(entity);
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteBackMenu(int Id)
        {
            var result = new BackMenuBLL().DeleteBackMenu(Id);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 菜单信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackMenuList2()
        {
            List<BackMenu> ListMenu = new List<BackMenu>();
            ListMenu = new BackMenuBLL().GetDataAll();

            List<DispalyBackMenu> MyMenu = new List<DispalyBackMenu>();
            foreach (var v in ListMenu.Where(T => T.ParentId == 0))
            {
                MyMenu.Add(new DispalyBackMenu
                {
                    Id = v.Id,
                    MenuIcon = v.MenuIcon,
                    ParentId = 0,
                    AccessUrl = v.AccessUrl,
                    Sequence = v.Sequence,
                    Name = v.Name,
                    MenuNo = v.MenuNo,

                });
            }
            MyMenu = MyMenu.OrderBy(T => T.Sequence).ToList();
            foreach (var v in MyMenu)
            {
                v.SubMenuList = ListMenu.Where(T => T.ParentId == v.Id).OrderBy(T => T.Sequence).ToList();
            }

            return Json(new ResponseEntity<dynamic>(0, "获取菜单成功", MyMenu), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 菜单信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackMenuList()
        {
            List<View_BackMenu> ListMenu = new List<View_BackMenu>();

            ListMenu = new BackMenuBLL().GetView_BackMenuByUId(CurrenUserInfo.Id);

            //User可能有多个Role，会有重复的Menu，因此按MenuId取Distinct
            ListMenu = ListMenu.Distinct(new MenuComparer()).ToList();

            List<View_DispalyBackMenu> MyMenu = new List<View_DispalyBackMenu>();
            HashSet<int> hs = new HashSet<int>();

            foreach (var v in ListMenu.Where(T => T.ParentId == 0))
            {
                if (!hs.Contains(v.Id))
                {
                    MyMenu.Add(new View_DispalyBackMenu
                    {
                        Id = v.Id,
                        MenuIcon = v.MenuIcon,
                        ParentId = 0,
                        AccessUrl = v.AccessUrl,
                        Sequence = v.Sequence,
                        Name = v.Name,
                        MenuNo = v.MenuNo,
                        OperationRight = v.OperationRight
                    });

                    hs.Add(v.Id);
                }
            }
            MyMenu = MyMenu.OrderBy(T => T.Sequence).ToList();
            foreach (var v in MyMenu)
            {
                v.SubMenuList = ListMenu.Where(T => T.ParentId == v.Id).OrderBy(T => T.Sequence).ToList();
            }

            return Json(new ResponseEntity<dynamic>(0, "获取菜单成功", MyMenu), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 菜单信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackMenuListByParentId(int ParentId)
        {
            List<BackMenu> ListMenu = new List<BackMenu>();
            ListMenu = new BackMenuBLL().GetBackMenuListByParentId(ParentId).OrderBy(T => T.Sequence).ToList();

            return Json(new ResponseEntity<dynamic>(0, "获取菜单成功", ListMenu), JsonRequestBehavior.AllowGet);
        }
    }
}