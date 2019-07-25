import React, { Component } from 'react';

import { Steps, Modal, Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

import axios from 'axios';

import { Constants } from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

import TemplatePhaseItem from './ViewProjectPhaseItem';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search } = Input;
const { Step } = Steps;

export default class ViewProjectForm extends React.Component {
    state = {
        projectDetail: null,
        depts: [],
    }

    componentWillMount() {
        //写在这里的话，即使直接访问http://localhost:3000/#/project/view/7
        //也可以生效
        //如果写在componentDidMount里面，直接访问上述链接，会Render，但不会调用componentDidMount
        // let projectId = 0;
        // if (this.props.projectId) {
        //     projectId = parseInt(this.props.projId);
        // }

        // if(projectId === 0)
        // {
        //     return;
        // }

        this.setState({
            projectDetail: this.props.projectDetail
        })

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

        // axios.get(`${Constants.APIBaseUrl}/project/GetProjectById?id=${projectId}`, {
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(res => {
        //         this.setState({
        //             projectDetail: res.data.Data
        //         });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         console.log("search fail");
        //     });
    }

    componentDidMount() {

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
        
        let leftFormTopItemStyle = {
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftFormItemStyle = {
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftTextAreaFormItemStyle = {
            border: 'solid',
            height: '115px',
            borderRight: 'none',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormTopItemStyle = {
            border: 'solid',
            height: '65px',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormItemStyle = {
            border: 'solid',
            height: '65px',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightTextAreaFormItemStyle = {
            border: 'solid',
            height: '115px',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        // //此处的'phase'+orderNo作为锚点使用。点击顶部Steps的Title，可以导航到锚点
        // let orderNo = 1;
        // let phases = this.state.projectPhases.map(phase => (
        //     <div key={orderNo} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
        //         <div id={'phase' + orderNo}>阶段{orderNo++}
        //             <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span>
        //             <span style={{ marginLeft: '50px' }}>结束时间：{phase.EndTimeStr}</span>
        //         </div>
        //         <TemplatePhaseItem data={phase} afterCompletePhase={this.afterCompletePhase.bind(this)}></TemplatePhaseItem>
        //     </div>
        // ));

        let depts = this.state.depts.map(dept => {
            return <Option value={dept.Id}>{dept.Name}</Option>
        });
        return (
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
                                <Select disabled defaultValue={this.state.projectDetail.BusinessDept}>
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
                            <Form.Item label={<span><span>截至报告日期最新项目状态。</span><br /><span>包括进度、问题、风险。</span></span>}>
                                <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectOverall} />
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
                                <TextArea disabled rows={4} defaultValue={this.state.projectDetail.SuccessCriteria} />
                            </Form.Item>
                        </Col>
                        <Col span={12} style={rightTextAreaFormItemStyle}>
                            <Form.Item label="项目资源成本">
                                <TextArea disabled rows={4} defaultValue={this.state.projectDetail.ProjectResourcesCost} />
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
        );
    }
}
