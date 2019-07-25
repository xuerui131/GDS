using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GDS.Entity;
using SqlSugar;

namespace GDS.Dal
{
    public class ImplBackUserInfo : ImplDaoBase<BackUserInfo>, IBackUerInfoDao<BackUserInfo>
    {
        public BackUserInfo GetUserinfoByLoginName(string name)
        {
            //try
            //{
            //    using (var db = SugarDao.GetInstance())
            //    {
            //        db.IsNoLock = true;
            //        var student = db.Queryable<BackUserInfo>().Where(T => T.LoginName == name).First();
            //        return student;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    return null;
            //}

            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var student = db.SqlQuery<BackUserInfo>(@"
 select a.ID, a.UserName as loginname, a.Name, a.Phone, case when a.Disable =1 then 1 else 0 end state, a.logintoken, a.loginTokenTime,
  b.departid as department
 from Users a left join UserDetail b on a.ID = b.UserID where a.username = @userName", new { userName = name });
                    return student.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public BackUserInfo GetUserinfoByloginToken(string loginToken)
        {
            //try
            //{
            //    using (var db = SugarDao.GetInstance())
            //    {
            //        db.IsNoLock = true;
            //        var student = db.Queryable<BackUserInfo>().Where(T => T.loginToken == loginToken).First();
            //        return student;
            //    }
            //}
            //catch (Exception ex)
            //{
            //    return null;
            //}

            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var student = db.SqlQuery<BackUserInfo>(@"
 select a.ID, a.UserName as loginname, a.Name, a.Phone, case when a.Disable =1 then 1 else 0 end state, a.logintoken, a.loginTokenTime,
  b.departid as department
 from Users a left join UserDetail b on a.ID = b.UserID where a.logintoken = @loginToken", new { loginToken });
                    return student.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

    public class ImplBackMenu : ImplDaoBase<BackMenu>, IBackMenuDao<BackMenu>
    {
        public List<BackMenu> GetBackMenuByUId(int UId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    //var Li = db.SqlQuery<BackMenu>(@"select distinct  M.* from BackMenu as M
                    //                                inner join BackRoleMenuBind as B on M.Id=B.MenuId
                    //                                inner join BackRole  as R on B.[RoleId]=R.Id
                    //                                inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                    //                                inner join [dbo].[UserInfo] as U on U.Id=UR.[UId]
                    //                                where U.id =@id
                    //                                union 
                    //                                select distinct * from BackMenu where
                    //                                 Id in (select M.ParentId from BackMenu as M
                    //                                inner join BackRoleMenuBind as B on M.Id=B.MenuId
                    //                                inner join BackRole  as R on B.[RoleId]=R.Id
                    //                                inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                    //                                inner join [dbo].[UserInfo] as U on U.Id=UR.[UId]
                    //                                where U.id =@id)", new { id = UId });

                    var Li = db.SqlQuery<BackMenu>(@"select distinct  M.* from BackMenu as M
                                                    inner join BackRoleMenuBind as B on M.Id=B.MenuId
                                                    inner join BackRole  as R on B.[RoleId]=R.Id
                                                    inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                                                    where UR.[UId] =@id
                                                    union 
                                                    select distinct * from BackMenu where
                                                     Id in (select M.ParentId from BackMenu as M
                                                    inner join BackRoleMenuBind as B on M.Id=B.MenuId
                                                    inner join BackRole  as R on B.[RoleId]=R.Id
                                                    inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                                                    where UR.[UId] =@id)", new { id = UId });
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<View_BackMenu> GetView_BackMenuByUId(int UId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                 
                    var Li = db.SqlQuery<View_BackMenu>(@"select distinct  M.*, B.OperationRight from BackMenu as M
                                                    inner join BackRoleMenuBind as B on M.Id=B.MenuId
                                                    inner join BackRole  as R on B.[RoleId]=R.Id
                                                    inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                                                    where UR.[UId] =@id
                                                    union 
                                                    select distinct *, 0 from BackMenu as M where
                                                     Id in (select M.ParentId from BackMenu as M
                                                    inner join BackRoleMenuBind as B on M.Id=B.MenuId
                                                    inner join BackRole  as R on B.[RoleId]=R.Id
                                                    inner join [dbo].[BackUserRoleBind] as UR on R.Id=UR.RoleId
                                                    where UR.[UId] =@id)", new { id = UId });
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<BackMenu> GetBackMenuListByParentId(int ParentId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var Li = db.Queryable<BackMenu>().Where(T => T.ParentId == ParentId).ToList();
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool UpdateALL(BackMenu entity)
        {
            using (var db = SugarDao.GetInstance())
            {
                db.DisableUpdateColumns = new string[] { "SubMenuList" };//设置SubMenuList不更新
                return db.Update(entity);
            }
        }

    }

    public class ImplBackRole : ImplDaoBase<BackRole>, IBackRoleDao<BackRole>
    {
        public List<BackUserInfo> GetUserListByRole(int RoleId)
        {

            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var Li = db.SqlQuery<BackUserInfo>(@"
  select distinct  b.Id, b.loginname, b.nickname, b.name, b.phone, b.state, b.usertype from BackUserRoleBind a inner join backuserinfo b on a.uid = b.id
  where b.state = 0  and a.roleid = @RoleId

", new { RoleId });
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public List<BackRole> GetBackRoleByName(string Name)
        {

            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var Li = db.Queryable<BackRole>().Where(x => x.Name == Name).ToList();

                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }

        }


    }
    public class ImplBackUserRoleBind : ImplDaoBase<BackUserRoleBind>, IBackUserRoleBindDao<BackUserRoleBind>
    {
        public bool BindRole(int Id, string RoleIds)
        {
            try
            {
                string[] arrIds = RoleIds.Split(',');
                List<BackUserRoleBind> li = new List<BackUserRoleBind>();

                for (int i = 0; i < arrIds.Count(); i++)
                {
                    li.Add(new BackUserRoleBind { UId = Id, RoleId = int.Parse(arrIds[i]) });
                }

                using (var db = SugarDao.GetInstance())
                {
                    db.Delete<BackUserRoleBind>("UId=@UId", new { UId = Id });
                    db.InsertRange<BackUserRoleBind>(li);
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<BackUserRoleBind> GetRoleIdsByUId(int UId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var Li = db.Queryable<BackUserRoleBind>().Where(T => T.UId == UId).ToList();
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
    public class ImplBackRoleMenuBind : ImplDaoBase<BackRoleMenuBind>, IBackRoleMenuBindDao<BackRoleMenuBind>
    {
        public bool BindMenu(int Id, string MenuIds)
        {
            try
            {
                if (string.IsNullOrEmpty(MenuIds))
                {
                    using (var db = SugarDao.GetInstance())
                    {
                        db.Delete<BackRoleMenuBind>("RoleId=@RoleId", new { RoleId = Id });
                        return true;
                    }
                }
                string[] arrIds = MenuIds.Split(',');
                List<BackRoleMenuBind> li = new List<BackRoleMenuBind>();

                for (int i = 0; i < arrIds.Count(); i++)
                {
                    var arr = arrIds[i].Split('|');
                    int menuId = int.Parse(arrIds[i].Split('|')[0]);
                    
                    int operationRight =  arr.Count() == 2 ? int.Parse(arrIds[i].Split('|')[1]) : 0;
                    li.Add(new BackRoleMenuBind { RoleId = Id, MenuId = menuId, OperationRight = operationRight });
                }

                using (var db = SugarDao.GetInstance())
                {
                    db.Delete<BackRoleMenuBind>("RoleId=@RoleId", new { RoleId = Id });
                    db.InsertRange<BackRoleMenuBind>(li);
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<BackRoleMenuBind> GetMenuIdsByRoleId(int RoleId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;
                    var Li = db.Queryable<BackRoleMenuBind>().Where(T => T.RoleId == RoleId).ToList();
                    return Li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }

}
