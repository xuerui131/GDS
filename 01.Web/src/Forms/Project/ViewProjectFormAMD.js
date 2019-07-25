import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';
import { any } from 'prop-types';

import axios from 'axios';

import { Constants }  from '../../Common/Constants';

import moment from "moment"

const { Option } = Select;
const { TextArea, Search  } = Input;

class ViewProjectFormAMD extends React.Component {
    state={
        department:[]
    }
    componentDidMount() {
        //this.getDepartmentList();
    }

    // getDepartmentList(){
    //     axios.get(`${Constants.APIBaseUrl}/Department/GetAllDepartment`, {
    //         headers: { 'Content-Type': 'application/json' }
    //     }).then(res => {
    //         if (!res || !res.data || !res.data.Data) {
    //             return;
    //         }
    //         let department = [];
    //         res.data.Data.map(item => {
    //             department.push({
    //                 key: item.Id,
    //                 name: item.Name,
    //             });
    //         })

    //         this.setState({
    //             department
    //         });
    //     })
    // }

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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "50px" }}>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="项目名称">
                            <Input disabled defaultValue={this.props.projectDetail.Name} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="是否审批">
                            <Radio.Group disabled defaultValue={this.props.projectDetail.ApprovalStatus}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="签约客户名称">
                            <Input disabled defaultValue={this.props.projectDetail.SignedCustomer} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="数据中心">
                            <Input disabled defaultValue={this.props.projectDetail.DataCenter} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="项目范围简述">
                            <TextArea rows={4} disabled defaultValue={this.props.projectDetail.Scope} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目成员">
                            <Input disabled defaultValue={this.props.projectDetail.ProjectMembers} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="岗位职责">
                        <Input disabled defaultValue={this.props.projectDetail.Duty} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="项目风险">
                            <Input disabled defaultValue={this.props.projectDetail.Risk} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="声明">
                        <Input disabled defaultValue={this.props.projectDetail.Statement} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="立项时间">
                            <DatePicker disabled defaultValue={this.props.projectDetail.ApprovedAtStr? moment(this.props.projectDetail.ApprovedAtStr) : null }></DatePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="计划验收时间">
                        <DatePicker disabled defaultValue={this.props.projectDetail.PlanCheckAtStr? moment(this.props.projectDetail.PlanCheckAtStr) : null } />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                    
                    </Col>
                </Row>
            </Form>

        );
    }
}

export default ViewProjectFormAMD;