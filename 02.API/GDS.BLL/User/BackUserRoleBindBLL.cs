using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;

namespace GDS.BLL
{
    public class BackUserRoleBindBLL
    {
        IBackUserRoleBindDao<BackUserRoleBind> dal;
        public BackUserRoleBindBLL()
        {
            dal = new ImplBackUserRoleBind() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackUserRoleBind> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<BackUserRoleBind>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackUserRoleBind> GetDataAll()
        {
            return dal.GetDataAll<BackUserRoleBind>();
        }

        public List<BackUserRoleBind> GetRoleIdsByUId(int UId)
        {
            return dal.GetRoleIdsByUId(UId);
        }

        public BackUserRoleBind GetDataById(int Id)
        {
            return dal.GetDataById<BackUserRoleBind>(Id);
        }
        /// <summary>
        /// 添加用户角色关联
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> AddBackUserRoleBind(BackUserRoleBind entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<BackUserRoleBind>(entity);
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

        /// <summary>
        /// 修改用户角色关联
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateBackUserRoleBind(BackUserRoleBind entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackUserRoleBind>(entity);
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

        /// <summary>
        /// 删除用户角色关联
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteBackUserRoleBind(int Id)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.DeleteDataById<BackUserRoleBind>(Id);

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

        /// <summary>
        /// 用户绑定角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> BindRole(int Id, string RoleIds)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.BindRole(Id, RoleIds);

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
    }
}
