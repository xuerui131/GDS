import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';
import { any } from 'prop-types';

import axios from 'axios';

import { Constants }  from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

import createHistory from 'history/createHashHistory';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;

const hashHistory = createHistory();

class ApproveProject extends React.Component {
    state={
        projectDetail: null,
        projectPhases: [],
        depts: [],
        isLoading: false
    }

    componentWillMount() {
        console.log("componentWillMount");
        console.log("params", this.props.match.params);

        //写在这里的话，即使直接访问http://localhost:3000/#/project/view/7
        //也可以生效
        //如果写在componentDidMount里面，直接访问上述链接，会Render，但不会调用componentDidMount
        let projectId = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.projId) {
            projectId = parseInt(this.props.match.params.projId);
        }

        axios.get(`${Constants.APIBaseUrl}/department/GetDepartmentList`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(depts => {
            console.log("depts", depts);
            this.setState({
                depts: depts.data.Data.ResultData
            });
        }).catch(function (error) {
            console.log(error);
            console.log("get dept failed");
        })

        axios.get(`${Constants.APIBaseUrl}/project/GetProjectById?id=${projectId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project detail=>", res);

                // let startTime = new Date(parseInt(res.data.Data.StartTime.replace("/Date(", "").replace(")/", ""), 10));
                // let year = startTime.getFullYear();//获取完整的年份(4位,1970-????)
                // var month = startTime.getMonth() + 1;//获取当前月份(0-11,0代表1月)
                // var day = startTime.getDate();//获取当前日(1-31)
                // if (month < 10) {
                //     month = "0" + month;
                // }
                // if (day < 10) {
                //     day = "0" + day;
                // }
                // var startTimeStr = year + "-" + month + "-" + day;
                // res.data.Data.StartTime = startTimeStr;

                // let endTime = new Date(parseInt(res.data.Data.EndTime.replace("/Date(", "").replace(")/", ""), 10));
                // year = endTime.getFullYear();//获取完整的年份(4位,1970-????)
                // month = endTime.getMonth() + 1;//获取当前月份(0-11,0代表1月)
                // day = endTime.getDate();//获取当前日(1-31)
                // if (month < 10) {
                //     month = "0" + month;
                // }
                // if (day < 10) {
                //     day = "0" + day;
                // }
                // var endTimeStr = year + "-" + month + "-" + day;
                // res.data.Data.EndTime = endTimeStr;

                this.setState({
                    projectDetail: res.data.Data
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });

        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/GetProjectPhaseList?projectId=${projectId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phases =>", res);

                this.setState({
                    projectPhases: res.data.Data.ResultData
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    componentDidMount() {
        
    }

    onApprove()
    {
        let projectId = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.projId) {
            projectId = parseInt(this.props.match.params.projId);
        }

        this.setState(
            {
                isLoading: true
            }
        )
        axios.get(`${Constants.APIBaseUrl}/Project/UpdateApprovalStatus?Id=${projectId}&Status=1`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState(
                    {
                        isLoading: false
                    }
                )

                hashHistory.push('/app/flow/list');
            })
            .catch(function (error) {
                this.setState(
                    {
                        isLoading: false
                    }
                )
            });
    }

    onReject()
    {
        let projectId = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.projId) {
            projectId = parseInt(this.props.match.params.projId);
        }

        this.setState(
            {
                isLoading: true
            }
        )

        axios.get(`${Constants.APIBaseUrl}/Project/UpdateApprovalStatus?Id=${projectId}&Status=2`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState(
                    {
                        isLoading: false
                    }
                )

                hashHistory.push('/app/flow/list');

            })
            .catch(function (error) {
                this.setState(
                    {
                        isLoading: true
                    }
                )
            });
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        let height = window.innerHeight - 250;

        let leftFormTopItemStyle={
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftFormItemStyle={
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            borderTop:'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftTextAreaFormItemStyle={
            border: 'solid',
            height: '115px',
            borderRight: 'none',
            borderTop:'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormTopItemStyle={
            border: 'solid',
            height: '65px',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormItemStyle={
            border: 'solid',
            height: '65px',
            borderTop:'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightTextAreaFormItemStyle={
            border: 'solid',
            height: '115px',
            borderTop:'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let fullRowFormItemStyle={
            border: 'solid',
            height: '115px',         
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let fullRowShortFormItemStyle={
            border: 'solid',
            height: '65px',         
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let orderNo = 1;
        let phases = this.state.projectPhases.map(phase => (
            <div style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                <div>阶段{orderNo++}
                    <span style={{marginLeft:'50px'}}>开始时间：{phase.StartTimeStr}</span>
                    <span style={{marginLeft:'50px'}}>结束时间：{phase.EndTimeStr}</span>
                </div>
                <TemplatePhaseItem data={phase}></TemplatePhaseItem>
            </div>

        ));

        let btnStartStyle = {width:'150px', marginRight:'25px', marginTop:'10px'}
        let depts = this.state.depts.map(dept=>{
           return <Option value={dept.Id}>{dept.Name}</Option>
        });
        return (
            this.state.projectDetail?
            <div>
            <Link to="/app/flow/list" style={{float:'right'}}>返回</Link>
            <Tabs defaultActiveKey="1">
                <TabPane tab="基本信息" key="1">
                    <div style={{ overflow: "auto", height: `${height}px` }}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "50px" }}>                    
                    <Row>
                                <Col span={12} style={leftFormTopItemStyle}>
                                    <Form.Item label="项目名称">
                                    <Input disabled defaultValue={this.state.projectDetail.Name} />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormTopItemStyle}>
                                    <Form.Item label="是否审批">
                                        <Radio.Group disabled defaultValue={this.state.projectDetail.ApprovalStatus}>
                                            <Radio value={1}>是</Radio>
                                            <Radio value={2}>否</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="部门">
                                            <Select disabled  defaultValue={this.state.projectDetail.BusinessDept}>
                                                {depts}
                                            </Select>
                                    
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="业务负责人">
                                        <Input disabled defaultValue={this.state.projectDetail.BizPerson} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="开始日期">
                                        <Input disabled defaultValue={this.state.projectDetail.StartTimeStr} ></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="结束日期">
                                            <Input disabled defaultValue={this.state.projectDetail.EndTimeStr}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="项目背景说明">                               
                                        <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectBackground}></TextArea>                              
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目需求、目标">
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectRequest}></TextArea>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="项目获益">                             
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectBenefit}></TextArea>                               
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label={<span><span>项目交付物/</span><span>关键目标</span></span>}>                             
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.Deliverables}></TextArea>                            
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label={<span><span>截至报告日期最新项目状态。</span><br/><span>包括进度、问题、风险。</span></span>}>                              
                                            <TextArea disabled rows={4}  defaultValue={this.state.projectDetail.ProjectOverall}/>                                
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目范围">                              
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectScope} />                                
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="包括内容">                              
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.InScope}></TextArea>                                
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="不包括内容">                               
                                            <TextArea disabled rows={4} defaultValue={this.state.projectDetail.OutScope}></TextArea>                             
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="成功标准">                              
                                            <TextArea disabled rows={4}  defaultValue={this.state.projectDetail.SuccessCriteria}/>                                
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目资源成本">                              
                                            <TextArea disabled rows={4}  defaultValue={this.state.projectDetail.ProjectResourcesCost}/>                                
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="项目发起人">
                                    <Input disabled defaultValue={this.state.projectDetail.ProjectSponsor}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="指导小组">                              
                                            <Input disabled defaultValue={this.state.projectDetail.SteeringGroup}></Input>                                
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="项目经理">
                                    <Input disabled defaultValue={this.state.projectDetail.ProjectManager}></Input>                            
                                    </Form.Item>
                                </Col>
                                {/* <Col span={12} style={rightFormItemStyle}>
                                
                                </Col> */}
                                <Col span={12} style={rightFormItemStyle}>
                                <Form.Item label="内部成员">
                                    <Input disabled defaultValue={this.state.projectDetail.TeamMembers}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="外部成员">                               
                                        <Input disabled defaultValue={this.state.projectDetail.OutMembers}></Input>                            
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="人天单价">                              
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.state.projectDetail.MandaysCost}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />                                
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="软件成本">
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.state.projectDetail.SoftwareCost}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="硬件成本">
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.state.projectDetail.HardwareCost}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="项目总成本">
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.state.projectDetail.ProjectTotalCost}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="其他说明">
                                        <Input disabled defaultValue={this.state.projectDetail.Remark}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </TabPane>
                <TabPane tab="项目阶段" key="2">
                    {phases}
                </TabPane>
            </Tabs>
                    <div style={{textAlign:'center'}}>
                    <Button loading={this.state.isLoading} style={btnStartStyle} onClick={this.onApprove.bind(this)} type="primary">同意</Button>
                    <Button loading={this.state.isLoading} style={btnStartStyle} onClick={this.onReject.bind(this)} >拒绝</Button>
                    </div>
            </div>
            : null
        );
    }
}


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

export class TemplatePhaseItem extends React.Component {
    state={
        isSaving: false,
        docListObj: null,
        linkedFormObj: null
    }
    componentDidMount() {
        let docListObj = JSON.parse(this.props.data[this.docListField]);
        let linkedFormObj = JSON.parse(this.props.data[this.linkedFormField]);
        
        this.setState({
            docListObj,linkedFormObj
        })
    }

    fieldPMApproval = 'pmApproval';
    fieldName = 'Name';
    fieldComment = 'Remark';
    fieldPlannedStartTime = 'PlannedStartTimeStr'
    fieldPlannedEndTime = 'PlannedEndTimeStr'
    hasDocListField = "HasDocList";
    hasLinkedFormField = "HasLinkedForm";
    docListField = "DocListContentJson";
    linkedFormField = "LinkedFormContentJson";
    statusField = "Status";

   

    docListColumns = [
        {
            title: '项目经理确认',
            dataIndex: 'pmApproval',
            width: '15%',
            render: (pmApproval, record) => {
                return  <Checkbox defaultChecked={record.pmApproval} disabled></Checkbox>
            },
        },
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
        },
        {
            title: '上传',
            dataIndex: 'upload',
            editable: true,
            render: (text, record) => (
                <span>上传文件</span>
            )            
          }
      ]

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

        console.log("planned start time", this.props.data[this.fieldPlannedStartTime]);
     
        return (
            <div>
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                    {/* <div>
                        {this.props.data[this.statusField] == 1?  <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{left:'80%'}} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[this.statusField] == 2?  <span style={{display:'block', textAlign:'right', color:'green', fontWeight:'bold'}}>已完成</span> : null}
                    </div> */}
                    <Form.Item label="项目阶段名称">
                       <span>{this.props.data[this.fieldName]}</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目阶段描述&nbsp;
                            </span>
                        }
                    >
                        <TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} disabled defaultValue={this.props.data[this.fieldComment]}>
                        </TextArea>
                    </Form.Item>
                    <Form.Item label="计划开始时间">
                        <span >{this.props.data[this.fieldPlannedStartTime]}</span>
                    </Form.Item>
                    <Form.Item label="计划结束时间">
                        <span >{this.props.data[this.fieldPlannedEndTime]}</span>
                    </Form.Item>
                    {/* <Row gutter={8}>
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
                    </Row> */}
                    
                </Form>
                
                    {this.props.data[this.docListField]? <Table style={{width:'100%'}} columns={this.docListColumns} dataSource={this.state.docListObj}>文档列表</Table>:null}
                    
                    {this.props.data[this.linkedFormField]? <Table style={{width:'100%'}} columns={linkedFormColumns} dataSource={this.state.linkedFormObj}>关联表单</Table>:null}
            </div>
        );
    }
}



export default ApproveProject;