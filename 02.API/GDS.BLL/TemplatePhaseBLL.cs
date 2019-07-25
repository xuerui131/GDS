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
    public class TemplatePhaseBLL
    {

        ITemplatePhaseDao<TemplatePhase> dal;
        public TemplatePhaseBLL()
        {
            dal = new ImplTemplatePhase() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<TemplatePhase> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<TemplatePhase>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<TemplatePhase> GetDataAll()
        {
            return dal.GetDataAll<TemplatePhase>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TemplatePhase GetDataById(int id)
        {
            return dal.GetDataById<TemplatePhase>(id);
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
                var repResult = dal.DeleteDataById<TemplatePhase>(id);

                var currentPhase = GetDataById(id);

                dal.UpdateSort(currentPhase.TemplateId, currentPhase.Sort, 0);

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
                var repResult = dal.FalseDeleteDataByIds<TemplatePhase>(Ids);

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
        public ResultEntity<int> InsertTemplatePhase(TemplatePhase uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<TemplatePhase>(uie);
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

        public ResultEntity<int> InsertTemplatePhaseReq(TemplatePhaseReq uie)
        {
            ResultEntity<int> result;

            try
            {

                int IntRet = 0;

                if (uie.CurrentPhaseId == 0)  //首次添加
                {
                    var list = GetTemplatePhaseListByTemplateId(uie.TemplateId);
                    if (list == null || list.Count < 1)
                    {
                        uie.Sort = 1;
                    }
                    else
                    {
                        uie.Sort = list.Count + 1;
                    }

                    var repResult = dal.Insert<TemplatePhase>(AutoMapper.Mapper.Map<TemplatePhase>(uie));

                    if (repResult != null)
                    {
                        IntRet = int.Parse(repResult.ToString());
                    }
                }
                else  //在指定阶段下添加
                {
                    var currentPhase = GetDataById(uie.CurrentPhaseId);

                    uie.Sort = currentPhase.Sort + 1;

                    dal.UpdateSort(uie.TemplateId, currentPhase.Sort, 1);

                    var repResult = dal.Insert<TemplatePhase>(AutoMapper.Mapper.Map<TemplatePhase>(uie));

                    if (repResult != null)
                    {
                        IntRet = int.Parse(repResult.ToString());
                    }
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
        public ResultEntity<int> UpdateTemplatePhase(TemplatePhase uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<TemplatePhase>(uie);

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

        public List<View_TemplatePhase> GetTemplatePhaseListByTemplateId(int templateId)
        {
            var list =  AutoMapper.Mapper.Map<List<View_TemplatePhase>>(dal.GetTemplatePhaseByTemplateId(templateId));

            foreach (var entity in list)
            {
                entity.MustContentList = new TemplateMustContentBLL().GetTemplateMustContentsByTemplatePhaseId(entity.Id);
            }

            return list;
        }

        public List<TemplatePhase> GetDataByName(string Name, int TemplateId)
        {
            return dal.GetDataByName(Name,TemplateId);
        }
    }
}
