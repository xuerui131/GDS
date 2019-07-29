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

    public class ImplSupplierInfo : ImplDaoBase<SupplierInfo>, ISupplierInfoDao<SupplierInfo>
    {
        public List<SupplierInfo> GetDataByName(string Name)
        {
            try
            {
                using (var db = SugarDao.GetInstance())
                {
                    db.IsNoLock = true;

                    var li = db.Queryable<SupplierInfo>().Where(x => x.Supplier == Name).ToList();

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