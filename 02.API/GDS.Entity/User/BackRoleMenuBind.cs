using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    public class BackRoleMenuBind : ModelBase
    {
        public int MenuId { get; set; }
        public int RoleId { get; set; }

        public int OperationRight { get; set; }  //操作权限
    }
}
