using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity.Constant
{
    public class ConstantDefine
    {
        #region 提示信息

        /// <summary>
        /// 信息查询成功！
        /// </summary>
        public const string TipQuerySuccess = "信息查询成功！";

        /// <summary>
        /// 查询信息不存在！
        /// </summary>
        public const string TipQueryFail = "查询信息不存在！";

        /// <summary>
        /// 信息保存成功！
        /// </summary>
        public const string TipSaveSuccess = "信息保存成功！";

        /// <summary>
        /// 信息保存失败！
        /// </summary>
        public const string TipSaveFail = "信息保存失败！";

        /// <summary>
        /// 信息删除成功！
        /// </summary>
        public const string TipDelSuccess = "信息删除成功！";

        /// <summary>
        /// 信息删除失败！
        /// </summary>
        public const string TipDelFail = "信息删除失败！";

        #endregion

        #region 缓存键值

        /// <summary>
        /// 获取所有应用菜单
        /// </summary>
        public const string CacheGetAllAppMenu = "CacheGetAllAppMenu";

        /// <summary>
        /// 获取所有应用功能
        /// </summary>
        public const string CacheGetAllAppFunction = "CacheGetAllAppFunction_{0}";

        /// <summary>
        /// 获取所有应用菜单(前台)
        /// </summary>
        public const string CacheGetAllForeAppMenu = "CacheGetAllForeAppMenu";

        /// <summary>
        /// 获取所有应用功能(前台)
        /// </summary>
        public const string CacheGetAllForeAppFunction = "CacheGetAllForeAppFunction_{0}";

        #endregion

        #region 角色信息

        /// <summary>
        /// 管理员角色编号
        /// </summary>
        public const string AuthRNoManager = "MANAGER";

        /// <summary>
        /// 普通员工角色编号
        /// </summary>
        public const string AuthRNoUser = "ROLE0001";

        #endregion

        #region 组织机构信息

        /// <summary>
        /// 平台组织机构编号
        /// </summary>
        public const string GroupGNoPlatform = "PLATFORM";

        /// <summary>
        /// 平台组织机构ID
        /// </summary>
        public const int GroupIdPlatform = 1000;

        #endregion

        #region 功能模块
        public const string ModuleTemplate = "项目模板管理";

        public const string ModuleProject = "项目管理";

        public const string ModuleBaseData = "基础数据管理";  //人员、角色、部门及部门负责人的维护。
        #endregion

        #region 操作类型
        public const string TypeAdd = "添加";

        public const string TypeUpdate = "修改";

        public const string TypeDelete = "删除";

        public const string TypeLogin = "用户登录";
        #endregion

        #region 操作动作
        public const string ActionAudit = "审核";

        public const string ActionUpload = "上传";

        public const string ActionDeleteUpload = "删除上传文件";

        public const string ActionUpdateUpload = "更新上传文件";

        public const string ActionUploadAgree = "确认上传";

        public const string ActionStartPhase = "开始项目阶段";

        public const string ActionCompletePhase = "项目阶段完成";

        public const string ActionSaveProject = "添加项目";

        public const string ActionSaveProjectDraft = "保存项目草稿";

        public const string ActionUpdateProject = "修改项目";

        public const string ActionDeleteProject = "删除项目";

        public const string ActionUpdateProjectPhase = "修改项目阶段";

        public const string ActionSaveTemplate = "添加模板";

        public const string ActionUpdateTemplate = "修改模板";

        public const string ActionDeleteTemplate = "删除模板";

        public const string ActionSaveTemplatePhase = "添加模板阶段";

        public const string ActionUpdateTemplatePhase = "修改模板阶段";

        public const string ActionDeleteTemplatePhase = "删除模板阶段";

        public const string ActionSaveTemplateMustContent = "添加模板必要内容";

        public const string ActionUpdateTemplateMustContent = "修改模板必要内容";

        public const string ActionDeleteTemplateMustContent = "删除模板必要内容";

        public const string ActionSaveUsers = "添加用户";

        public const string ActionUpdateUsers = "修改用户";

        public const string ActionDeleteUsers = "删除用户";

        public const string ActionSaveUserDetail = "添加用户详情";

        public const string ActionUpdateUserDetail = "修改用户详情";

        public const string ActionDeleteUserDetail = "删除用户详情";

        public const string ActionSaveRole = "添加角色";

        public const string ActionUpdateRole = "修改角色";

        public const string ActionDeleteRole = "删除角色";

        public const string ActionSaveDepartment = "添加部门";

        public const string ActionUpdateDepartment = "修改部门";

        public const string ActionDeleteDepartment = "删除部门";

        public const string ActionSavePosition = "添加职位";

        public const string ActionUpdatePosition = "修改职位";

        public const string ActionDeletePosition = "删除职位";

        public const string ActionSaveAuditor = "添加部门审核人";

        public const string ActionSaveChargePerson = "添加部门负责人";

        public const string ActionSaveSupplier = "添加供应商";

        public const string ActionUpdateSupplier = "修改供应商";

        public const string ActionDeleteSupplier = "删除供应商";

        public const string ActionSaveProjectType = "添加项目类别";

        public const string ActionUpdateProjectType = "修改项目类别";

        public const string ActionDeleteProjectType = "删除项目类别";

        public const string ActionSaveFormLibrary = "添加表单";

        public const string ActionUpdateFormLibrary = "修改表单";

        public const string ActionDeleteFormLibrary = "删除表单";

        #endregion

        #region 用户类型
        public const int Admin = 1;

        public const int SuperUser = 2;

        public const int ProjectManager = 3;

        public const int User = 4;
        #endregion
    }
}
