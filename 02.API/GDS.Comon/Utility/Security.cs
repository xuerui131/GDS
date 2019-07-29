using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class Security
    {
        private static readonly char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

        /// <summary>
        /// 获取
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>

        //public static string GetM5Hex(string str)
        //{
        //    String pw = $"{str}LY";
        //    return CreateMD5Hash(pw);
        //}

        public static string GetM5Hex(string str, string postfix = "LY")
        {
            String pw = $"{str}{postfix}";
            return CreateMD5Hash(pw);
        }

        /**
        * 密码加密
        * @param password
        * @return
        */
        public static String GetPassword(String password)
        {
            String pw = "L" + password + "οY";
            return CreateMD5Hash(pw);
        }

        /// <summary>
        ///  获取字符串的MD5码
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private static string CreateMD5Hash(string input)
        {
            // Use input string to calculate MD5 hash
            MD5 md5 = System.Security.Cryptography.MD5.Create();
            byte[] inputBytes = System.Text.Encoding.UTF8.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            // Convert the byte array to hexadecimal string
            StringBuilder sb = new StringBuilder(hashBytes.Length * 2);
            for (int i = 0; i < hashBytes.Length; i++)
            {
                sb.Append(HEX_DIGITS[(hashBytes[i] >> 4) & 0x0f]);
                sb.Append(HEX_DIGITS[hashBytes[i] & 0x0f]);
            }
            return sb.ToString();
        }
        //把密文转换成十六进制的字符串形式

        // 把字节型转换成十六进制字符串  
        public static string ByteToString(byte[] InBytes)
        {
            string StringOut = "";
            foreach (byte InByte in InBytes)
            {
                StringOut = StringOut + String.Format("{0:X2} ", InByte);
            }
            return StringOut;
        }
        public string ByteToString(byte[] InBytes, int len)
        {
            string StringOut = "";
            for (int i = 0; i < len; i++)
            {
                StringOut = StringOut + String.Format("{0:X2} ", InBytes[i]);
            }
            return StringOut;
        }
        // 把十六进制字符串转换成字节型  
        public static byte[] StringToByte(string InString)
        {
            string[] ByteStrings;
            ByteStrings = InString.Split(" ".ToCharArray());
            byte[] ByteOut;
            ByteOut = new byte[ByteStrings.Length - 1];
            for (int i = 0; i == ByteStrings.Length - 1; i++)
            {
                ByteOut[i] = Convert.ToByte(("0x" + ByteStrings[i]));
            }
            return ByteOut;
        }
    }
}
