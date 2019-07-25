using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;

namespace GDS.BLL
{
    public class BackRoleBLL
    {
        IBackRoleDao<BackRole> dal;
        public BackRoleBLL()
        {
            dal = new ImplBackRole() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackRole> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<BackRole>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<BackRole> GetDataAll()
        {
            return dal.GetDataAll<BackRole>();
        }

        public BackRole GetDataById(int Id)
        {
            return dal.GetDataById<BackRole>(Id);
        }
        /// <summary>
        /// 添加角色
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> AddBackRole(BackRole entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<BackRole>(entity);
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
        /// 修改角色
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateBackRole(BackRole entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackRole>(entity);
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
        /// 删除角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteBackRole(int Id)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.DeleteDataById<BackRole>(Id);

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

        //public List<BackUserInfo> GetUserListByRole(int RoleId)
        //{
        //    return dal.GetUserListByRole(RoleId);
        //}
    }
}
