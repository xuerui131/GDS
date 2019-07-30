import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

import { Constants } from '../../../Common/Constants';

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

//仅用于新建项目时预览模板
//第一阶段
export class ReadOnlyProjectAMDPhase1 extends React.Component {
    render() {
        return (
            <div>
                <Form {...formItemLayout}>
                     <Form.Item label="项目阶段名称">
                        <span>立项</span>
                    </Form.Item>
                    <Form.Item label="项目进度计划">
                      <span>上传</span>
                    </Form.Item>
                    <Form.Item label="项目实施方案">
                    <span>上传</span>
                    </Form.Item>
                    <Form.Item label="场地规划图">
                        <span>上传</span>
                    </Form.Item>
                </Form>
               
            </div>
        );
    }
}

//第二阶段
export class ReadOnlyProjectAMDPhase2 extends React.Component {
    render() {
        return (
            <Form {...formItemLayout}>                    
                     <Form.Item label="项目阶段名称">
                        <span>采购备货</span>
                    </Form.Item>
                    <Form.Item label="采购发起时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="预计到货时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="实际到货时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="采购文件">
                        <span>上传</span>
                    </Form.Item>
            </Form>          
        );
    }
}

//阶段三
export class ReadOnlyProjectAMDPhase3 extends React.Component {
    render() {      
        return (
            <Form {...formItemLayout}>                 
                     <Form.Item label="项目阶段名称">
                        <span>实施</span>
                    </Form.Item>
                    <Form.Item label="实施开始时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="实施完成时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="附件">
                        <span>上传</span>
                    </Form.Item>
            </Form>          
        );
    }
}

export class ReadOnlyProjectAMDPhase4 extends React.Component {
    render() {
        return (
            <Form {...formItemLayout}>
                     <Form.Item label="项目阶段名称">
                        <span>测试</span>
                    </Form.Item>
                    <Form.Item label="测试完成时间">
                        <DatePicker disabled></DatePicker>
                    </Form.Item>
                    <Form.Item label="附件">
                        <span>上传</span>
                    </Form.Item>
            </Form>          
        );
    }
}

export class ReadOnlyProjectAMDPhase5 extends React.Component {
    render() {
        return (
            <Form {...formItemLayout}>
                <Form.Item label="项目阶段名称">
                    <span>验收&amp;转运维</span>
                </Form.Item>
                <Row>
                    <Col span={8} style={leftFormTopItemStyle}>
                        <Form.Item label="实际验收时间">
                            <DatePicker disabled></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormTopItemStyle}>
                        <Form.Item label="计费开始时间">
                            <DatePicker disabled></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormTopItemStyle}>
                        <Form.Item label="计费结束时间">
                            <DatePicker disabled></DatePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="是否整栋楼客户">
                            <Radio.Group disabled value={1}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group> 
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                       
                    </Col>
                </Row>
                <Row>
                    <Col span={8} style={leftFormItemStyle}>
                        <Form.Item label="机房">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormItemStyle}>
                        <Form.Item label="机柜数">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormItemStyle}>
                        <Form.Item label="机柜号">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 配电 - 开始*/}
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>配电</div>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="供电可靠性">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="供冷可靠性：">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="UPS时间：">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="UPS冗余：">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="发电机组：">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                 {/* 配电 - 结束*/}


                  {/* 空调 - 开始*/}
                  <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>空调</div>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="空调标准">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="空调冗余">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 空调 - 结束*/}


                {/* 机房环境 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>机房环境</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>温度</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上限">
                            <Input disabled /> 
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="下限">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更多">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>湿度</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上限">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="下限">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更多">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>更多</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="电磁屏蔽">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="粉尘">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="流明">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="文字">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 机房环境 - 结束*/}

                 {/* 消防 - 开始*/}
                 <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>消防</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>系统</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="FM200">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>侦测</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="常规报警系统">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="控制系统">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 消防 - 结束*/}

                {/* 变更管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>变更管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="提前通知时间">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="一般变更窗口">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="响应时间">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 变更管理 - 结束*/}

                {/* 事件管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>事件管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="响应时间">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 事件管理 - 结束*/}

                {/* 服务报告 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>服务报告</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="是否需要">
                            <Radio.Group disabled value={1}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="标准模板">
                            <Radio.Group disabled value={1}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="提交方式">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 服务报告 - 结束*/}

                 {/* 资产管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>资产管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="资产管理">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 资产管理 - 结束*/}

                {/* IT巡检 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>IT巡检</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="IT巡检">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* IT巡检 - 结束*/}

                {/* IT服务 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>IT服务</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}>标准服务</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="设备开关机">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="设备重启">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="插拔线路">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="状态查看">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}>定制服务</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="厂商现场陪同">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上下架">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="综合布线">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="介质磁带">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="备件存放">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="代收代发">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更换配件">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* IT服务 - 结束*/}

                 {/* 门禁/机柜锁管理 - 开始*/}
                 <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>门禁/机柜锁管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="授权范围">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 门禁/机柜锁管理 - 结束*/}

                {/* CCTV - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>CCTV</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="公共区域">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="机房区域">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域存储模式">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* CCTV - 结束*/}


                {/* 门禁系统 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>门禁系统</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="记录保存时间">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>                                
                {/* 门禁系统 - 结束*/}


                {/* 资产归属 - 结束*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>资产归属</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="机柜">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="PDU">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="门禁系统">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="CCTV">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="IT设备">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 资产归属 - 结束*/}


                {/* 其他 - 结束*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>其他</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="合约罚款">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="总包电量">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="空置机柜数">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="最少保底机柜数">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="GDS承诺供电">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="合约PUE">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="超电单价">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="空置单价">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="最早进入保底时间">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="GDS供电上线">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 其他 - 结束*/}
            </Form>           
        );
    }
}

const canCompletePhase = () =>
    {
        if(localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

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

const leftFormTopItemStyle = {
    border: 'solid',
    height: '65px',
    borderRight: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const leftFormItemStyle = {
    border: 'solid',
    height: '65px',
    borderRight: 'none',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const leftTextAreaFormItemStyle = {
    border: 'solid',
    height: '115px',
    borderRight: 'none',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightTextAreaFormItemStyle = {
    border: 'solid',
    height: '115px',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightFormTopItemStyle = {
    border: 'solid',
    height: '65px',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightFormItemStyle = {
    border: 'solid',
    height: '65px',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}