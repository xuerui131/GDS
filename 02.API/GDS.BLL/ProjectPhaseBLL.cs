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
    public class ProjectPhaseBLL
    {

        IProjectPhaseDao<ProjectPhase> dal;
        public ProjectPhaseBLL()
        {
            dal = new ImplProjectPhase() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<ProjectPhase> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<ProjectPhase>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<ProjectPhase> GetDataAll()
        {
            return dal.GetDataAll<ProjectPhase>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProjectPhase GetDataById(int id)
        {
            return dal.GetDataById<ProjectPhase>(id);
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
                var repResult = dal.DeleteDataById<ProjectPhase>(id);

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
                var repResult = dal.FalseDeleteDataByIds<ProjectPhase>(Ids);

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
        public ResultEntity<int> InsertProjectPhase(ProjectPhase uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<ProjectPhase>(uie);
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
        public ResultEntity<int> UpdateProjectPhase(ProjectPhase uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(uie);

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
                bool repResult = false;

                if (Status == 1) //启动
                {
                    repResult = dal.Update<ProjectPhase>(new { Status = Status, StartTime = DateTime.Now }, it => it.Id == Id);
                }
                else if (Status == 2)//完成
                {
                    repResult = dal.Update<ProjectPhase>(new { Status = Status, EndTime = DateTime.Now }, it => it.Id == Id);
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

        public ResultEntity<int> UpdateDocList(int Id, string docListJson)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(new { DocListContentJson = docListJson }, it => it.Id == Id);

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

        public ResultEntity<int> UpdateAMDContent(int Id, string amdContentJson)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(new { AMDContentJson = amdContentJson }, it => it.Id == Id);

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

        public ResultEntity<int> UpdateLinkedForm(int Id, string linkedFormJson)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(new { LinkedFormContentJson = linkedFormJson }, it => it.Id == Id);

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

        public ResultEntity<int> UpdateTask(int Id, string taskJson)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(new { TaskJson = taskJson }, it => it.Id == Id);

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

        public ResultEntity<int> StartProjectPhase(int ProjectId)
        {
            ResultEntity<int> result;

            try
            {
                var dt = DateTime.Now;
                int IntRet = 1;

                var project = new ProjectBLL().GetDataById(ProjectId);
                var list = new TemplatePhaseBLL().GetTemplatePhaseListByTemplateId(project.TemplateId);

                if (list.Count > 0)  //添加项目下一阶段
                {
                    var firstTemplatPhase = list[0];
                    var repResult = InsertProjectPhase(new ProjectPhase
                    {
                        ProjectId = ProjectId,
                        TemplatePhaseId = firstTemplatPhase.Id,
                        StartTime = dt,
                        Status = 1,
                        CreateBy = "",
                        CreateTime = dt
                    });

                    new ProjectBLL().UpdatePhaseStatus(ProjectId, 1, firstTemplatPhase.Name);
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

        public ResultEntity<int> CompletePhase(int PhaseId, int Status)
        {
            ResultEntity<int> result;

            try
            {
                var dt = DateTime.Now;

                //下一阶段
                var projectPhase = dal.GetDataById<ProjectPhase>(PhaseId);
                //对当前是否满足完成条件进行判断
                var templatePhaseId = projectPhase.TemplatePhaseId;

                /* 验证必要内容必要的是否全部上传
                //var attachmentList = new ProjectAttachmentBLL().GetView_ProjectAttachmentByPhaseId(PhaseId, templatePhaseId);

                //var ok = true;
                //ok = !attachmentList.Exists(x => x.TemplateMustContentId.HasValue && x.TemplateMustContentId != 0 && x.IsMust == 1 && x.Id == 0); //必要内容都已经上传

                //if(!ok)
                //{
                //    result = new ResultEntity<int>("必要内容未全部上传，不能完成阶段");
                //    return result;
                //}
                */

                int IntRet = 0;
                var repResult = dal.Update<ProjectPhase>(new { EndTime = dt , Status = Status }, it => it.Id == PhaseId);
     
                var templatePhase = new TemplatePhaseBLL().GetDataById(projectPhase.TemplatePhaseId);
                var list = new TemplatePhaseBLL().GetTemplatePhaseListByTemplateId(templatePhase.TemplateId);
                int index = list.FindIndex(x => x.Id == projectPhase.TemplatePhaseId);

                if (index < list.Count - 1)  //添加项目下一阶段
                {
                    var nextTemplatPhase = list[index + 1];
                    InsertProjectPhase(new ProjectPhase {
                        ProjectId = projectPhase.ProjectId,
                        TemplatePhaseId = nextTemplatPhase.Id,
                        StartTime = DateTime.Now,
                        Status = 1,
                        CreateBy = "",
                        CreateTime = dt
                    });

                    new ProjectBLL().UpdatePhaseStatus(projectPhase.ProjectId, 1, nextTemplatPhase.Name);
                }
                else  //当前已经是最后一个阶段
                {
                    new ProjectBLL().UpdatePhaseStatus(projectPhase.ProjectId, 2, null);
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

        public List<View_ProjectPhase> GetProjectPhaseListByProjectId(int ProjectId)
        {
            var project = new ProjectBLL().GetDataById(ProjectId);

            if (project != null)
            {
                var phaseList = dal.GetProjectPhaseListByProjectId(ProjectId, project.TemplateId);

                foreach (var phase in phaseList)
                {
                    var attachmentList = new ProjectAttachmentBLL().GetView_ProjectAttachmentByPhaseId(phase.ProjectPhaseId, phase.TemplatePhaseId);

                    if (attachmentList != null && attachmentList.Count > 0)
                    {
                        var mustContentProjectAttachmentList = attachmentList.Where(x => x.TemplateMustContentId.HasValue && x.TemplateMustContentId != 0).ToList();

                        mustContentProjectAttachmentList.ForEach(x =>
                        {
                            if (x.Id > 0)
                            {
                                x.UploadStatus = 1;
                            }
                        });

                        var othersProjectAttachmentList = attachmentList.Where(x => !x.TemplateMustContentId.HasValue || x.TemplateMustContentId == 0).ToList();

                        phase.MustContentAttachmentList = mustContentProjectAttachmentList;
                        phase.OthersAttachmentList = othersProjectAttachmentList;
                    }
                }

                return phaseList;
            }

            return null;
        }
    }
}
