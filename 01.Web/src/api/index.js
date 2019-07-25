import axios from './myAxios';
// **** 部门 **** //
// 部门列表（分页）
export const GetDepartmentList = (Pageindex, pagesize) => axios('/Department/GetDepartmentList', { Pageindex, pagesize }, 'GET');
// 单个部门查询
export const GetDepartmentById = (id) => axios('/Department/GetDepartmentById', { id }, 'GET');
// 添加或者修改部门
export const SaveDepartment = (obj = {}) => axios('/Department/SaveDepartment', obj, 'POST');
// 删除部门
export const DeleteDepartment = (id) => axios('/Department/DeleteDepartment', { id }, 'GET');
// 设置部门审核人
export const SetAuditor = (id, Auditor) => axios('/Department/SetAuditor', { id, Auditor }, 'GET');
// 设置部门负责人
export const SetChargePerson = (id, ChargePerson) => axios('/Department/SetChargePerson', { id, ChargePerson }, 'GET');

// **** 用户 **** //
// 用户列表（分页）
export const GetUsersList = (Pageindex, pagesize) => axios('/Users/GetUsersList', { Pageindex, pagesize }, 'GET');
// 单个用户查询
export const GetUsersById = (id) => axios('/Users/GetUsersById', { id }, 'GET');
// 添加或者修改
export const SaveUsers = (obj = {}) => axios('/Users/SaveUsers', obj, 'POST');
// 删除
export const DeleteUsers = (id) => axios('/Users/DeleteUsers', { id }, 'GET');
// 根据部门Id获取用户列表
export const GetUsersByDepartId = (departId) => axios('/Users/GetUsersByDepartId', { departId }, 'GET');
// 获取所有用户列表
export const GetAllUsers = (Name) => axios('/Users/GetAllUsers', { Name }, 'GET');

// **** 用户详细信息 **** //
// 用户详细信息列表（分页）
export const GetUserDetailList = (Pageindex, pagesize) => axios('/UserDetail/GetUserDetailList', { Pageindex, pagesize }, 'GET');
// 单个用户详细信息查询
export const GetUserDetailById = (id) => axios('/UserDetail/GetUserDetailById', { id }, 'GET');
// 添加或者修改
export const SaveUserDetail = (obj = {}) => axios('/UserDetail/SaveUserDetail', obj, 'POST');
// 删除
export const DeleteUserDetail = (id) => axios('/UserDetail/DeleteUserDetail', { id }, 'GET');

// **** 用户信息 **** //
// 根据用户Id获取角色
export const GetRoleIdsByUId = (id) => axios('/BackUserInfo/GetRoleIdsByUId', { id }, 'GET');
// 用户配置角色
export const BindRole = (id, RoleIds = '') => axios('/BackUserInfo/BindRole', { id, RoleIds }, 'GET');
// 重置密码
export const UpdatePassword = (id, psd = '') => axios('/BackUserInfo/UpdatePassword', { id, psd }, 'GET');
/* -- 菜单管理接口 -- */
/**
 * 获取菜单列表
 */
export const backMenu_getBackMenuList = () => axios('/BackMenu/GetBackMenuList', {}, 'GET');
/**
 * 获取某一级列表，根级parentId=0
 * @param parentId
 */
export const backMenu_getBackMenuListByParentId = (ParentId = 0) => axios('/BackMenu/GetBackMenuListByParentId', {ParentId}, 'GET');
/**
 * 单个菜单查询
 * @param id
 */
export const backMenu_getBackMenuById = (id) => axios('/BackMenu/GetBackMenuById', {id}, 'GET');
/**
 * 添加或者修改菜单信息, Id为0 - 添加，Id为其他 - 编辑
 */
export const backMenu_saveBackMenu = (obj = {}) => axios('/BackMenu/SaveBackMenu', obj, 'POST');
/**
 * 删除
 * @param id
 */
export const backMenu_deleteBackMenu = (id) => axios('/BackMenu/DeleteBackMenu', {id}, 'GET');

/* --- 角色管理接口 --- */
/**
 * 获取角色列表
 * @param pageindex
 * @param pagesize
 */
export const backRole_getBackRoleList = (pageindex = 1, pagesize = 20) => axios('/BackRole/GetBackRoleList', {pageindex, pagesize}, 'GET');
/**
 * 单个角色查询
 * @param Id
 */
export const backRole_getBackRoleById = (Id) => axios('/BackRole/GetBackRoleById', {Id}, 'GET');
/**
 * 添加或者修改菜单信息, Id为0 - 添加，Id为其他 - 编辑
 * @param obj
 */
export const backRole_saveBackRole = (obj = {}) => axios('/BackRole/SaveBackRole', obj, 'POST');
/**
 * 删除角色
 * @param Id
 */
export const backRole_deleteBackRole = (Id) => axios('/BackRole/DeleteBackRole', {Id}, 'GET');
/**
 * 根据角色Id获取菜单列表
 * @param Id
 */
export const backRole_getMenuIdsByRoleId = (Id) => axios('/BackRole/GetMenuIdsByRoleId', {Id}, 'GET');
/**
 * 为角色配置菜单
 * @param Id
 * @param MenuIds
 */
export const backRole_bindMenu = (Id,MenuIds = '') => axios('/BackRole/BindMenu', {Id,MenuIds}, 'GET');

/* --- 日志管理 --- */
export const GetLogList = (pageindex = 1, pagesize = 20) => axios('/Log/GetLogList', {pageindex, pagesize}, 'GET');

/* --- 外部人员维护 --- */
// 外部人员维护列表（分页）
export const GetOutMemberInfoList = (pageindex = 1, pagesize = 10) => axios('/OutMemberInfo/GetOutMemberInfoList', {pageindex, pagesize}, 'GET');
// 外部人员维护列表（名字）
export const GetOutMemberInfoListByName = (Name = '') => axios('/OutMemberInfo/GetOutMemberInfoList', {Name}, 'GET');
// 单个外部人员维护查询
export const GetOutMemberInfoById = (id) => axios('/OutMemberInfo/GetOutMemberInfoById', {id}, 'GET');
// 添加或者修改
export const SaveOutMemberInfo = (obj = {}) => axios('/OutMemberInfo/SaveOutMemberInfo', obj, 'POST');
// 删除
export const DeleteOutMemberInfo = (id) => axios('/OutMemberInfo/DeleteOutMemberInfo', {id}, 'GET');
