using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;


namespace GDS.Comon
{
    /// <summary>
    /// 验证码生成
    /// </summary>
    public class VerifyCode
    {
        //生成验证码
        public string GenVerifyCode(HttpContextBase context)
        {
            string checkCode = this.CreateRandomCode(4).ToLower();
            this.CreateImage(context, checkCode);

            return checkCode;
        }

        /// <summary>
        /// 按位生成随机
        /// </summary>
        /// <param name="codeCount"></param>
        /// <returns></returns>
        private string CreateRandomCode(int codeCount)
        {
            int number;
            string checkCode = String.Empty;
            Random random = new Random();
            for (int i = 0; i < codeCount; i++)
            {
                number = random.Next(100);
                switch (number % 3)
                {
                    case 0:
                        checkCode += ((char)('0' + (char)(number % 10))).ToString();
                        break;
                    case 1:
                        checkCode += ((char)('a' + (char)(number % 26))).ToString();
                        break;
                    case 2:
                        checkCode += ((char)('A' + (char)(number % 26))).ToString();
                        break;
                    default:
                        break;
                }
            }
            return checkCode;
        }

        /// <summary>
        /// 根据字符生成图片
        /// </summary>
        /// <param name="context"></param>
        /// <param name="checkCode"></param>
        private void CreateImage(HttpContextBase context, string checkCode)
        {
            int randAngle = 45;//随机转动角度
            int iwidth = (int)(checkCode.Length * 20);
            //封装GDI+ 位图，此位图由图形图像及其属性的像素数据组成，指定的宽度和高度。以像素为单位
            System.Drawing.Bitmap image = new System.Drawing.Bitmap(iwidth, 38);

            //封装一个　GDI+绘图图面。无法继承此类。从指定的Image创建新的 Graphics
            Graphics g = Graphics.FromImage(image);

            //清除整个绘图面并以指定背景填充
            g.Clear(Color.AliceBlue);

            //画一个边框
            //g.DrawRectangle(new Pen(Color.LightGray, 0), 0, 0, image.Width - 1, image.Height - 1);

            //定义绘制直线和曲线的对象。（只是Pen的颜色，指示此Pen的宽度的值）
            Pen blackPen = new Pen(Color.LightGray, 0);

            Random rand = new Random();

            //划横线的条数 可以根据自己的要求      

            for (int i = 0; i < 50; i++)
            {
                //随机高度
                //int y = rand.Next(image.Height);
                /*绘制一条连线由坐标对指定的两个点的线条
                 线条颜色、宽度和样式，第一个点的x坐标和y坐标，第二个点的x坐标和y坐标*/
                //g.DrawLine(blackPen, 0, y, image.Width, y);
                int x = rand.Next(0, image.Width);
                int y = rand.Next(0, image.Height);
                //画矩形，坐标（x,y）宽高(1,1)
                g.DrawRectangle(blackPen, x, y, 1, 1);
            }

            //拆散字符串成单个字符数组
            char[] chars = checkCode.ToCharArray();

            //文字居中
            StringFormat format = new StringFormat(StringFormatFlags.NoClip);
            format.Alignment = StringAlignment.Center;
            format.LineAlignment = StringAlignment.Center;

            //定义颜色
            Color[] c = { Color.Black, Color.DarkGray, Color.DarkOrange, Color.Red, Color.DarkBlue, Color.Green, Color.Orange, Color.Brown, Color.DarkCyan, Color.Purple };
            //定义字体
            string[] font = { "Verdana", "Microsoft Sans Serif", "Comic Sans MS", "Arial", "宋体", "Arial Baltic" };

            for (int i = 0; i < chars.Length; i++)
            {
                int cindex = rand.Next(c.Length);
                int findex = rand.Next(font.Length);

                //font　封装在特定设备上呈现特定字体所需的纹理和资源（字体，大小，字体样式）
                Font f = new System.Drawing.Font(font[findex], 16, System.Drawing.FontStyle.Bold);

                /*Brush定义用于填充图形图像（如矩形、椭圆、圆形、多边形和封闭路径）的内部对象
                SolidBrush(Color.White)初始化指定的颜色　指定画笔颜色为白色*/
                Brush b = new System.Drawing.SolidBrush(c[cindex]);

                Point dot = new Point(16, 19);

                //转动的度数
                float angle = rand.Next(-randAngle, randAngle);

                //移动光标到指定位置
                g.TranslateTransform(dot.X, dot.Y);
                g.RotateTransform(angle);
                /*在指定的位置并且用指定的Brush和Font对象绘制指定的文本字符串
               （指定的字符串，字符串的文本格式，绘制文本颜色和纹理，所绘制文本的左上角的x坐标，坐标）*/
                g.DrawString(chars[i].ToString(), f, b, 1, 1, format);
                //转回去
                g.RotateTransform(-angle);
                //移动光标指定位置
                g.TranslateTransform(2, -dot.Y);
            }
            //创建存储区为内存流
            System.IO.MemoryStream ms = new System.IO.MemoryStream();

            //将此图像以指定的格式保存到指定的流中（将其保存在内存流中，图像的格式）
            image.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);

            //清除缓冲区将流中的内容输出
            context.Response.ClearContent();

            //获取输出流的类型
            context.Response.ContentType = "image/jpeg";

            //将二进制字符串写入HTTP输出流
            context.Response.BinaryWrite(ms.ToArray());

            g.Dispose();

            image.Dispose();
        }
    }
}
