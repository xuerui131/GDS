import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';
import { any } from 'prop-types';

import axios from 'axios';

import { Constants }  from '../../../Common/Constants';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;

class Step2FormAMD extends React.Component {
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
        console.log(this.props.data);

        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };
        // const tailFormItemLayout = {
        //     wrapperCol: {
        //         xs: {
        //             span: 24,
        //             offset: 0,
        //         },
        //         sm: {
        //             span: 16,
        //             offset: 8,
        //         },
        //     },
        // };

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

        //let departmentOptions = this.state.department.map(p => <Option key={p.key} value={p.key}>{p.name}</Option>);

        return (
            <div style={{ overflow: "auto", height: `${height}px` }}>

                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="项目名称">
                            <Input disabled defaultValue={this.props.data["name"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="是否审批">
                            <Radio.Group disabled defaultValue={this.props.data["approval"]}>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="项目编号">
                            <Input disabled defaultValue={this.props.data["no"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="ADM">
                            <Input disabled defaultValue={this.props.data["adm"]} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="签约客户名称">
                            <Input disabled defaultValue={this.props.data["signedCustomer"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="数据中心">
                            <Input disabled defaultValue={this.props.data["dataCenter"]} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="项目范围简述">
                            <TextArea rows={4} disabled defaultValue={this.props.data["scope"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目成员">
                            <Input disabled defaultValue={this.props.data["projectMembers"]} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="岗位职责">
                            <Input disabled defaultValue={this.props.data["duty"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="项目风险">
                            <Input disabled defaultValue={this.props.data["risk"]} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="声明">
                            <Input disabled defaultValue={this.props.data["statement"]} />
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="立项时间">
                            <DatePicker disabled defaultValue={this.props.data["approvedAt"]}></DatePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="计划验收时间">
                            <DatePicker disabled defaultValue={this.props.data["planCheckAt"]}></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                       
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Step2FormAMD;