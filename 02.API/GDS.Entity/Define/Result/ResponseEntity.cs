namespace GDS.Entity.Result
{
    /// <summary>
    /// 返回对象
    /// </summary>
    public class ResponseEntity<T>
    {
        public ResponseEntity() { }

        public ResponseEntity(string message)
        {
            Code = (int)ReCode.Fail;
            Message = message;
        }

        public ResponseEntity(bool success, string message, T data)
        {
            Code = success ? (int)ReCode.Success : (int)ReCode.Fail;
            Message = message;
            Data = data;
        }

        public ResponseEntity(int code, string message, T data)
        {
            Code = code;
            Message = message;
            Data = data;
        }

        public int Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }

    /// <summary>
    /// 返回信息枚举
    /// </summary>
    public enum ReCode
    {
        /// <summary>
        /// 成功
        /// </summary>
        Success = 0,

        /// <summary>
        /// 失败
        /// </summary>
        Fail = -1,

        /// <summary>
        /// 异常
        /// </summary>
        Exception = -999,
        /// <summary>
        /// 不合法
        /// </summary>
        Valid = -2
    }


    public class TeachResponseEntity<T>
    {
        public TeachResponseEntity() { }

        public TeachResponseEntity(string message)
        {
            Code = "9999";
            Message = message;
        }

        public TeachResponseEntity(bool success, string message, T data)
        {
            Code = success ? "0000" : "9999";
            Message = message;
            Data = data;
        }

        public TeachResponseEntity(string code, string message, T data)
        {
            Code = code;
            Message = message;
            Data = data;
        }

        public string Code { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
