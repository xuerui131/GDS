using GDS.Entity;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{
    public interface IDaoBase<T>
        where T : class
    {
        object Insert<TReturn>(TReturn entity, bool isIdentity = true) where TReturn : class, new();

        List<TReturn> GetListByIds<TReturn>(string ids) where TReturn : class, new();

        TReturn GetDataById<TReturn>(int Id) where TReturn : class, new();
        TReturn GetViewDataById<TReturn>(int Id) where TReturn : class, new();

        List<TReturn> GetDataAll<TReturn>() where TReturn : class, new();
        List<TReturn> GetViewDataAll<TReturn>() where TReturn : class, new();
        List<TReturn> GetDataByPage<TReturn>(PageRequest pr) where TReturn : class, new();

        bool DeleteDataById<TReturn>(int Id) where TReturn : class, new();

        bool DeleteDataByIds<TReturn>(int[] Ids) where TReturn : class, new();

        bool FalseDeleteDataByIds<TReturn>(int[] Ids) where TReturn : class, new();

        bool Update<TReturn>(TReturn rowObj) where TReturn : class, new();
        bool Update<TReturn>(object rowObj, Expression<Func<TReturn, bool>> expression) where TReturn : class, new();
        bool Update<TReturn>(string setValues, Expression<Func<TReturn, bool>> expression, object whereObj = null) where TReturn : class, new();
    }
}
