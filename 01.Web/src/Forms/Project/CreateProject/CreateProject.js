import React, { Component } from 'react';
import { useStore } from "../../../Store/useStore";

import { Button, message, Form, Input, Select, DatePicker, Upload, Icon, Steps  } from 'antd';

import CreateProjectStep1Form from './Step1';
import CreateProjectStep2 from './Step2';
import CreateProjectStep3 from './Step3';

import axios from 'axios';
import { Constants } from '../../../Common/Constants';

import moment from "moment"

const { Option } = Select;
const { TextArea, Search  } = Input;
const { Step } = Steps;


// export const CreateProjectHOC = props => {
//     const {
//         state
//     } = useStore();

//     console.log("state", state);
//     return (
//         <CreateProjectForm token={state.user.token} {...props}></CreateProjectForm>
//     )
// }

class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            step1Content: null,
        };
    }

    componentWillMount(){
        let draftId = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.draftId) {
            draftId = parseInt(this.props.match.params.draftId);
        }
        if(draftId !== 0)
        {
            this.getDraft(draftId);
        }
    }

    getDraft(draftId)
    {
        axios.get(`${Constants.APIBaseUrl}/project/GetProjectById?id=${draftId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project detail=>", res);
                let content = {
                    id: res.data.Data.Id,
                    no: res.data.Data.No,
                    name: res.data.Data.Name,
                    projectTypeId: res.data.Data.ProjectType,
                    templateId: res.data.Data.TemplateId,
                    approval: res.data.Data.ApprovalStatus,
                    dept: res.data.Data.BusinessDept,
                    business: res.data.Data.BizPerson,
                    startDate: res.data.Data.StartTimeStr? moment(res.data.Data.StartTimeStr): null,
                    endDate: res.data.Data.EndTimeStr? moment(res.data.Data.EndTimeStr): null,
                    background: res.data.Data.ProjectBackground,
                    target: res.data.Data.ProjectRequest,
                    profit: res.data.Data.ProjectBenefit,
                    delivery: res.data.Data.Deliverables,
                    lastStatusText: res.data.Data.ProjectOverall,
                    scope: res.data.Data.ProjectScope? res.data.Data.ProjectScope : res.data.Data.Scope, //项目范围
                    include: res.data.Data.InScope,
                    exclude: res.data.Data.OutScope,
                    successCriteria: res.data.Data.SuccessCriteria,
                    resourceCost: res.data.Data.ProjectResourcesCost,
                    starter: res.data.Data.ProjectSponsor,
                    director: res.data.Data.SteeringGroup,
                    pm: res.data.Data.ProjectManager,
                    teammember: res.data.Data.TeamMembers,
                    vendor: res.data.Data.OutMembers,
                    manday: res.data.Data.MandaysCost,
                    softCost: res.data.Data.SoftwareCost,
                    hardCost: res.data.Data.HardwareCost,
                    totalCost: res.data.Data.ProjectTotalCost,
                    comment: res.data.Data.Comments,
                    signedCustomer: res.data.Data.SignedCustomer,//签约客户
                    dataCenter: res.data.Data.DataCenter,//数据中心
                    projectMembers: res.data.Data.ProjectMembers,//项目成员
                    duty: res.data.Data.Duty,//成员职责
                    risk: res.data.Data.Risk,//风险
                    statement: res.data.Data.Statement,//声明
                    approvedAt: res.data.Data.ApprovedAtStr? moment(res.data.Data.ApprovedAtStr): null,//立项时间
                    planCheckAt: res.data.Data.PlanCheckAtStr? moment(res.data.Data.PlanCheckAtStr): null, //计划验收时间
                    adm: res.data.Data.ADM
                };
                
                this.setState({
                    step1Content: content
                });
            })
            .catch(function (error) {
                console.log("get draft error", error);
            });

    }

    next(stepContent) {
        const current = this.state.current + 1;
        
        if(current == 1)
        {
            this.setState({
                step1Content: stepContent
            })
        }

        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const steps = [
            {
              title: '创建项目',
              content: <CreateProjectStep1Form data={this.state.step1Content? this.state.step1Content : {}} onNextStep={this.next.bind(this)}></CreateProjectStep1Form>,
            },
            {
              title: '预览',
              content: <CreateProjectStep2 data={this.state.step1Content} onNextStep={this.next.bind(this)} onPreStep={this.prev.bind(this)}></CreateProjectStep2>,
            },
            {
                title: '完成',
                content: <CreateProjectStep3 data={this.state.step1Content}></CreateProjectStep3>,
              }
          ];

          const { current } = this.state;
          return (
              <div>
                  <Steps current={current} style={{width:"80%"}}>
                      {steps.map(item => (
                          <Step key={item.title} title={item.title} />
                      ))}
                  </Steps>
                  <div className="steps-content">{steps[current].content}</div>
              </div>
          );
    }
}

const CreateProjectForm = Form.create()(CreateProject);

export default CreateProjectForm;