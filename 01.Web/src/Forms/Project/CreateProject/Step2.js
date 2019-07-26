import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';

import Step2Form from './Step2Form';
import Step2FormAMD from './Step2FormAMD';

import { AMDPhase1, AMDPhase2, AMDPhase3, AMDPhase4, AMDPhase5 } from './Step2PhaseAMD';

import axios from 'axios';

import { Constants }  from '../../../Common/Constants';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;

class CreateProjectStep2 extends React.Component {
    state={
        templatePhases: [],
        isSaving: false,
        //department:[]
    }
    componentDidMount() {
        if(this.props.data["templateId"] === Constants.FixedTemplateId)
        {
            this.getAMDPhases();
        }
        else{
            this.getProjectPhases();
        }

        //this.getDepartmentList();
    }

    getAMDPhases()
    {
        let templatePhases = [];

        //立项阶段
        templatePhases.push({
            TemplatePhaseId: -1,
            Name: "立项",
            Remark: "立项",     
            PlannedEndTime: null,
            PlannedStartTime: null,
            DocListContentJson: null,
            LinkedFormContentJson: null,
            AMDContentJson: null
        })

        //采购备货阶段
        templatePhases.push({
            TemplatePhaseId: -1,
            Name: "采购备货",
            Remark: "采购备货",     
            PlannedEndTime: null,
            PlannedStartTime: null,
            DocListContentJson: null,
            LinkedFormContentJson: null,
            AMDContentJson: null
        })

        //实施阶段
        templatePhases.push({
            TemplatePhaseId: -1,
            Name: "实施",
            Remark: "实施",     
            PlannedEndTime: null,
            PlannedStartTime: null,
            DocListContentJson: null,
            LinkedFormContentJson: null,
            AMDContentJson: null
        })

        //测试阶段
        templatePhases.push({
            TemplatePhaseId: -1,
            Name: "测试",
            Remark: "测试",     
            PlannedEndTime: null,
            PlannedStartTime: null,
            DocListContentJson: null,
            LinkedFormContentJson: null,
            AMDContentJson: null
        })

        //验收&运维阶段
        templatePhases.push({
            TemplatePhaseId: -1,
            Name: "验收&运维",
            Remark: "验收&运维",     
            PlannedEndTime: null,
            PlannedStartTime: null,
            DocListContentJson: null,
            LinkedFormContentJson: null,
            AMDContentJson: null
        })

        this.setState({
            templatePhases
        });
    }

