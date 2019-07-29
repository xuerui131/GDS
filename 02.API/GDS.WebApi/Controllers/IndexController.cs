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
    public class IndexController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

/*
系统权限应分为管理员，超级用户及一般用户。
管理员：系统最大权限，能对系统所有内容进行操作。
超级用户：不能对用户权限进行设置，但能查看所有项目（非自己参与的也能查看），能创建项目模板创建项目和维护管理基础信息。
项目经理：可创建项目和管理项目，审核项目内容
普通用户：项目参与者，可对参与的项目进行查阅，上传文档和填写表单
*/

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetIndex()
        {
            if (CurrenUserInfo == null)
            {
                return Json(new ResponseEntity<dynamic>(-2, "无权限", null), JsonRequestBehavior.AllowGet);
            }

            var result = new ProjectBLL().GetIndex(CurrenUserInfo.LoginName);

            var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
            return Json(response, JsonRequestBehavior.AllowGet);
          
        }
    }
}