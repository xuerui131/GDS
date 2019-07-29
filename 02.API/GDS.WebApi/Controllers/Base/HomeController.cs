using GDS.BLL;
using GDS.Comon;
using GDS.Entity;
using GDS.Entity.Result;
using GDS.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GDS.WebApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        /// <summary>
        /// 获取验证码图片
        /// </summary>
        /// <returns></returns>
        public void GenVerifyCode()
        {
            var verifyCode = new VerifyCode().GenVerifyCode(base.ControllerContext.HttpContext);

        }

        //登录
        [HttpPost]
        public ActionResult Login(UserLogin login)
        {
            if (string.IsNullOrEmpty(login.LoginName))
            {
                var response = new ResponseEntity<dynamic>(false, "登录账号不能为空！", null);
                return Json(response, JsonRequestBehavior.AllowGet);
            }

            BackUserInfo userInfo = new BackUserInfo();
            BackUserInfoBLL UserInfoBLL = new BackUserInfoBLL();
            LoginUserVo CurrentUser = new LoginUserVo();

            userInfo = UserInfoBLL.GetBackUserInfoByLoginName(login.LoginName);
            if (userInfo == null)
            {
                var response = new ResponseEntity<dynamic>(false, "用户不存在！", null);
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (userInfo.State != 0)
                {
                    var response = new ResponseEntity<dynamic>(false, "用户停用！", null);
                    return Json(response, JsonRequestBehavior.AllowGet);
                }

                CurrentUser.Id = userInfo.Id;
                CurrentUser.LoginName = userInfo.LoginName;
                CurrentUser.Name = userInfo.Name;
                  
                CurrentUser.Phone = userInfo.Phone;
                CurrentUser.UserType = userInfo.UserType;
                CurrentUser.UserTypeDesc = userInfo.UserTypeDesc;
                CurrentUser.Department = userInfo.Department;
                var uuidN = Guid.NewGuid().ToString("N"); // e0a953c3ee6040eaa9fae2b667060e09 
                CurrentUser.loginToken = uuidN;
                UserInfoBLL.UpdateLoginToken(userInfo.Id, uuidN);
            }

            //添加登陆日志
            new LogBLL().LogEvent(CurrentUser.LoginName, GDS.Entity.Constant.ConstantDefine.ModuleBaseData, GDS.Entity.Constant.ConstantDefine.TypeLogin, null, null);

            return Json(new ResponseEntity<dynamic>(0, "登陆成功", CurrentUser), JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 菜单信息
        /// </summary>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetBackMenuList()
        {
            List<View_BackMenu> ListMenu = new List<View_BackMenu>();

            var loginToken = Request.QueryString["loginToken"];
            if (string.IsNullOrEmpty(loginToken))
            {
                return Json(new ResponseEntity<dynamic>(-2, "无权限", null), JsonRequestBehavior.AllowGet);
            }
            else
            {
                BackUserInfo userInfo = new BackUserInfoBLL().GetBackUserInfoByloginToken(loginToken.ToString());
                if (userInfo != null && userInfo.loginTokenTime.Value.AddHours(3) >= DateTime.Now)
                {
                    ListMenu = new BackMenuBLL().GetView_BackMenuByUId(userInfo.Id);
                }
                else
                {
                    return Json(new ResponseEntity<dynamic>(-2, "已过期", null), JsonRequestBehavior.AllowGet);
                }
            }

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
        /// 注销
        /// </summary>
        /// <returns></returns>
        public ActionResult Logout()
        {
            return Json(new ResponseEntity<dynamic>(0, "退出成功", null), JsonRequestBehavior.AllowGet);
        }

        // 上传文件
        public ActionResult UploadFile()
        {
            try
            {
                var file = this.Request.Files[0];
                string strFileExtName = file.FileName;
               
                string fileUploadPath = ConfigurationManager.AppSettings["UploadPath"].ToString();
                string fileUplaodUrl = ConfigurationManager.AppSettings["UploadUrl"].ToString();

                string filename = DateTime.Now.ToString("yyyyMMddHHmmssfff") + file.FileName;
                filename = filename.Replace("+", "");
                filename = filename.Replace("%", "");
                filename = filename.Replace(" ", "");

                string fold = $"{DateTime.Today.ToString("yyyyMMdd")}";
                string url = fileUplaodUrl + fold + "/" + filename;

                string fullFolder = this.HttpContext.Server.MapPath("/") + fileUploadPath + "\\" + fold;

                if (!Directory.Exists(fileUploadPath + fold))
                {
                    Directory.CreateDirectory(fullFolder);
                }

                file.SaveAs(fullFolder + "\\" + filename);

                var response = new ResponseEntity<string>(true, "上传成功", url);

                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                Loger.LogErr("UploadFile " + ex.ToString());

                var response = new ResponseEntity<string>(false, "上传失败", null);

                return Json(response, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
