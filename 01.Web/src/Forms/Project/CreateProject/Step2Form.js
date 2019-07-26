import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';
import { any } from 'prop-types';

import axios from 'axios';

import { Constants }  from '../../../Common/Constants';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;

class Step2Form extends React.Component {
    state={
        // templatePhases: [],
        // isSaving: false,
        department:[]
    }
    componentDidMount() {
        // axios.get(`${Constants.APIBaseUrl}/TemplatePhase/GetTemplatePhaseList?templateId=${this.props.data["templateId"]}`, {
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(res => {
        //         console.log("result=>", res);
                
        //         this.setState({
        //             templatePhases: res.data.Data.ResultData
        //         });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         console.log("search fail");
        //     });

        this.getDepartmentList();
    }

    getDepartmentList(){
        axios.get(`${Constants.APIBaseUrl}/Department/GetAllDepartment`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let department = [];
            res.data.Data.map(item => {
                department.push({
                    key: item.Id,
                    name: item.Name,
                });
            })

            this.setState({
                department
            });
        })
    }

    render() {
        console.log(this.props.data);

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

        // let fullRowFormItemStyle={
        //     border: 'solid',
        //     height: '115px',         
        //     padding: '0 20px 0 0',
        //     borderColor: 'grey',
        //     borderWidth: '1px'
        // }

        // let fullRowShortFormItemStyle={
        //     border: 'solid',
        //     height: '65px',         
        //     padding: '0 20px 0 0',
        //     borderColor: 'grey',
        //     borderWidth: '1px'
        // }

        // let phases = this.state.templatePhases.map(phase =>(
        //     <TemplatePhaseItem data={phase}></TemplatePhaseItem>
        // ));

        // let orderNo = 1;
       
        // let phases = this.state.templatePhases.map(phase =>{
        //     return (
        //         <div style={{borderWidth:"1px", borderStyle:"solid", padding:"10px", margin:"10px"}}>
        //             阶段{orderNo++}
        //             <TemplatePhaseItemForm data={phase} onPlannedEndTimeChange={this.onPlannedEndTimeChange.bind(this)}
        //             onPlannedStartTimeChange={this.onPlannedStartTimeChange.bind(this)}></TemplatePhaseItemForm>
        //         </div>
        //     )
        // });

        let departmentOptions = this.state.department.map(p => <Option key={p.key} value={p.key}>{p.name}</Option>);

        return (
            // <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "50px"}}>
            //     <Tabs defaultActiveKey="1">
            //         <TabPane tab="基本信息" key="1">
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
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="部门">

                                        <Select disabled defaultValue={this.props.data["dept"]}>
                                         {departmentOptions}
                                            {/* <Option value="IT">IT</Option>
                                            <Option value="Marketing">Marketing</Option> */}
                                        </Select>

                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="业务负责人">
                                        <Input disabled defaultValue={this.props.data["business"]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="开始日期">
                                        <DatePicker disabled defaultValue={this.props.data["startDate"]} ></DatePicker>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="结束日期">
                                        <DatePicker disabled defaultValue={this.props.data["endDate"]}></DatePicker>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="项目背景说明">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["background"]}></TextArea>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目需求、目标">

                                        <TextArea disabled rows={4} defaultValue={this.props.data["target"]}></TextArea>

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="项目获益">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["profit"]}></TextArea>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label={<span><span>项目交付物/</span><span>关键目标</span></span>}>
                                        <TextArea disabled rows={4} defaultValue={this.props.data["delivery"]}></TextArea>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label={<span><span>截至报告日期最新项目状态。</span><br /><span>包括进度、问题、风险。</span></span>}>
                                        <TextArea disabled rows={4} defaultValue={this.props.data["lastStatusText"]} />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目范围">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["scope"]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="包括内容">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["include"]}></TextArea>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="不包括内容">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["exclude"]}></TextArea>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftTextAreaFormItemStyle}>
                                    <Form.Item label="成功标准">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["successCriteria"]} />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightTextAreaFormItemStyle}>
                                    <Form.Item label="项目资源成本">
                                        <TextArea disabled rows={4} defaultValue={this.props.data["resourceCost"]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="项目发起人">
                                        <Input disabled defaultValue={this.props.data["starter"]}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="指导小组">
                                        <Input disabled defaultValue={this.props.data["director"]}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="项目经理">
                                        <Input disabled defaultValue={this.props.data["pm"]}></Input>
                                    </Form.Item>
                                </Col>
                                {/* <Col span={12} style={rightFormItemStyle}>

                                </Col> */}
                                 <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="内部成员">
                                        <Input disabled defaultValue={this.props.data["teammember"]}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} style={leftFormItemStyle}>
                                    <Form.Item label="外部成员">
                                        <Input disabled defaultValue={this.props.data["vendor"]}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="人天单价">
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.props.data["manday"]}
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
                                            defaultValue={this.props.data["softCost"]}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="硬件成本">
                                        <InputNumber disabled style={{ width: "150px" }}
                                            defaultValue={this.props.data["hardCost"]}
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
                                            defaultValue={this.props.data["totalCost"]}
                                            formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\￥\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={rightFormItemStyle}>
                                    <Form.Item label="其他说明">
                                        <Input disabled defaultValue={this.props.data["comment"]}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>                            
                         </div>
            //         </TabPane>
            //         <TabPane tab="项目阶段" key="2">
            //             {phases}
            //         </TabPane>
            //     </Tabs>
            //     <div style={{textAlign:'center'}}>
            //         <Button style={{margin:'auto', marginTop:'10px', marginBottom:'10px', marginRight:'10px', width:'150px'}} onClick={
            //             this.preStep.bind(this)
            //         } loading={this.state.isSaving}>
            //             上一步
            //         </Button>
            //         <Button style={{margin:'auto', marginTop:'10px', marginBottom:'10px', width:'150px'}} type="primary" htmlType="submit" loading={this.state.isSaving}>
            //             确认
            //         </Button>
            //     </div>
                
            // </Form>
        );
    }
}

export default Step2Form;