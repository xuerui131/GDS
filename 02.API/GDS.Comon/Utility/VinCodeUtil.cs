using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class VinCodeUtil
    {
        private static Hashtable htbVIN()
        {
            Hashtable ht = new Hashtable();
            ht.Add("A", 1);
            ht.Add("B", 2);
            ht.Add("C", 3);

            ht.Add("D", 4);
            ht.Add("E", 5);
            ht.Add("F", 6);

            ht.Add("G", 7);
            ht.Add("H", 8);
            ht.Add("J", 1);

            ht.Add("K", 2);
            ht.Add("L", 3);
            ht.Add("M", 4);

            ht.Add("N", 5);
            ht.Add("P", 7);
            ht.Add("R", 9);

            ht.Add("S", 2);
            ht.Add("T", 3);
            ht.Add("U", 4);

            ht.Add("V", 5);
            ht.Add("W", 6);
            ht.Add("X", 7);

            ht.Add("Y", 8);
            ht.Add("Z", 9);

            ht.Add("1", 1);
            ht.Add("2", 2);
            ht.Add("3", 3);

            ht.Add("4", 4);
            ht.Add("5", 5);
            ht.Add("6", 6);

            ht.Add("7", 7);
            ht.Add("8", 8);
            ht.Add("9", 9);

            ht.Add("0", 0);

            return ht;
        }
        //车辆识别号中顺序对应的加权系数
        private static Hashtable htbVIN_JQS()
        {
            Hashtable ht = new Hashtable();
            ht.Add(1, 8);
            ht.Add(2, 7);
            ht.Add(3, 6);

            ht.Add(4, 5);
            ht.Add(5, 4);
            ht.Add(6, 3);

            ht.Add(7, 2);
            ht.Add(8, 10);
            ht.Add(9, 0);

            ht.Add(10, 9);
            ht.Add(11, 8);
            ht.Add(12, 7);

            ht.Add(13, 6);
            ht.Add(14, 5);
            ht.Add(15, 4);

            ht.Add(16, 3);
            ht.Add(17, 2);

            return ht;
        }
        // IN可用字符
        private static string sKYZF = "ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
        //检验车辆识别号
        public static bool CheckVin(string vin)
        {
            string sJYW = string.Empty;
            bool result = false;
            bool blKYZF = false;
            if (vin.Length == 17)
            {
                int iJQS = 0, intTemp = 0;
                Hashtable ht = new Hashtable();
                ht = htbVIN();
                Hashtable htZM = new Hashtable();
                htZM = htbVIN_JQS();
                try
                {
                    for (int i = 0; i < vin.Length; i++)
                    {
                        if (sKYZF.IndexOf(vin.Substring(i, 1)) != -1)
                        {
                            blKYZF = true;
                            iJQS = iJQS + Convert.ToInt16(ht[vin.Substring(i, 1)]) * Convert.ToInt16(htZM[(i + 1)]);
                        }
                        else
                        {
                            blKYZF = false;
                            break;//发现不合法字符，直接退出循环                            
                        }
                    }
                    if (blKYZF)
                    {
                        intTemp = iJQS % 11;
                        if (intTemp == 10)
                            sJYW = "X";
                        else
                            sJYW = intTemp.ToString();
                        if (sJYW == vin.Substring(8, 1))
                            result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
                catch
                {
                    result = false;
                }
            }
            return result;
        }
       
        public static string GetWMI(string vin)
        {
            if (!String.IsNullOrEmpty(vin) && vin.Length >= 17)
            {
                return vin.Substring(0, 3);
            }
            return string.Empty;
        }
        public static string GetVDS(string vin)
        {
            if (!String.IsNullOrEmpty(vin) && vin.Length >= 17)
            {
                return vin.Substring(3, 5);
            }
            return string.Empty;
        }
        /// <summary>
        /// 装配厂
        /// </summary>
        /// <param name="vin"></param>
        /// <returns></returns>
        public static string GetMFBit(string vin)
        {
            if (!String.IsNullOrEmpty(vin) && vin.Length >= 17)
            {
                return vin.Substring(10, 1);
            }
            return string.Empty;
        }

        //根据Vin码获取年份
        public static string GetCarModelYear(string vin)
        {
            int Year = 2030;
            if (string.IsNullOrEmpty(vin))
            {
                return "";
            }
            string Y = vin.Substring(9, 1).ToUpper();
            switch (Y)
            {
                case "A":
                    Year = 2010;
                    break;
                case "B":
                    Year = 2011;
                    break;
                case "C":
                    Year = 2012;
                    break;
                case "D":
                    Year = 2013;
                    break;
                case "E":
                    Year = 2014;
                    break;
                case "F":
                    Year = 2015;
                    break;
                case "G":
                    Year = 2016;
                    break;
                case "H":
                    Year = 2017;
                    break;
                case "J":
                    Year = 2018;
                    break;
                case "K":
                    Year = 2019;
                    break;
                case "L":
                    Year = 2020;
                    break;
                case "M":
                    Year = 2021;
                    break;
                case "N":
                    Year = 2022;
                    break;
                case "P":
                    Year = 2023;
                    break;
                case "R":
                    Year = 2024;
                    break;
                case "S":
                    Year = 2025;
                    break;
                case "T":
                    Year = 2026;
                    break;
                case "V":
                    Year = 2027;
                    break;
                case "W":
                    Year = 2028;
                    break;
                case "X":
                    Year = 2029;
                    break;
                case "Y":
                    Year = 2030;
                    break;
                case "1":
                    Year = 2031;
                    break;
                case "2":
                    Year = 2032;
                    break;
                case "3":
                    Year = 2033;
                    break;
                case "4":
                    Year = 2034;
                    break;
                case "5":
                    Year = 2035;
                    break;
                case "6":
                    Year = 2036;
                    break;
                case "7":
                    Year = 2037;
                    break;
                case "8":
                    Year = 2038;
                    break;
                case "9":
                    Year = 2039;
                    break;
            }
            if (Year > DateTime.Now.Year)
            {
                Year = Year - 30;
            }
            return Year.ToString();
        }

    }
}
