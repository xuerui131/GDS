﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon
{
    public class HttpUploadFile
    {

        private Encoding encoding = System.Text.Encoding.GetEncoding("utf-8");

        public void SetEncoding(Encoding encoding)
        {
            this.encoding = encoding;
        }

        /// <summary>
        /// 文件服务上传方法
        /// </summary>
        /// <param name="serviceUrl">上传服务地址</param>
        /// <param name="moduleName">上传所使用的模块名称</param>
        /// <param name="fileName">文件名</param>
        /// <param name="filedata">文件的字符船</param>
        /// <returns></returns>
        public string UploadFile(string serviceUrl, string moduleName, string fileName, byte[] filedata)
        {
            using (MemoryStream allStream = new MemoryStream())
            {
                var httpReq = CreateHttpWebRequest(serviceUrl);
                Upload_Value("module", moduleName, allStream);
                Upload_File(filedata, fileName, "file1", allStream);
                //添加尾部的时间戳
                allStream.Write(GetBoundaryBytes(), 0, GetBoundaryBytes().Length);
                httpReq.ContentLength = allStream.Length;
                var postStream = httpReq.GetRequestStream();
                //每次上传4k 
                int bufferLength = 4096;
                byte[] buffer = new byte[bufferLength];
                long offset = 0;
                allStream.Position = 0;
                int size = allStream.Read(buffer, 0, bufferLength);
                while (size > 0)
                {
                    postStream.Write(buffer, 0, size);
                    offset += size;
                    size = allStream.Read(buffer, 0, bufferLength);
                }
                postStream.Close();
                //获取服务器端的响应 
                WebResponse webRespon = httpReq.GetResponse();
                Stream s = webRespon.GetResponseStream();

                byte[] hdata = new byte[1024];
                int rSize = 0;
                List<byte> zData = new List<byte>();
                while ((rSize = s.Read(hdata, 0, hdata.Length)) > 0)
                {
                    for (int i = 0; i < rSize; i++)
                    {
                        zData.Add(hdata[i]);
                    }
                }
                //读取服务器端返回的消息 
                String sReturnString = encoding.GetString(zData.ToArray());
                s.Close();
                return sReturnString;
            }
        }

        string strBoundary = "----------" + DateTime.Now.Ticks.ToString("x");

        //时间戳 
        byte[] GetBoundaryBytes()
        {
            return Encoding.ASCII.GetBytes("\r\n--" + strBoundary + "\r\n");
        }

        HttpWebRequest CreateHttpWebRequest(string address)
        {
            HttpWebRequest httpReq = (HttpWebRequest)WebRequest.Create(new Uri(address));
            httpReq.Method = "POST";
            //对发送的数据不使用缓存 
            httpReq.AllowWriteStreamBuffering = false;
            //设置获得响应的超时时间（300秒） 
            httpReq.Timeout = 300000;
            httpReq.ContentType = "multipart/form-data; boundary=" + strBoundary;
            return httpReq;
        }

        /// <summary> 
        /// 将本地文件上传到指定的服务器(HttpWebRequest方法) 
        /// </summary> 
        /// <param name="address">文件上传到的服务器</param> 
        /// <param name="fileNamePath">要上传的本地文件（全路径）</param> 
        /// <param name="saveName">文件上传后的名称</param> 
        /// <param name="progressBar">上传进度条</param> 
        /// <returns>成功返回1，失败返回0</returns> 
        private void Upload_File(byte[] data, string saveName, string name, Stream allStream)
        {
            // 要上传的文件 
            MemoryStream mstream = new MemoryStream(data);
            BinaryReader r = new BinaryReader(mstream);

            //请求头部信息 
            StringBuilder sb = new StringBuilder();
            sb.Append("--");
            sb.Append(strBoundary);
            sb.Append("\r\n");
            sb.Append("Content-Disposition: form-data; name=\"");
            sb.Append(name);
            sb.Append("\"; filename=\"");
            sb.Append(saveName);
            sb.Append("\"");
            sb.Append("\r\n");
            sb.Append("Content-Type: ");
            sb.Append("application/octet-stream");
            sb.Append("\r\n");
            sb.Append("\r\n");
            string strPostHeader = sb.ToString();
            byte[] postHeaderBytes = encoding.GetBytes(strPostHeader);
            // 根据uri创建HttpWebRequest对象 

            long length = mstream.Length + postHeaderBytes.Length + GetBoundaryBytes().Length;
            long fileLength = mstream.Length;

            try
            {
                //每次上传4k 
                int bufferLength = 4096;
                byte[] buffer = new byte[bufferLength];
                //已上传的字节数 
                long offset = 0;
                //开始上传时间 
                int size = r.Read(buffer, 0, bufferLength);
                //发送请求头部消息 
                allStream.Write(postHeaderBytes, 0, postHeaderBytes.Length);
                while (size > 0)
                {
                    allStream.Write(buffer, 0, size);
                    offset += size;
                    size = r.Read(buffer, 0, bufferLength);
                }
                var lineEnd = encoding.GetBytes(Environment.NewLine);
                allStream.Write(lineEnd, 0, lineEnd.Length);
            }
            catch
            {

            }
            finally
            {
                mstream.Close();
                r.Close();
            }
        }

        /// <summary> 
        /// 将本地文件上传到指定的服务器(HttpWebRequest方法) 
        /// </summary> 
        /// <param name="address">文件上传到的服务器</param> 
        /// <param name="fileNamePath">要上传的本地文件（全路径）</param> 
        /// <param name="saveName">文件上传后的名称</param> 
        /// <param name="progressBar">上传进度条</param> 
        /// <returns>成功返回1，失败返回0</returns> 
        private void Upload_Value(string name, string value, Stream allStream)
        {
            var data = encoding.GetBytes(value);
            MemoryStream mstream = new MemoryStream(data);
            BinaryReader r = new BinaryReader(mstream);
            //请求头部信息 
            StringBuilder sb = new StringBuilder();
            sb.Append("--");
            sb.Append(strBoundary);
            sb.Append("\r\n");
            sb.Append("Content-Disposition: form-data; name=\"");
            sb.Append(name);
            sb.Append("\"");
            sb.Append("\r\n");
            sb.Append("\r\n");
            string strPostHeader = sb.ToString();
            byte[] postHeaderBytes = Encoding.UTF8.GetBytes(strPostHeader);
            // 根据uri创建HttpWebRequest对象 

            long length = mstream.Length + postHeaderBytes.Length + GetBoundaryBytes().Length;
            long fileLength = mstream.Length;
            try
            {
                //每次上传4k 
                int bufferLength = 4096;
                byte[] buffer = new byte[bufferLength];
                //已上传的字节数 
                long offset = 0;
                //开始上传时间 
                DateTime startTime = DateTime.Now;
                int size = r.Read(buffer, 0, bufferLength);
                //发送请求头部消息 
                allStream.Write(postHeaderBytes, 0, postHeaderBytes.Length);
                while (size > 0)
                {
                    allStream.Write(buffer, 0, size);
                    offset += size;
                    size = r.Read(buffer, 0, bufferLength);
                }
                var lineEnd = encoding.GetBytes(Environment.NewLine);
                allStream.Write(lineEnd, 0, lineEnd.Length);

            }
            catch
            {

            }
            finally
            {
                mstream.Close();
                r.Close();
            }
        }
    }
}
