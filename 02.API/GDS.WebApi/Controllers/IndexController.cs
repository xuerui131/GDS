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
ϵͳȨ��Ӧ��Ϊ����Ա�������û���һ���û���
����Ա��ϵͳ���Ȩ�ޣ��ܶ�ϵͳ�������ݽ��в�����
�����û������ܶ��û�Ȩ�޽������ã����ܲ鿴������Ŀ�����Լ������Ҳ�ܲ鿴�����ܴ�����Ŀģ�崴����Ŀ��ά�����������Ϣ��
��Ŀ�����ɴ�����Ŀ�͹�����Ŀ�������Ŀ����
��ͨ�û�����Ŀ�����ߣ��ɶԲ������Ŀ���в��ģ��ϴ��ĵ�����д��
*/

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult GetIndex()
        {
            if (CurrenUserInfo == null)
            {
                return Json(new ResponseEntity<dynamic>(-2, "��Ȩ��", null), JsonRequestBehavior.AllowGet);
            }

            var result = new ProjectBLL().GetIndex(CurrenUserInfo.LoginName);

            var response = new ResponseEntity<object>(true, ConstantDefine.TipQuerySuccess, result);
            return Json(response, JsonRequestBehavior.AllowGet);
          
        }
    }
}