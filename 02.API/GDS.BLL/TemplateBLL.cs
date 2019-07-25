using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;

namespace GDS.BLL
{
    public class TemplateBLL
    {

        ITemplateDao<Template> dal;
        public TemplateBLL()
        {
            dal = new ImplTemplate() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<Template> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<Template>(preq);
        }

        public List<View_Template> GetView_TemplateByPage(PageRequest preq)
        {
            return dal.GetDataByPage<View_Template>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<Template> GetDataAll()
        {
            return dal.GetDataAll<Template>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Template GetDataById(int id)
        {
            return dal.GetDataById<Template>(id);
        }

        /// <summary>
        /// 根据Id删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteDataById(int id)
        {

            ResultEntity<int> result;

            try
            {
                var repResult = dal.DeleteDataById<Template>(id);

                if (repResult)
                {

                    result = new ResultEntity<int>(true, ConstantDefine.TipDelSuccess, 1);
                }
                else
                {
                    result = new ResultEntity<int>(ConstantDefine.TipDelFail);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                result = new ResultEntity<int>(ex.Message);
            }
            return result;
        }

        /// <summary>
        /// 假删除数据
        /// </summary>
        /// <param name="Ids"></param>
        /// <returns></returns>
        public ResultEntity<int> FalseDeleteDataByIds(int[] Ids)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.FalseDeleteDataByIds<Template>(Ids);

                if (repResult)
                {
                    IntRet = 1;
                }
                if (IntRet > 0)
                {
                    result = new ResultEntity<int>(true, ConstantDefine.TipDelSuccess, IntRet);
                }
                else
                {
                    result = new ResultEntity<int>(ConstantDefine.TipDelFail);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                result = new ResultEntity<int>(ex.Message);
            }

            return result;
        }


        // 添加
        public ResultEntity<int> InsertTemplate(Template uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<Template>(uie);
                if (repResult != null)
                {
                    IntRet = int.Parse(repResult.ToString());
                }
                if (IntRet > 0)
                {

                    result = new ResultEntity<int>(true, ConstantDefine.TipSaveSuccess, IntRet);
                }
                else
                {
                    result = new ResultEntity<int>(ConstantDefine.TipSaveFail);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                result = new ResultEntity<int>(ex.Message);
            }
            return result;

        }

        // 修改
        public ResultEntity<int> UpdateTemplate(Template uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Template>(uie);

                if (repResult)
                {
                    IntRet = 1;
                }

                if (IntRet > 0)
                {

                    result = new ResultEntity<int>(true, ConstantDefine.TipSaveSuccess, IntRet);
                }
                else
                {
                    result = new ResultEntity<int>(ConstantDefine.TipSaveFail);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                result = new ResultEntity<int>(ex.Message);
            }
            return result;
        }

        public ResultEntity<int> UpdateStatus(int Id, int Status)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Template>(new { Status = Status }, it => it.Id == Id);

                if (repResult)
                {
                    IntRet = 1;
                }

                if (IntRet > 0)
                {

                    result = new ResultEntity<int>(true, ConstantDefine.TipSaveSuccess, IntRet);
                }
                else
                {
                    result = new ResultEntity<int>(ConstantDefine.TipSaveFail);
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                result = new ResultEntity<int>(ex.Message);
            }

            return result;
        }

        public List<Template> GetDataByName(string Name)
        {
            return dal.GetDataByName(Name);
        }

        /// <summary>
        /// 验证审核权限
        /// </summary>
        /// <returns></returns>
        public bool VerifyAduitRight(string loginName, int userType, int id)
        {
            if (userType == GDS.Entity.Constant.ConstantDefine.Admin)  //管理员有权限
            {
                return true;
            }

            var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName); //部门审核人有权限 多个部门可能时同一个审核人

            if (departmentList != null && departmentList.Count > 0)
            {
                var viewTemplate = dal.GetView_TemplateByTemplateId(id);

                if (departmentList.Exists(x=>x.Id == viewTemplate.DepartId))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
