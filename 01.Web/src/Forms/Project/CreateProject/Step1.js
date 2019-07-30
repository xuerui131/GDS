import React, { Component } from 'react';

import { Button, Modal, Form, Input, Select, DatePicker, AutoComplete , notification, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';
import { any } from 'prop-types';
import axios from 'axios';

import Step1Form from './Step1Form';

import Step1ContentForm from './Step1Form';

import { Constants } from '../../../Common/Constants';
import Step1FormAMD from './Step1FormAMD';

class CreateProjectStep1 extends React.Component {
    state = {
        //projectId: 0,
        isSavingDraft: false,
        selectedTemplateId: 0
    };

    componentWillReceiveProps(){
        if(this.props.data.id)
        {   
            this.setState({
                //projectId: this.props.data.id,
                selectedTemplateId: this.props.data.templateId
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                values.id = this.props.data.id;
                if (this.props.onNextStep) {
                    this.props.onNextStep(values);
                }
            }
        });
    };

    saveDraft = e => {
        e.preventDefault();
        var values = this.props.form.getFieldsValue();
        let body = {
            Id: this.props.data.id,
            NO: this.props.data.no,
            Name: values.name,
            ProjectType: values.projectTypeId,
            TemplateId: values.templateId,
            ApprovalStatus: values.approval,
            BusinessDept: values.dept,
            BizPerson: values.business,
            StartTime: values.startDate,
            EndTime: values.endDate,
            ProjectBackground: values.background,
            ProjectRequest: values.target,
            ProjectBenefit: values.profit,
            Deliverables: values.delivery,
            ProjectOverall: values.lastStatusText,
            ProjectScope: values.scope,
            InScope: values.include,
            OutScope: values.exclude,
            SuccessCriteria: values.successCriteria,
            ProjectResourcesCost: values.resourceCost,
            ProjectSponsor: values.starter,
            SteeringGroup: values.director,
            ProjectManager: values.pm,
            TeamMembers: values.teammember,
            OutMembers: values.vendor,
            MandaysCost: values.manday,
            SoftwareCost: values.softCost,
            HardwareCost: values.hardCost,
            ProjectTotalCost: values.totalCost,
            Comments: values.comment,
            SignedCustomer: values.signedCustomer,  //签约客户
            DataCenter: values.dataCenter,          //数据中心
            Scope: values.scope,                    //项目范围
            ProjectMembers: values.projectMembers, //项目成员
            Duty: values.duty,               //成员职责
            Risk: values.risk,               //风险
            Statement: values.statement,     //申明
            ApprovedAt: values.approvedAt,   //立项时间
            PlanCheckAt: values.planCheckAt, //计划验收时间
            ADM: values.adm
        };

        let that = this;

        axios.post(`${Constants.APIBaseUrl}/Project/SaveDraft`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                let projectId = res.data.Data;
               
                that.setState({
                    projectId,
                    isSavingDraft: false
                })

                notification.open({
                    message: '保存成功',
                    description:
                        '保存草稿成功',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            })
            .catch(function (error) {
                that.setState({
                    isSavingDraft: false
                })
                notification.open({
                    message: '保存失败',
                    description:
                        '保存草稿失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });                    
    }

    onTemplateChangeHandler(e)
    {
        if(!Number.isInteger(e))
            return;

        this.setState({
            selectedTemplateId: e
        })
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
      
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "50px" }}>
                    {
                        (this.props.data.templateId !== Constants.FixedTemplateId && this.state.selectedTemplateId !== Constants.FixedTemplateId)?
                        <Step1Form {...this.props} templateChangeHandler={this.onTemplateChangeHandler.bind(this)}></Step1Form> :
                        <Step1FormAMD {...this.props} templateChangeHandler={this.onTemplateChangeHandler.bind(this)}></Step1FormAMD> 
                    }
                    
                    <Row>
                        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Button style={{marginRight:'10px'}} loading={this.state.isSavingDraft} onClick={this.saveDraft.bind(this)}>
                                保存草稿
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const CreateProjectStep1Form = Form.create()(CreateProjectStep1);

export default CreateProjectStep1Form;