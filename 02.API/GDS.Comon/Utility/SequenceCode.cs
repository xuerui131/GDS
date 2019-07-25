using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Comon.Utility
{
    //用来生成题号
    //根据给定的id生成八位的字符串，
    //统一前缀L
    //题目前缀LQ
    //单词前缀LW
    //句子前缀LS
    //段落前缀LP
    public class SequenceCode
    {
        //单词序号
        public static string SequenceWord(int id)
        {
            return Sequence("LW", id);
        }

        //句子序号
        public static string SequenceSentence(int id)
        {
            return Sequence("LS", id);
        }

        //段落序号
        public static string SequenceParagraph(int id)
        {
            return Sequence("LP", id);
        }

        //问题序号
        public static string SequenceQuestion( int id)
        {
            return Sequence("LQ", id);
        }

        //文章序号
        public static string SequenceArticle(int id)
        {
            return Sequence("LA", id);
        }

        //文章详情序号
        public static string SequenceArticleDetail(int id)
        {
            return Sequence("LS", id);
        }

        //对话序号
        public static string SequenceDialogue(int id)
        {
            return Sequence("LD", id);
        }

        //对话详情序号
        public static string SequenceDialogueDetail(int id)
        {
            return Sequence("LS", id);
        }

        //公告序号
        public static string SequenceNews(int id)
        {
            return Sequence("LN", id);
        }

        //banner序号
        public static string SequenceBanner(int id)
        {
            return Sequence("LB", id);
        }

        public static string Sequence(string prefix, int id)
        { 
            //将id转换为十六进制，6位，不足左补零  0xffffff
            //支持的最大值16777215

            if (id > 16777215)
            {
                throw new NotImplementedException();
            }

            return prefix + id.ToString("X6");
        }
    }
}
