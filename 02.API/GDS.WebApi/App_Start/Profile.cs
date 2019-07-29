using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using GDS.WebApi.Profiles;


namespace GDS.WebApi
{
    public class AutoMapperProfile
    {
        public static void Register()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<TemplatePhaseProfile>();

                cfg.AddProfile<TemplatePhaseReqProfile>();

                cfg.AddProfile<ProjectPreviewProfile>();
            });
        }
    }
}