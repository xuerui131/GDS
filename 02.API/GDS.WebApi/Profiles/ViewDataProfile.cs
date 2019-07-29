using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using GDS.Entity;
using GDS.WebApi.Models;

namespace GDS.WebApi.Profiles
{
    public class TemplatePhaseProfile : Profile
    {
        public TemplatePhaseProfile()
        {
            CreateMap<TemplatePhase, View_TemplatePhase>();

            CreateMap<View_TemplatePhase, TemplatePhase>();
        }
    }

    public class TemplatePhaseReqProfile : Profile
    {
        public TemplatePhaseReqProfile()
        {
            CreateMap<TemplatePhase, TemplatePhaseReq>();

            CreateMap<TemplatePhaseReq, TemplatePhase>();
        }
    }

    public class ProjectPreviewProfile : Profile
    {
        public ProjectPreviewProfile()
        {
            CreateMap<View_ProjectPreview, View_ProjectDetail>();

            CreateMap<View_ProjectDetail, View_ProjectPreview>();
        }
    }


}