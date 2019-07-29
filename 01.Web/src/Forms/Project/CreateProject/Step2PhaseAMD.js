import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

export class AMDPhase1 extends React.Component {
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
                <Form.Item label="项目阶段名称">
                    <span>立项</span>
                </Form.Item>
                <Form.Item label="*项目计划进度">
                    <span>上传</span>
                </Form.Item>
                <Form.Item label="*项目实施方案">
                    <span>上传</span>
                </Form.Item>
                <Form.Item label="*场地规划图">
                    <span>上传</span>
                </Form.Item>
            </div>
        );
    }
}


export class AMDPhase2 extends React.Component {
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
                <Form.Item label="项目阶段名称">
                    <span>采购备货</span>
                </Form.Item>
                <Form.Item label="采购发起时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="预计到货时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="实际到货时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="附件">
                    <span>上传</span>
                </Form.Item>
            </div>
        );
    }
}


export class AMDPhase3 extends React.Component {
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
                <Form.Item label="项目阶段名称">
                    <span>实施</span>
                </Form.Item>
                <Form.Item label="实施开始时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="实施结束时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="附件">
                    <span>上传</span>
                </Form.Item>
            </div>
        );
    }
}

export class AMDPhase4 extends React.Component {
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
                <Form.Item label="项目阶段名称">
                    <span>测试</span>
                </Form.Item>
                <Form.Item label="测试完成时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="附件">
                    <span>上传</span>
                </Form.Item>
            </div>
        );
    }
}

export class AMDPhase5 extends React.Component {
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
                <Form.Item label="项目阶段名称">
                    <span>验收&amp;转运维</span>
                </Form.Item>
                <Form.Item label="客户实际时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="项目计费开始时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="项目计费结束时间">
                    <span></span>
                </Form.Item>
                <Form.Item label="是否整栋楼客户">
                    <span></span>
                </Form.Item>
                <Form.Item label="机房，机柜数，机柜号">
                    <span></span>
                </Form.Item>
                <Form.Item label="SLA ，运营，现场服务，场地现状，其他">
                    <span></span>
                </Form.Item>
                <Form.Item label="附件">
                    <span>项目验收报告；实际场地规划图；入场须知</span>
                </Form.Item>
            </div>
        );
    }
}