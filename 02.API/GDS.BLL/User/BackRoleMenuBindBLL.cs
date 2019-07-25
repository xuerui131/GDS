using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;

namespace GDS.BLL
{
    public class BackRoleMenuBindBLL
    {
        IBackRoleMenuBindDao<BackRoleMenuBind> dal;
        public BackRoleMenuBindBLL()
        {
            dal = new ImplBackRoleMenuBind() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackRoleMenuBind> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<BackRoleMenuBind>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackRoleMenuBind> GetDataAll()
        {
            return dal.GetDataAll<BackRoleMenuBind>();
        }

        public List<BackRoleMenuBind> GetMenuIdsByRoleId(int RoleId)
        {
            return dal.GetMenuIdsByRoleId(RoleId);
        }
        public BackRoleMenuBind GetDataById(int Id)
        {
            return dal.GetDataById<BackRoleMenuBind>(Id);
        }
        /// <summary>
        /// 添加角色菜单绑定
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> AddBackRoleMenuBind(BackRoleMenuBind entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<BackRoleMenuBind>(entity);
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
        /// 修改角色菜单绑定
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateBackRoleMenuBind(BackRoleMenuBind entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackRoleMenuBind>(entity);

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
        /// 删除角色菜单绑定
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteBackRoleMenuBind(int Id)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.DeleteDataById<BackRoleMenuBind>(Id);

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
        /// 角色绑定菜单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> BindMenu(int Id, string MenuIds)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.BindMenu(Id, MenuIds);

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
    }
}
