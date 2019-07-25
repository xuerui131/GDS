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
    public class DepartmentBLL
    {

        IDepartmentDao<Department> dal;
        public DepartmentBLL()
        {
            dal = new ImplDepartment() { };
        }
        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="preq"></param>
        /// <returns></returns>
        public List<Department> GetDataByPage(PageRequest preq)
        {
            return dal.GetDataByPage<Department>(preq);
        }

        public List<View_DepartmentAuditor> GetView_DepartmentAuditorByPage(PageRequest preq)
        {
            return dal.GetDataByPage<View_DepartmentAuditor>(preq);
        }

        /// <summary>
        /// 获取全部数据
        /// </summary>
        /// <returns></returns>
        public List<Department> GetDataAll()
        {
            return dal.GetDataAll<Department>();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Department GetDataById(int id)
        {
            return dal.GetDataById<Department>(id);
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
                var repResult = dal.DeleteDataById<Department>(id);

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
                var repResult = dal.FalseDeleteDataByIds<Department>(Ids);

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
        public ResultEntity<int> InsertDepartment(Department uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Insert<Department>(uie);
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
        public ResultEntity<int> UpdateDepartment(Department uie)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Department>(
                    new
                    {
                        DepmentNo = uie.DepmentNo ,
                        Name = uie.Name,
                        NameEN=uie.NameEN,
                        Address = uie.Address
                    },
                    it => it.Id == uie.Id);


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

        public ResultEntity<int> UpdateAuditor(int Id, string Auditor)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Department>(new { Auditor = Auditor }, it => it.Id == Id);

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

        public ResultEntity<int> UpdateChargePerson(int Id, string ChargePerson)
        {
            ResultEntity<int> result;

            try
            {
                int IntRet = 0;
                var repResult = dal.Update<Department>(new { ChargePerson = ChargePerson }, it => it.Id == Id);

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

        public List<Department> GetDepartmentByAuditor(string Auditor)
        {
            return dal.GetDepartmentByAuditor(Auditor);
        }

        public List<View_Department> GetView_Departments()
        {
            var list = dal.GetView_Departments();

            if (list != null)
            {
                var firstList = list.Where(x => x.ParentID == 0).ToList();

                foreach (var entity in firstList)
                {
                    GenDepart(entity, list);
                }

                return firstList;
            }

            return null;
        }

        public void GenDepart(View_Department CurrentDepart, List<View_Department> departments)
        {
            if (CurrentDepart != null)
            {
                int id = CurrentDepart.Id;

                var list = departments.Where(x => x.ParentID == id);

                if (list != null && list.Count() > 0)
                {
                    CurrentDepart.SubDepartments = list.ToList();

                    foreach (var entity in list)
                    {
                        GenDepart(entity, departments);
                    }
                }
            }
        }
    }
}
