using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;

namespace GDS.BLL
{
    public class BackMenuBLL
    {
        IBackMenuDao<BackMenu> dal;
        public BackMenuBLL()
        {
            dal = new ImplBackMenu() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackMenu> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<BackMenu>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<BackMenu> GetDataAll()
        {
            return dal.GetDataAll<BackMenu>();
        }

        public BackMenu GetDataById(int Id)
        {
            return dal.GetDataById<BackMenu>(Id);
        }
        /// <summary>
        /// 添加菜单
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> AddBackMenu(BackMenu entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<BackMenu>(entity);
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
        /// 修改菜单
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateBackMenu(BackMenu entity)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update(entity);

                if (repResult)
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
        /// 删除菜单
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteBackMenu(int Id)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.DeleteDataById<BackMenu>(Id);

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

        public List<BackMenu> GetBackMenuListByParentId(int ParentId)
        {
            return dal.GetBackMenuListByParentId(ParentId);
        }

        /// <summary>
        /// 根据当前登录人 获取菜单列表
        /// </summary>
        /// <param name="UId"></param>
        /// <returns></returns>
        public List<BackMenu> GetBackMenuByUId(int UId)
        {
            return dal.GetBackMenuByUId(UId);
        }

        public List<View_BackMenu> GetView_BackMenuByUId(int UId)
        {
            return dal.GetView_BackMenuByUId(UId);
        }
    }
}