    getProjectPhases()
    {
        axios.get(`${Constants.APIBaseUrl}/TemplatePhase/GetTemplatePhaseList?templateId=${this.props.data["templateId"]}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
               // console.log("result=>", res);
                
                this.setState({
                    templatePhases: res.data.Data.ResultData
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    handleSubmit = e => {
        this.setState({
            isSaving: true
        })
       
        this.saveProject();
        // //保存AMD项目
        // if(this.props.data["templateId"] === Constants.FixedTemplateId)
        // {
            
        // }
        // else //保存其他项目
        // {

        // }
        
    };

    saveProject()
    {
        let body = {
            id: this.props.data["id"],
            Name: this.props.data["name"],
            ProjectType:this.props.data["projectTypeId"],
            TemplateId: this.props.data["templateId"],
            ApprovalStatus: this.props.data["approval"],
            BusinessDept: this.props.data["dept"],
            BizPerson: this.props.data["business"],
            StartTime: this.props.data["startDate"],
            EndTime: this.props.data["endDate"],
            ProjectBackground:this.props.data["background"],
            ProjectRequest:this.props.data["target"],
            ProjectBenefit:this.props.data["profit"],
            Deliverables:this.props.data["delivery"],
            ProjectOverall: this.props.data["lastStatusText"],
            ProjectScope:this.props.data["scope"],
            InScope:this.props.data["include"],
            OutScope: this.props.data["exclude"],
            SuccessCriteria:this.props.data["successCriteria"],
            ProjectResourcesCost: this.props.data["resourceCost"],
            ProjectSponsor: this.props.data["starter"],
            SteeringGroup:this.props.data["director"],
            ProjectManager: this.props.data["pm"],
            TeamMembers: this.props.data["teammember"],
            OutMembers: this.props.data["vendor"],
            MandaysCost: this.props.data["manday"],
            SoftwareCost: this.props.data["softCost"],
            HardwareCost: this.props.data["hardCost"],
            ProjectTotalCost: this.props.data["totalCost"],
            Comments: this.props.data["comment"],
            SignedCustomer: this.props.data["signedCustomer"],  //签约客户
            DataCenter: this.props.data["dataCenter"],          //数据中心
            Scope: this.props.data["scope"],                    //项目范围
            ProjectMembers: this.props.data["projectMembers"], //项目成员
            Duty: this.props.data["duty"],               //成员职责
            Risk: this.props.data["risk"],               //风险
            Statement: this.props.data["statement"],     //申明
            ApprovedAt: this.props.data["approvedAt"],   //立项时间
            PlanCheckAt: this.props.data["planCheckAt"], //计划验收时间
        };

        let that = this;

        axios.post(`${Constants.APIBaseUrl}/Project/SaveProject`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("save project result=>", res);

                let projectId = res.data.Data;

                this.savePhases(projectId);

                //this.setState({ current });
                this.setState({
                    isSaving: false
                })
            })
            .catch(function (error) {
                that.setState({
                    isSaving: false
                })
                notification.open({
                    message: '保存失败',
                    description:
                        '保存项目基本信息失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });
    }

    savePhases(projectId)
    {
        console.log("save project phase", this.state.templatePhases);
        if(!this.state.templatePhases || this.state.templatePhases.length === 0)
        {
            if (this.props.onNextStep) {
                this.props.onNextStep();
            }
        }

        let phases = [];

        let that = this;

        this.state.templatePhases.forEach(phase => {
            let fieldId = 'Id';
            let fieldName = 'Name';
            let fieldComment = 'Description'
            let hasDocListField = "HasDocList";
            let hasLinkedFormField = "HasLinkedForm";
            let docListField = "DocListJson";
            let linkedFormField = "LinkedFormJson";

            let body = {
                ProjectId: projectId,
                TemplatePhaseId: phase[fieldId],
                Name: phase[fieldName],
                Remark: phase[fieldComment],     
                PlannedEndTime: phase["PlannedEndTime"],
                PlannedStartTime: phase["PlannedStartTime"],
                DocListContentJson: phase[docListField],
                LinkedFormContentJson: phase[linkedFormField],
            }

            phases.push(body);

        })

        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/SaveProjectPhaseList`, phases, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("save phase result=>", res);
                if (this.props.onNextStep) {
                    this.props.onNextStep();
                }
            })
            .catch(function (error) {
                that.setState({
                    isSaving: false
                })
                notification.open({
                    message: '保存失败',
                    description:
                        '保存项目阶段',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });
    }

    preStep = e => {
        e.preventDefault();
        if (this.props.onPreStep) {          
            this.props.onPreStep();
      }
    }

    onPlannedEndTimeChange(date, phaseId)
    {
        //console.log("plannedEndTime date, phaseId", date, phaseId);

        let phases = this.state.templatePhases;
        let phase = phases.filter(p => p.Id == phaseId)[0];
        phase.PlannedEndTime = date;
    }

    onPlannedStartTimeChange(date, phaseId)
    {
        //console.log("plannedStartTime date, phaseId", date, phaseId);

        let phases = this.state.templatePhases;
        let phase = phases.filter(p => p.Id == phaseId)[0];
        phase.PlannedStartTime = date;
    }

    render() {
        //console.log(this.props.data);

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
     
        let orderNo = 1;
       
        let phases =
            this.props.data["templateId"] === Constants.FixedTemplateId ?
                [
                    <div key={1} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                        阶段1
                        <AMDPhase1></AMDPhase1>
                    </div>,
                    <div key={2} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                        阶段2
                        <AMDPhase2></AMDPhase2>
                    </div>,
                    <div key={3} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                        阶段3
                        <AMDPhase3></AMDPhase3>
                    </div>,
                    <div key={4} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                        阶段4
                        <AMDPhase4></AMDPhase4>
                    </div>,
                    <div key={5} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                        阶段5
                        <AMDPhase5></AMDPhase5>
                    </div>,
                ]
                : this.state.templatePhases.map(phase => {
                    return (
                        <div style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            阶段{orderNo++}
                            <TemplatePhaseItemForm data={phase} onPlannedEndTimeChange={this.onPlannedEndTimeChange.bind(this)}
                                onPlannedStartTimeChange={this.onPlannedStartTimeChange.bind(this)}></TemplatePhaseItemForm>
                        </div>
                    )
                });

        return (
            <Form {...formItemLayout} style={{ marginRight: "50px"}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                    {
                        this.props.data["templateId"] === Constants.FixedTemplateId?
                        <Step2FormAMD {...this.props}></Step2FormAMD> :
                        <Step2Form {...this.props}></Step2Form>
                    }
                    </TabPane>
                    <TabPane tab="项目阶段" key="2">
                        {phases}
                    </TabPane>
                </Tabs>
                <div style={{textAlign:'center'}}>
                    <Button style={{margin:'auto', marginTop:'10px', marginBottom:'10px', marginRight:'10px', width:'150px'}} onClick={
                        this.preStep.bind(this)
                    } loading={this.state.isSaving}>
                        上一步
                    </Button>
                    <Button style={{margin:'auto', marginTop:'10px', marginBottom:'10px', width:'150px'}} type="primary" onClick={this.handleSubmit.bind(this)} loading={this.state.isSaving}>
                        确认
                    </Button>
                </div>
                
            </Form>
        );
    }
}


const  docListColumns = [
    {
      title: '文件类型名',
      dataIndex: 'name',
      width: '30%',
    },
    {
      title: '描述',
      dataIndex: 'comment',
    },
    {
      title: '必要性',
      dataIndex: 'isRequired',
      editable: false,
      render: isRequired => (
        isRequired? <Checkbox disabled checked>必须</Checkbox> : <Checkbox disabled>必须</Checkbox>
      ),
    }
  ]

const linkedFormColumns = [
  {
    title: '序号',
    dataIndex: 'id',
    width: '10%',
  },
  {
    title: '类别',
    dataIndex: 'type',
    width: '25%',
  },
  {
    title: '表单名称',
    dataIndex: 'name',
    width: '45%',
    // render: (name) => (
    //     <a href="javascript:void(0)">{name}</a>
    //   )
  }
];

class TemplatePhaseItem extends React.Component {
    onPlannedEndTimeChange(date, dateStr)
    {
        if(this.props.onPlannedEndTimeChange)
        {
            this.props.onPlannedEndTimeChange(date, this.props.data["Id"]);
        }
    }

    onPlannedStartTimeChange(date, dateStr)
    {
        if(this.props.onPlannedStartTimeChange)
        {
            this.props.onPlannedStartTimeChange(date, this.props.data["Id"]);
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
     
        let fieldName = 'Name';
        let fieldComment = 'Description'
        let hasDocListField = "HasDocList";
        let hasLinkedFormField = "HasLinkedForm";
        let docListField = "DocListJson";
        let linkedFormField = "LinkedFormJson";

        let docListObj = JSON.parse(this.props.data[docListField]);
        let linkedFormObj = JSON.parse(this.props.data[linkedFormField]);

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                    <Form.Item label="项目阶段名称">
                       <span>{this.props.data[fieldName]}</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目阶段描述&nbsp;
                            </span>
                        }
                    >
                        <TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} disabled defaultValue={this.props.data[fieldComment]}>
                        </TextArea>
                    </Form.Item>
                    <Form.Item label="计划开始时间">
                        <DatePicker onChange={this.onPlannedStartTimeChange.bind(this)}></DatePicker>
                    </Form.Item>
                    <Form.Item label="计划结束时间">
                        <DatePicker onChange={this.onPlannedEndTimeChange.bind(this)}></DatePicker>
                    </Form.Item>
                    <Row gutter={8}>
                      <Col span={6}>                        
                              <span>
                                  必要内容&nbsp;
                              </span>                        
                      </Col>   
                      <Col span={6}>
                        <Form.Item>
                        {this.props.data[hasDocListField]? <Checkbox disabled checked>文档列表</Checkbox>:<Checkbox disabled>文档列表</Checkbox>}
                        </Form.Item>
                      </Col>   
                      <Col span={6}>
                      <Form.Item>
                          {this.props.data[hasLinkedFormField]? <Checkbox disabled checked>关联表单</Checkbox>:<Checkbox disabled>关联表单</Checkbox>}
                        </Form.Item>
                      </Col>   
                    </Row>                                        
                </Form>
                
                    {this.props.data[hasDocListField]? <Table style={{width:'100%'}} columns={docListColumns} dataSource={docListObj} pagination={false}>文档列表</Table>:null}
                    
                    {this.props.data[hasLinkedFormField]? <Table style={{width:'100%'}} columns={linkedFormColumns} dataSource={linkedFormObj} pagination={false}>关联表单</Table>:null}
            </div>
        );
    }
}

   
const TemplatePhaseItemForm = Form.create()(TemplatePhaseItem);


export default CreateProjectStep2;