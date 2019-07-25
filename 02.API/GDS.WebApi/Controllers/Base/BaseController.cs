using GDS.BLL;
using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GDS.Entity.Result;

namespace GDS.WebApi.Controllers
{
    // GET: Base
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            CurrenUserInfo = new BackUserInfo();
            //    CurrenUserInfo.LoginName = "张大千";
            //CurrenUserInfo.UserType = 1;

            var loginToken = Request.Headers["Authorization"]; //Request.QueryString["loginToken"];
            if (string.IsNullOrEmpty(loginToken))
            {
                CurrenUserInfo = null;

                filterContext.Result = Json(new ResponseEntity<object>(-2, "", null), JsonRequestBehavior.AllowGet);  //重新登陆
            }
            else
            {
                var userInfo = new BackUserInfoBLL().GetBackUserInfoByloginToken(loginToken.ToString());

                if (userInfo != null && userInfo.loginTokenTime.Value.AddHours(10) >= DateTime.Now)
                {
                    CurrenUserInfo = userInfo;
                }
                else
                {
                    CurrenUserInfo = null;

                    filterContext.Result = Json(new ResponseEntity<object>(-2, "", null), JsonRequestBehavior.AllowGet);  //重新登陆
                }
            }

            base.OnActionExecuting(filterContext);
        }

        protected BackUserInfo CurrenUserInfo
        {
            get;
            set;
        }

    }

}