using GDS.Comon;
using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{
    public class BaseDal
    {
        /// <summary>
        /// 数据库连接字符串
        /// </summary>
        public static string ConnectionString;

        static BaseDal()
        {
            ConnectionString = ConnectionManager.LY;
        }

        /// <summary>
        /// 分页请求数据
        /// </summary>
        /// <param name="PageInfo">分页排序请求信息</param>
        /// <returns></returns>
        public List<T> GetDataByPage<T>(PageRequest pr) where T : class, new()
        {
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
                DataTable dt = SqlHelper.ExecuteGetTable(ConnectionString, CommandType.StoredProcedure, "sp_GetPageData", tool.GetSqlParameters());

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

                if (dt != null && dt.Rows.Count > 0)
                {

                    return Mapper.DataConvert<T>(dt);
                }
                else
                {
                    return new List<T>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        /// <summary>
        /// 分页请求数据
        /// </summary>
        /// <param name="PageInfo">分页排序请求信息</param>
        /// <returns></returns>
        public List<T> GetDataByPage<T>(PageRequest pr, string Connection) where T : class, new()
        {
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
                DataSet ds = SqlHelper.ExecuteDataset(Connection, CommandType.StoredProcedure, "sp_GetPageData", tool.GetSqlParameters());

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

                if (ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {

                    return Mapper.DataConvert<T>(ds.Tables[0]);
                }
                else
                {
                    return new List<T>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }


        /// <summary>
        ///  获取全部数据
        ///  实体名字必须和数据库名字一致 除去删除数据 where IsDelete =0 or IsDelete is null
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public List<T> GetDataAll<T>() where T : class, new()
        {
            string tableName = typeof(T).Name.ToString();
            string select = @"select * from " + tableName + " where IsDelete =0 or IsDelete is null";
            try
            {
                DataTable dt = SqlHelper.ExecuteGetTable(ConnectionString, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.DataConvert<T>(dt);
                }
                else
                {
                    return new List<T>();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }

        /// <summary>
        /// 根据Id获取实体 实体名字必须和数据库名字一致
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public T GetDataById<T>(int Id) where T : class, new()
        {
            string tableName = typeof(T).Name.ToString();
            string select = @"select * from " + tableName + " where Id =" + Id.ToString();
            try
            {
                DataTable dt = SqlHelper.ExecuteGetTable(ConnectionString, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.DataConvert<T>(dt.Rows[0]);
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

        public List<T> GetDatasByIds<T>(int[] Ids) where T : class, new()
        {
            if (Ids == null || Ids.Length == 0)
                return new List<T>();
            string strIds = string.Join(",", Ids);
            string tableName = typeof(T).Name.ToString();
            string select = @"select * from " + tableName + " where Id in(" + strIds + ")";
            try
            {
                DataTable dt = SqlHelper.ExecuteGetTable(ConnectionString, CommandType.Text, select, null);

                if (dt != null && dt.Rows.Count > 0)
                {
                    return Mapper.ToListEntity<T>(dt).ToList();
                }
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
            return new List<T>();
        }

        public object CheckDBNULL(object obj)
        {
            if (obj == null)
                return DBNull.Value;
            if (obj.GetType() == typeof(DateTime))
            {
                if (obj == null || Convert.ToDateTime(obj) < Convert.ToDateTime("1900-01-01"))
                {
                    return DBNull.Value;
                }
            }

            return obj;
        }
        /// <summary>
        /// 根据Id真删除实体 实体名字必须和数据库名字一致
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Id"></param>
        /// <returns></returns>
        public int DeleteDataById<T>(int Id, bool IsDelete = false) where T : class, new()
        {
            string tableName = typeof(T).Name.ToString();
            string delete = "";

            if (IsDelete)
            {
                delete = @"delete " + tableName + " where Id =" + Id.ToString();
            }
            else
            {
                delete = @"UPDATE " + tableName + " SET IsDelete=1 where Id =" + Id.ToString();
            }
            try
            {
                int ret = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, delete, null);

                return ret;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }
        public int DeleteDataByIds<T>(string Ids, bool IsDelete = false) where T : class, new()
        {
            string tableName = typeof(T).Name.ToString();
            string delete = "";

            if (IsDelete)
            {
                delete = @"delete " + tableName + " where Id in(" + Ids + ")";
            }
            else
            {
                delete = @"UPDATE " + tableName + " SET IsDelete=1 where Id in(" + Ids + ")";
            }
            try
            {
                int ret = SqlHelper.ExecuteNonQuery(ConnectionString, CommandType.Text, delete, null);

                return ret;
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
                throw ex;
            }
        }


        //批量插入数据 dt的名字和数据名字要一致
        public void SqlBulkCopyByTable(DataTable dt)
        {
            SqlHelper.SqlBulkCopyByDatatable(dt.TableName, dt, ConnectionString);
        }
    }
}
