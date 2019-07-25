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
    public class ProjectAttachmentBLL
    {

        IProjectAttachmentDao<ProjectAttachment> dal;
        public ProjectAttachmentBLL()
        {
            dal = new ImplProjectAttachment() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<ProjectAttachment> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<ProjectAttachment>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<ProjectAttachment> GetDataAll()
        {
            return dal.GetDataAll<ProjectAttachment>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProjectAttachment GetDataById(int id)
        {
            return dal.GetDataById<ProjectAttachment>(id);
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
                var repResult = dal.DeleteDataById<ProjectAttachment>(id);

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
                var repResult = dal.FalseDeleteDataByIds<ProjectAttachment>(Ids);

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
        public ResultEntity<int> InsertProjectAttachment(ProjectAttachment uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<ProjectAttachment>(uie);
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
        public ResultEntity<int> UpdateProjectAttachment(ProjectAttachment uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectAttachment>(uie);

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

        public ResultEntity<int> UpdateStatus(int Id, int Status, string ProjectManager = null)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectAttachment>(new { Status = Status, AgreeTime = DateTime.Now, ProjectManager = ProjectManager }, it => it.Id == Id);

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

        public List<ProjectAttachment> GetProjectAttachments(int TypeId, int type)
        {
            return dal.GetProjectAttachments(TypeId, type);
        }

        public List<View_ProjectAttachment> GetView_ProjectAttachmentByPhaseId(int ProjectPhaseId, int TemplatePhaseId)
        {
            return dal.GetView_ProjectAttachmentByPhaseId(ProjectPhaseId, TemplatePhaseId);
        }

        public ResultEntity<int> UpdateUploadFile(int id, string url, string name)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectAttachment>(new { Url = url, Name = name }, it => it.Id == id);

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
