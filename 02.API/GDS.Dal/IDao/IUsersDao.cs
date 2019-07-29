using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface IUsersDao<T> : IDaoBase<T> where T : class
    {
        List<Users> GetUsersByDepartId(int departId);

        List<Users> GetDataByUserName(string userName);
    }
}
