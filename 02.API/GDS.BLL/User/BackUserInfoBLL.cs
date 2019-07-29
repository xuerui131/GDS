using GDS.Dal;
using GDS.Entity;
using System;
using System.Collections.Generic;
using GDS.Entity.Result;
using GDS.Comon;
using GDS.Entity.Constant;
using System.Linq;

namespace GDS.BLL
{
    public class BackUserInfoBLL
    {
        IBackUerInfoDao<BackUserInfo> dal;
        public BackUserInfoBLL()
        {
            dal = new ImplBackUserInfo() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<BackUserInfo> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<BackUserInfo>(preq);
        }

        public BackUserInfo GetBackUserInfoByLoginName(string name)
        {
            var user =  dal.GetUserinfoByLoginName(name);

            if (user != null)
            {
                var role = GetRoleIdsByUId(user.Id).OrderBy(x => x.Id).FirstOrDefault();

                if (role != null)
                {
                    user.UserType = role.Id;
                    user.UserTypeDesc = role.Name;
                }
                else
                {
                    user.UserType = 0;
                    user.UserTypeDesc = string.Empty;
                }

                //var userType = GetRoleIdsByUId(user.Id).OrderBy(x=>x.Id).FirstOrDefault()?.Id ?? 0;  //取权限最大的

                //user.UserType = userType;
            }

            return user;
        }

        public BackUserInfo GetBackUserInfoByloginToken(string loginToken)
        {
            var user =  dal.GetUserinfoByloginToken(loginToken);

            if (user != null)
            {
                var userType = GetRoleIdsByUId(user.Id).OrderBy(x => x.Id).FirstOrDefault()?.Id ?? 0;

                user.UserType = userType;
            }

            return user;
        }

        public BackUserInfo GetDataById(int Id)
        {
            return dal.GetDataById<BackUserInfo>(Id);
        }
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> AddBackUserInfo(BackUserInfo user)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<BackUserInfo>(user);
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
        /// 修改用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateBackUserInfo(BackUserInfo user)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackUserInfo>(user);

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
        /// 删除用户
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ResultEntity<int> DeleteBackUserInfo(int Id)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.DeleteDataById<BackUserInfo>(Id);

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
                var repResult = dal.FalseDeleteDataByIds<BackUserInfo>(Ids);

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
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        public ResultEntity<int> UpdatePassword(int UId, string psd)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackUserInfo>(new { Password = psd }, it => it.Id == UId);

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

        public ResultEntity<int> UpdateState(int UId, int State)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<BackUserInfo>(new { State = State }, it => it.Id == UId);

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
        /// 修改用户登录信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public ResultEntity<int> UpdateLoginToken(int UId, string LoginToken)
        {
            //ResultEntity<int> result;

            //try
            //{
            //    int IntRet = 0;
            //    var repResult = dal.Update<BackUserInfo>(new { loginToken = LoginToken, loginTokenTime = DateTime.Now }, it => it.Id == UId);

            //    if (repResult)
            //    {
            //        IntRet = 1;
            //    }

            //    if (IntRet > 0)
            //    {

            //        result = new ResultEntity<int>(true, ConstantDefine.TipSaveSuccess, IntRet);
            //    }
            //    else
            //    {
            //        result = new ResultEntity<int>(ConstantDefine.TipSaveFail);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    Loger.LogErr(ex);
            //    result = new ResultEntity<int>(ex.Message);
            //}

            //return result;

            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Users>(new { loginToken = LoginToken, loginTokenTime = DateTime.Now }, it => it.Id == UId);

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

        //根据用户获取角色
        public List<BackRole> GetRoleIdsByUId(int Id)
        {
            List<BackUserRoleBind> RoleLi = new List<BackUserRoleBind>();
            RoleLi = new BackUserRoleBindBLL().GetRoleIdsByUId(Id);

            List<BackRole> li = new List<BackRole>();

            RoleLi.ForEach(x =>
            {
                var entity = new BackRoleBLL().GetDataById(x.RoleId);

                if (entity != null)
                {
                    li.Add(entity);
                }
            });

            return li;
        }

        public bool IsRole(int Id, string role)
        {
            var roles = GetRoleIdsByUId(Id);

            return roles.Exists(x => x.Name == role);
        }
    }
}
