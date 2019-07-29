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
    public class BackUserInfoController : BaseController
    {
        // GET: BackUserInfo
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 用户列表
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackUserInfoList()
        {
            if (CurrenUserInfo == null)
            {
                return Json(new ResponseEntity<dynamic>(-2, "无权限", null), JsonRequestBehavior.AllowGet);
            }
            var queryParams = new NameValueCollection();
            if (!ParamHelper.CheckParaQ(ref queryParams))
            {
                return Json(new ResponseEntity<int>(RegularFunction.RegularSqlRegexText), JsonRequestBehavior.AllowGet);
            }

            var query = new UserInfoQuery(queryParams);

            var sqlCondition = new StringBuilder();
            sqlCondition.Append("ISNULL(IsDelete,0)!=1");
            PageRequest preq = new PageRequest
            {
                TableName = " [BackUserInfo] ",
                Where = sqlCondition.ToString(),
                Order = " Id DESC ",
                IsSelect = true,
                IsReturnRecord = true,
                PageSize = query.PageSize,
                PageIndex = query.PageIndex,
                FieldStr = "*"
            };

            var result = new BackUserInfoBLL().GetDataByPage(preq);

            var response = new ResponseEntity<object>(true, string.Empty,
                new DataGridResultEntity<BackUserInfo>
                {
                    TotalRecords = preq.Out_AllRecordCount,
                    DisplayRecords = preq.Out_PageCount,
                    ResultData = result
                });

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 根据Id获取用户信息
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackUserInfoById(int Id)
        {
            var result = new BackUserInfoBLL().GetDataById(Id);

            if (result != null)
            {
                var response = new ResponseEntity<BackUserInfo>(true, ConstantDefine.TipQuerySuccess, result);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var response = new ResponseEntity<BackUserInfo>(ConstantDefine.TipQueryFail);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 保存用户信息
        /// </summary>
        /// <param name="role"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SaveBackUserInfo(BackUserInfo entity)
        {
            ResponseEntity<int> response;

            if (entity.Id == 0)
            {
                entity.IsDelete = 0;
                entity.CreateBy = "";
                entity.CreateTime = DateTime.Now;
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackUserInfoBLL().AddBackUserInfo(entity);

                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
            }
            else
            {
                BackUserInfo user = new BackUserInfo();
                user = new BackUserInfoBLL().GetDataById(entity.Id);

                user.Name = entity.Name;
                user.Phone = entity.Phone;
              
                entity.UpdateBy = "";
                entity.UpdateTime = DateTime.Now;
                var result = new BackUserInfoBLL().UpdateBackUserInfo(entity);
                response = new ResponseEntity<int>(result.Success, result.Message, result.Data);
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DeleteBackUserInfo(int Id)
        {
            var result = new BackUserInfoBLL().DeleteBackUserInfo(Id);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult BindRole(int Id, string RoleIds)
        {
            var result = new BackUserRoleBindBLL().BindRole(Id, RoleIds);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetRoleIdsByUId(int Id)
        {
            List<BackUserRoleBind> RoleLi = new List<BackUserRoleBind>();
            RoleLi = new BackUserRoleBindBLL().GetRoleIdsByUId(Id).ToList();

            List<BackRole> li = new BackRoleBLL().GetDataAll().OrderBy(T => T.Sequence).ToList();

            List<BindBackRole> Bindli = new List<BindBackRole>();

            foreach (var v in li)
            {
                int IsBind = 0;

                if (RoleLi.Exists(T => T.RoleId == v.Id))
                {
                    IsBind = 1;
                }
                Bindli.Add(new BindBackRole
                {
                    Id = v.Id,
                    IsBind = IsBind,
                    Name = v.Name,
                    Sequence = v.Sequence,
                    RoleNo = v.RoleNo
                });

            }

            return Json(new ResponseEntity<dynamic>(0, "获取权限成功", Bindli), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="psd"></param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdatePassword(int Id, string psd)
        {
            var result = new BackUserInfoBLL().UpdatePassword(Id, psd);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult UpdateState(int Id, int State)
        {
            var result = new BackUserInfoBLL().UpdateState(Id, State);

            var response = new ResponseEntity<int>(result.Success, result.Message, result.Data);

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}