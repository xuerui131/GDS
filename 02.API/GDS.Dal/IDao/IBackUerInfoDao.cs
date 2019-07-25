using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace GDS.Dal
{
    public interface IBackUerInfoDao<T> : IDaoBase<T> where T : class
    {
        BackUserInfo GetUserinfoByLoginName(string name);
        BackUserInfo GetUserinfoByloginToken(string loginToken);
    }
    public interface IBackMenuDao<T> : IDaoBase<T> where T : class
    {
        List<BackMenu> GetBackMenuListByParentId(int ParentId);

        bool UpdateALL(BackMenu entity);

        List<BackMenu> GetBackMenuByUId(int UId);

        List<View_BackMenu> GetView_BackMenuByUId(int UId);
    }

    public interface IBackRoleDao<T> : IDaoBase<T> where T : class
    {
        List<BackUserInfo> GetUserListByRole(int RoleId);

        List<BackRole> GetBackRoleByName(string Name);
    }
    public interface IBackUserRoleBindDao<T> : IDaoBase<T> where T : class
    {
        bool BindRole(int Id, string RoleIds);
        List<BackUserRoleBind> GetRoleIdsByUId(int UId);
    }
    public interface IBackRoleMenuBindDao<T> : IDaoBase<T> where T : class
    {
        bool BindMenu(int Id, string MenuIds);
        List<BackRoleMenuBind> GetMenuIdsByRoleId(int RoleId);
    }
}
