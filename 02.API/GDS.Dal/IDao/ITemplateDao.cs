﻿using GDS.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GDS.Dal
{

    public interface ITemplateDao<T> : IDaoBase<T> where T : class
    {
        List<Template> GetDataByName(string Name);

        View_Template GetView_TemplateByTemplateId(int TemplateId);
    }
}