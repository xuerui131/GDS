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
    public class UsersBLL
    {

        IUsersDao<Users> dal;
        public UsersBLL()
        {
            dal = new ImplUsers() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<Users> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<Users>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<Users> GetDataAll()
        {
            return dal.GetDataAll<Users>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Users GetDataById(int id)
        {
            return dal.GetDataById<Users>(id);
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
                var repResult = dal.DeleteDataById<Users>(id);

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
                var repResult = dal.FalseDeleteDataByIds<Users>(Ids);

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
        public ResultEntity<int> InsertUsers(Users uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<Users>(uie);
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
        public ResultEntity<int> UpdateUsers(Users uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Users>(uie);

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

        public List<Users> GetUsersByDepartId(int departId)
        {
            return dal.GetUsersByDepartId(departId);
        }

        public List<Users> GetDataByUserName(string userName)
        {
            return dal.GetDataByUserName(userName);
        }

        public ResultEntity<int> UpdateDisable(int UId, bool Disable)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Users>(new { Disable = Disable }, it => it.Id == UId);

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
