using System.Collections.Specialized;
using System.Text.RegularExpressions;
using System.Web;

namespace GDS.Comon
{
    public static class ParamHelper
    {
        /// <summary>
        /// 检查参数（防sql注入）
        /// </summary>
        /// <param name="value">检查的字符串</param>
        /// <returns>是否检查通过</returns>
        public static bool CheckPara(ref string value)
        {
            if (string.IsNullOrEmpty(value))
                return true;

            var rg = new Regular(value.ToUpper());
            if (rg.CheckRegularFun(RegularFunction.Insert))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Update))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Select))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Alter))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Drop))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Create))
                return false;
            if (rg.CheckRegularFun(RegularFunction.Delete))
                return false;

            value = value.Replace("\\", "\\\\").Replace("'", "''");
            return true;
        }

        public static bool CheckParaQ()
        {
            return CheckPara(HttpContext.Current.Request.QueryString);
        }

        public static bool CheckParaQ(ref NameValueCollection formParams)
        {
            if (!CheckParaQ())
                return false;
            var paras = HttpContext.Current.Request.QueryString;
            formParams = new NameValueCollection();
            foreach (string para in paras)
            {
                formParams.Add(para, paras[para].Replace("\\", "\\\\").Replace("'", "''"));
            }
            return true;
        }

        public static bool CheckParaF()
        {
            return CheckPara(HttpContext.Current.Request.Form);
        }

        public static bool CheckParaF(ref NameValueCollection formParams)
        {
            if (!CheckParaF())
                return false;
            var paras = HttpContext.Current.Request.Form;
            formParams = new NameValueCollection();
            foreach (string para in paras)
            {
                formParams.Add(para, paras[para].Replace("\\", "\\\\").Replace("'", "''"));
            }
            return true;
        }

        // <summary>
        /// check the regular in parameters by post or get ways
        /// <returns></returns>
        public static bool CheckPara(NameValueCollection formParams)
        {
            foreach (string para in formParams)
            {
                var rg = new Regular(formParams[para].ToUpper());
                if (rg.CheckRegularFun(RegularFunction.Insert))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Update))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Select))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Alter))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Drop))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Create))
                    return false;
                if (rg.CheckRegularFun(RegularFunction.Delete))
                    return false;
            }
            return true;
        }
    }

    /// <summary>
    /// sql insert delegate function named
    /// </summary>
    /// <param name="value">para</param>
    /// <returns></returns>
    public delegate bool RegularExtend(string value);

    public class Regular : IRegular
    {
        private readonly string _param = string.Empty;
        public Regular(string param)
        {
            _param = param;
        }
        /// <summary>
        /// check regular by function
        /// </summary>
        /// <param name="regularextend">function</param>
        /// <returns></returns>
        public bool CheckRegularFun(RegularExtend regularextend)
        {
            return regularextend(_param);
        }
    }
    public interface IRegular
    {
        /// <summary>
        /// check regular by function
        /// </summary>
        /// <param name="regularextend">function</param>
        /// <returns></returns>
        bool CheckRegularFun(RegularExtend regularextend);
    }

    public class RegularFunction
    {
        public static bool Insert(string value)
        {
            if (value.Contains(RegularSqlInsert) && (new Regex(RegularSqlInsertRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Update(string value)
        {
            if (value.Contains(RegularSqlUpdate) && (new Regex(RegularSqlUpdateRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Select(string value)
        {
            if (value.Contains(RegularSqlSelect) && (new Regex(RegularSqlSelectRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Alter(string value)
        {
            if (value.Contains(RegularSqlAlter) && (new Regex(RegularSqlAlterRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Drop(string value)
        {
            if (value.Contains(RegularSqlDrop) && (new Regex(RegularSqlDropRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Delete(string value)
        {
            if (value.Contains(RegularSqlDelete) && (new Regex(RegularSqlDeleteRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public static bool Create(string value)
        {
            if (value.Contains(RegularSqlCreate) && (new Regex(RegularSqlCreateRegex)).Matches(value).Count > 0)
                return true;
            return false;
        }

        public const string RegularSqlInsert = "INSERT";
        public const string RegularSqlInsertRegex = @"INSERT[\s]+INTO [\s\S]+";
        public const string RegularSqlUpdate = "UPDATE";
        public const string RegularSqlUpdateRegex = @"UPDATE [\s\S]+ SET [\s\S]+";
        public const string RegularSqlSelect = "SELECT";
        public const string RegularSqlSelectRegex = @"SELECT [\s\S]+ FROM [\s\S]+";
        public const string RegularSqlAlter = "ALTER";
        public const string RegularSqlAlterRegex = @"ALTER[\s]+TABLE [\s\S]+";
        public const string RegularSqlDrop = "DROP";
        public const string RegularSqlDropRegex = @"DROP[\s]+TABLE [\s\S]+";
        public const string RegularSqlDelete = "DELETE";
        public const string RegularSqlDeleteRegex = @"DELETE[\s]+FROM [\s\S]+";
        public const string RegularSqlCreate = "CREATE";
        public const string RegularSqlCreateRegex = @"CREATE [\s\S]+";
        public const string RegularSqlRegexText = "从客户端传入的值存在风险，请检查!";
    }
}
