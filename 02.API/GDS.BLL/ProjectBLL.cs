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
    public class ProjectBLL
    {

        IProjectDao<Project> dal;
        public ProjectBLL()
        {
            dal = new ImplProject() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<Project> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<Project>(preq);
        }

        public List<View_Project> GetView_ProjectByPage(PageRequest preq)
        {
            return dal.GetDataByPage<View_Project>(preq);
        }

        public List<View_Auditor> GetView_AuditorByPage(PageRequest preq)
        {
            return dal.GetDataByPage<View_Auditor>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<Project> GetDataAll()
        {
            return dal.GetDataAll<Project>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Project GetDataById(int id)
        {
            return dal.GetDataById<Project>(id);
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
                var repResult = dal.DeleteDataById<Project>(id);

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
                var repResult = dal.FalseDeleteDataByIds<Project>(Ids);

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
        public ResultEntity<int> InsertProject(Project uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<Project>(uie);
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
        public ResultEntity<int> UpdateProject(Project uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Project>(uie);

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

        public ResultEntity<int> UpdateStatus(int Id, int Status)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Project>(new { Status= Status }, it => it.Id == Id);

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

        public ResultEntity<int> UpdatePhase(int Id, string currentPhase)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Project>(new { CurrentPhase = currentPhase }, it => it.Id == Id);

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

        public ResultEntity<int> UpdateApprovalStatus(int Id, int Status)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Project>(new { CurrentStatus = Status }, it => it.Id == Id);

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

        public ResultEntity<int> UpdatePhaseStatus(int Id, int CurrentStatus, string CurrentPhase)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;

                var repResult = false;

                if (CurrentPhase == null)
                {
                    repResult = dal.Update<Project>(new { CurrentStatus = CurrentStatus }, it => it.Id == Id);
                }
                else
                {
                    repResult = dal.Update<Project>(new { CurrentStatus = CurrentStatus, CurrentPhase = CurrentPhase }, it => it.Id == Id);
                }

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

        public View_ProjectPreview GetProjectPreviewByProjectId(int ProjectId)
        {
            var preview = dal.GetProjectPreviewByProjectId(ProjectId);

            if (preview != null)
            {
                //获取模板阶段
                var templateId = preview.TemplateId;

                preview.TemplatePhases = new TemplatePhaseBLL().GetTemplatePhaseListByTemplateId(templateId);

                //获取附件
                preview.ProjectAttachments = new ProjectAttachmentBLL().GetProjectAttachments(ProjectId, 1).Where(x => x.Type == 1).ToList();
            }

            return preview;
        }

        public View_ProjectPreview GetProjectBaseInfoByProjectId(int ProjectId)
        {
            var preview = dal.GetProjectPreviewByProjectId(ProjectId);

            if (preview != null)
            {
                //获取附件
                preview.ProjectAttachments = new ProjectAttachmentBLL().GetProjectAttachments(ProjectId, 1).Where(x => x.Type == 1).ToList();
            }

            return preview;
        }

        public View_ProjectDetail GetProjectDetailByProjectId(int ProjectId)
        {
            var preview = dal.GetProjectPreviewByProjectId(ProjectId);

            var detail = AutoMapper.Mapper.Map<View_ProjectDetail>(preview);

            if (detail != null)
            {
                //获取项目阶段
                detail.ProjectPhases = new ProjectPhaseBLL().GetProjectPhaseListByProjectId(ProjectId);

                //获取附件
                detail.ProjectAttachments = new ProjectAttachmentBLL().GetProjectAttachments(ProjectId, 1).Where(x => x.Type == 1).ToList();
            }

            return detail;
        }

        public View_Index GetIndex(string user)
        {
            var index = dal.GetIndex(user);

            if (index == null)
            {
                return new View_Index();
            }

            return index;
        }

        public List<Project> GetDataByName(string Name)
        {
            return dal.GetDataByName(Name);
        }

        public int GetTodayCreateProject()
        {
            return dal.GetTodayCreateProject();
        }

        /// <summary>
        /// 验证审核权限
        /// </summary>
        /// <returns></returns>
        public bool VerifyAduitRight(string loginName, int userType, int id)
        {
            if (userType == GDS.Entity.Constant.ConstantDefine.Admin)  //管理员有权限
            {
                return true;
            }

            var departmentList = new DepartmentBLL().GetDepartmentByAuditor(loginName); //部门审核人有权限 多个部门可能时同一个审核人

            if (departmentList != null && departmentList.Count > 0)
            {
                var viewProject = dal.GetView_ProjectByProjectId(id);

                if (departmentList.Exists(x => x.Id == viewProject.DepartId))
                {
                    return true;
                }
            }

            return false;
        }
    }
}
