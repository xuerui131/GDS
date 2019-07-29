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

    public class ImplUsers : ImplDaoBase<Users>, IUsersDao<Users>
    {
        public List<Users> GetUsersByDepartId(int departId)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    if (departId == 0)
                    {
                        var li = db.Queryable<Users>().Where(x => !x.Disable).ToList();

                        return li;
                    }
                    else
                    {
                        var li = db.SqlQuery<Users>(@" 
select a.*
from Users a left join UserDetail b on a.ID = b.UserID 
where b.departId = @departId
", new { departId });

                        return li;
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public List<Users> GetDataByUserName(string userName)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<Users>().Where(x => x.UserName == userName).ToList();

                    return li;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}