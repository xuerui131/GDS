using GDS.Comon;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace GDS.Query
{
    public abstract class BaseQuery
    {
        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public string SortField { get; set; }

        public string SortType { get; set; }

        protected BaseQuery()
        {
        }

        protected BaseQuery(NameValueCollection queryParams)
        {
            try
            {
                this.PageIndex = queryParams["pageindex"].ToInteger();
                this.PageSize = queryParams["pagesize"].ToInteger();
                this.PageIndex = this.PageIndex <= 0 ? 1 : this.PageIndex;
                this.PageSize = this.PageSize <= 0 ? int.MaxValue : this.PageSize;
                this.SortField = (queryParams["SortField"] == null || queryParams["SortField"] == "") ? "Id" : queryParams["SortField"].ToString();
                this.SortType = (queryParams["SortType"] == null || queryParams["SortType"] == "") ? "desc" : queryParams["SortType"].ToString();
            }
            catch (Exception ex)
            {
                Loger.LogErr(ex);
            }
        }


    }
}