using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Entity
{
    [Serializable]
    public class PageRequest
    {
        public PageRequest()
        {

        }

        /// <summary>
        /// 表或视图或查询语句
        /// </summary>
        public string TableName { get; set; }

        /// <summary>
        /// 是否带select的查询语句
        /// </summary>
        public bool IsSelect { get; set; }

        /// <summary>
        /// 是否返回记录
        /// </summary>
        public bool IsReturnRecord { get; set; }

        /// <summary>
        /// 每页记录大小
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 返回第几页
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// where后面的查询条件
        /// </summary>
        public string Where { get; set; }

        /// <summary>
        /// order by 后面用于排序的子句
        /// </summary>
        public string Order { get; set; }

        /// <summary>
        /// 要返回的字段名
        /// </summary>
        public string FieldStr { get; set; }

        /// <summary>
        /// 本次查询能够查到的所有记录总条数
        /// </summary>
        public int Out_AllRecordCount { get; set; }

        /// <summary>
        /// 本次查到返回的记录数目
        /// </summary>
        public int Out_RecordCount { get; set; }

        /// <summary>
        /// 本次查询能够返回的页数
        /// </summary>
        public int Out_PageCount { get; set; }

        /// <summary>
        /// 执行结果信息
        /// </summary>
        public String Out_ReturnMessage { get; set; }

        public object Data { get; set; }

    }
}
