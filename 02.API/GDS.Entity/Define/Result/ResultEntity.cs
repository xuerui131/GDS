namespace GDS.Entity.Result
{
    public class ResultEntity<T>
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public T Data { get; set; }

        public ResultEntity()
        {
        }

        public ResultEntity(string message)
        {
            Success = false;
            Message = message;
        }

        public ResultEntity(bool success, string message, T data)
        {
            Success = success;
            Message = message;
            Data = data;
        }
    }
}
