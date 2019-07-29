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
    public class ProjectTypeBLL
    {

        IProjectTypeDao<ProjectType> dal;
        public ProjectTypeBLL()
        {
            dal = new ImplProjectType() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<ProjectType> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<ProjectType>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<ProjectType> GetDataAll()
        {
            return dal.GetDataAll<ProjectType>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProjectType GetDataById(int id)
        {
            return dal.GetDataById<ProjectType>(id);
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
                var repResult = dal.DeleteDataById<ProjectType>(id);

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
                var repResult = dal.FalseDeleteDataByIds<ProjectType>(Ids);

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
        public ResultEntity<int> InsertProjectType(ProjectType uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<ProjectType>(uie);
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
        public ResultEntity<int> UpdateProjectType(ProjectType uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<ProjectType>(uie);

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

        public List<ProjectType> GetProjectTypesByDepartId(int DepartId)
        {
            return dal.GetProjectTypesByDepartId(DepartId);
        }

        public List<View_DepartAndProjectType> GetDepartmentAndProjectType()
        {
            var datas = dal.GetTempProjectTypeList();

            var list = new List<View_DepartAndProjectType>();

            list = datas.GroupBy(x => new { x.DepartId, x.DepartName }, (y, z) => {
                  var entity = new View_DepartAndProjectType { DepartId = y.DepartId, DepartName = y.DepartName };
                  entity.ProjectTypes = new List<View_ProjectType>();

                  foreach (var projectType in z)
                  {
                      entity.ProjectTypes.Add(new View_ProjectType { ProjectTypeId = projectType.ProjectTypeId, ProjectTypeName = projectType.ProjectTypeName });
                  }

                  return entity;
            }).ToList();

            return list;
        }


        public List<ProjectType> GetDataByName(string Name)
        {
            return dal.GetDataByName(Name);
        }
    }
}
