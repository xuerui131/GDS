using GDS.Comon;
using GDS.Entity;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{
    public class ImplDaoBase<T> : IDaoBase<T> where T : class
    {
        /// <summary>
        /// 默认返回Identity，如果没有Identity执行成功将返回true
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <param name="isIdentity"></param>
        /// <returns></returns>
        public object Insert<TReturn>(TReturn entity, bool isIdentity = true) where TReturn : class, new()
        {
            object obj;
            using (var db = SugarDao.GetInstance())
            {
                obj = db.Insert(entity, isIdentity);
            }

            //做兼容，有可能返回的true，false,转为1，0
            if (obj is bool)
            {
                obj = (bool)obj ? 1 : 0;
            }
            //有可能是字符串
            if (obj is string)
            {
                if ((string)obj == "true")
                {
                    obj = 1;
                }
                else if ((string)obj == "false")
                {
                    obj = 0;
                }
            }

            return obj;
        }

        /// <summary>
        /// 根据主键Id查询
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public TReturn GetDataById<TReturn>(int Id) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                db.IsNoLock = true;
                TReturn entity = db.Queryable<TReturn>().InSingle(Id);
                return entity;
            }
        }

        /// <summary>
        /// 查询全部数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public List<TReturn> GetDataAll<TReturn>() where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                db.IsNoLock = true;
                List<TReturn> Li = db.Queryable<TReturn>().ToList();
                return Li;
            }
        }


        /// <summary>
        /// 根据主键删除数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public bool DeleteDataById<TReturn>(int Id) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                return db.Delete<TReturn, int>(Id);
            }
        }

        /// <summary>
        /// 根据主键列表删除数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Ids"></param>
        /// <returns></returns>
        public bool DeleteDataByIds<TReturn>(int[] Ids) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                //主键批量删除
                return db.Delete<TReturn, int>(Ids);
            }
        }

        /// <summary>
        /// 根据主键列表删除数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Ids"></param>
        /// <returns></returns>
        public bool FalseDeleteDataByIds<TReturn>(int[] Ids) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                //主键批量删除
                return db.FalseDelete<TReturn, int>("IsDelete", Ids);
            }
        }

        public bool Update<TReturn>(TReturn entity) where TReturn : class, new()
        {
            bool obj;
            using (var db = SugarDao.GetInstance())
            {
                db.DisableUpdateColumns = new string[] { "CreateTime", "CreateBy", "IsDelete" };//设置CreateTime不更新
                obj = db.Update(entity);
            }
            return obj;
        }

        public bool Update<TReturn>(object rowObj, Expression<Func<TReturn, bool>> expression) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                db.DisableUpdateColumns = new string[] { "CreateTime", "CreateBy", "IsDelete" };//设置CreateTime不更新

                return db.Update<TReturn>(rowObj, expression);
            }
        }
        public bool Update<TReturn>(string setValues, Expression<Func<TReturn, bool>> expression, object whereObj = null) where TReturn : class, new()
        {

            using (var db = SugarDao.GetInstance())
            {
                db.DisableUpdateColumns = new string[] { "CreateTime", "CreateBy", "IsDelete" };//设置CreateTime不更新
                return db.Update<TReturn>(setValues, expression, whereObj);
            }
        }
        /// <summary>
        /// 分页请求数据
        /// </summary>
        /// <param name="PageInfo">分页排序请求信息</param>
        /// <returns></returns>
        public List<TReturn> GetDataByPage<TReturn>(PageRequest pr) where TReturn : class, new()
        {
            string Connection = Comon.ConnectionManager.LY;
            /*
           @TVName nvarchar(1000),--表或视图或查询语句
           @IsSelectSQL bit, --@TVName是否带select的查询语句
           @IsReturnRecord bit, --是否返回记录s
           @PageSize int, --每页记录大小
           @PageIndex int, --要返回的页数
           @WhereStr nvarchar(1000),--where后面的查询条件
           @OrderStr nvarchar(400),---order by 后面用于排序的子句
           @FieldStr nvarchar(1000),--要返回的字段名
           @AllRecordCount int OUTPUT, --返回本次查询能够查到的所有记录数目
           @RecordCount int OUTPUT, --本次查到返回的记录数目
           @PageCount int OUTPUT, --返回本次查询能够返回的页数
           @RMessage nvarchar(MAX) OUTPUT --返回执行结果信息
            */

            ParameterTools tool = new ParameterTools();
            tool.AddSqlParameter("@TVName", SqlDbType.NVarChar, pr.TableName);
            tool.AddSqlParameter("@IsSelectSQL", SqlDbType.Bit, pr.IsSelect);
            tool.AddSqlParameter("@IsReturnRecord", SqlDbType.Bit, pr.IsReturnRecord);
            tool.AddSqlParameter("@PageSize", SqlDbType.Int, pr.PageSize);
            tool.AddSqlParameter("@PageIndex", SqlDbType.Int, pr.PageIndex);

            tool.AddSqlParameter("@WhereStr", SqlDbType.NVarChar, pr.Where);
            tool.AddSqlParameter("@OrderStr", SqlDbType.NVarChar, pr.Order);
            tool.AddSqlParameter("@FieldStr", SqlDbType.NVarChar, pr.FieldStr);


            tool.AddSqlParameter("@AllRecordCount", SqlDbType.Int, 64, pr.Out_AllRecordCount, ParameterDirection.Output);
            tool.AddSqlParameter("@RecordCount", SqlDbType.Int, 64, pr.Out_PageCount, ParameterDirection.Output);
            tool.AddSqlParameter("@PageCount", SqlDbType.Int, 64, pr.Out_RecordCount, ParameterDirection.Output);
            tool.AddSqlParameter("@RMessage", SqlDbType.VarChar, 64, pr.Out_ReturnMessage, ParameterDirection.Output);



            try
            {
                DataSet ds = GDS.Comon.SqlHelper.ExecuteDataset(Connection, CommandType.StoredProcedure, "sp_GetPageData", tool.GetSqlParameters());

                if (tool.GetSqlParameterByName("AllRecordCount").Value != null)
                {
                    pr.Out_AllRecordCount = (int)tool.GetSqlParameterByName("AllRecordCount").Value;
                }
                if (tool.GetSqlParameterByName("RecordCount").Value != null)
                {
                    pr.Out_PageCount = (int)tool.GetSqlParameterByName("RecordCount").Value;
                }
                if (tool.GetSqlParameterByName("PageCount").Value != null)
                {
                    pr.Out_RecordCount = (int)tool.GetSqlParameterByName("PageCount").Value;
                }
                if (tool.GetSqlParameterByName("RMessage").Value != null)
                {
                    pr.Out_ReturnMessage = tool.GetSqlParameterByName("RMessage").Value.ToString();
                }
                if (ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    return Mapper.DataConvert<TReturn>(ds.Tables[0]);
                }
                else
                {
                    return new List<TReturn>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        public TReturn GetViewDataById<TReturn>(int Id) where TReturn : class, new()
        {
            string tableName = typeof(TReturn).Name.ToString();
            string select = @"select * from " + tableName + " where Id =" + Id.ToString();
            try
            {
                string Connection = Comon.ConnectionManager.LY;
                DataTable dt = Comon.SqlHelper.ExecuteGetTable(Connection, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.DataConvert<TReturn>(dt.Rows[0]);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        public List<TReturn> GetViewDataAll<TReturn>() where TReturn : class, new()
        {
            string tableName = typeof(TReturn).Name.ToString();
            string select = @"select * from " + tableName + " where IsDelete =0 or IsDelete is null";
            try
            {
                string Connection = Comon.ConnectionManager.LY;
                DataTable dt = Comon.SqlHelper.ExecuteGetTable(Connection, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.DataConvert<TReturn>(dt);
                }
                else
                {
                    return new List<TReturn>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        public List<TReturn> GetListByIds<TReturn>(string ids) where TReturn : class, new()
        {
            string tableName = typeof(TReturn).Name.ToString();
            string select = @"select * from " + tableName + " where id in (" + ids + ") and  ISNULL(IsDelete,0)!=1";
            try
            {
                string Connection = Comon.ConnectionManager.LY;
                DataTable dt = Comon.SqlHelper.ExecuteGetTable(Connection, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.DataConvert<TReturn>(dt);
                }
                else
                {
                    return new List<TReturn>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        /// <summary>
        /// Sql语句查询
        /// </summary>
        /// <typeparam name="TReturn"></typeparam>
        /// <param name="sql"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public IList<TReturn> SqlQueryList<TReturn>(string sql, object whereObj = null) where TReturn : class, new()
        {
            using (var db = SugarDao.GetInstance())
            {
                db.IsNoLock = true;
                IList<TReturn> list = db.SqlQuery<TReturn>(sql, whereObj);
                return list;
            }
        }

    }
}
