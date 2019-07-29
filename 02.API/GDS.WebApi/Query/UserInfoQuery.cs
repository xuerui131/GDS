using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace GDS.Query
{
    public class UserInfoQuery : BaseQuery
    {

        public UserInfoQuery()
        {
        }

        public UserInfoQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class BackMenuQuery : BaseQuery
    {

        public BackMenuQuery()
        {
        }

        public BackMenuQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }

    public class BackRoleQuery : BaseQuery
    {

        public BackRoleQuery()
        {
        }

        public BackRoleQuery(NameValueCollection queryParams)
            : base(queryParams)
        {
        }
    }
}