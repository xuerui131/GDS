using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using GDS.Entity;
using SqlSugar;

namespace GDS.Dal
{

    public class ImplUserDetail : ImplDaoBase<UserDetail>, IUserDetailDao<UserDetail>
    {
        public UserDetail GetDataByUserId(int UserId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    string strId = UserId.ToString();

                    var li = db.Queryable<UserDetail>().Where(x => x.UserID == strId).ToList();

                    return li.FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}