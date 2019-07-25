import React, { Component } from 'react';

import { Button, message, Form, Input, Select, DatePicker, Upload, Icon, Steps, Modal  } from 'antd';

import  TemplateStep3, { Step3PhaseItem }  from '../Template/Step3';

const { Option } = Select;
const { TextArea, Search  } = Input;

class FlowPreview extends React.Component {
    state = { 
        projectPreviewVisible: false,
        phaseItems: [{
            id: 1,
            name: '',
            desc: '',
            docListRequired: false,
            docLinkRequired: false
        },{
            id: 2,
            name: '',
            desc: '',
            docListRequired: false,
            docLinkRequired: false
        }] };

        handleSubmit = e => {
            e.preventDefault();
           
            if(this.props.onNextStep)
            {
                this.props.onNextStep();
            }
        };

    // showModal = () => {
    //     this.setState({
    //         projectPreviewVisible: true,
    //     });
    //   };
    
    //   hideModal = () => {
    //     this.setState({
    //         projectPreviewVisible: false,
    //     });
    //   };

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

        const formItems = this.state.phaseItems.map((item) => (
            <div style={{borderWidth:"1px", borderStyle:"solid", padding:"10px", margin:"10px", width:"100%"}}>
            阶段{item.id}
                <Step3PhaseItem></Step3PhaseItem>
            </div>
        ));

        let height = window.innerHeight - 250;
        return (
            <div style={{ overflow: "auto", height: `${height}px` }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "200px" }}>
                    <Form.Item label="项目名称">
                       <span>GDS开发项目</span>
                    </Form.Item>
                    <Form.Item label="项目编号">
                        <span>GDS-2019-01</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目描述&nbsp;
                        </span>
                        }
                    >
                        <span>GDS门户网站</span>
                    </Form.Item>
                    <Form.Item label="项目模板">
                            <span>IT - IT DEV Project</span>
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;<Button type="primary" onClick={this.showModal}>预览</Button> */}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目经理&nbsp;
                        </span>
                        }
                    >
                       <span>Samuel Wu</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目开始时间&nbsp;
                        </span>
                        }
                    >
                        <span>2019-6-19</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目结束时间&nbsp;
                        </span>
                        }
                    >
                      <span>2019-7-19</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                供应商&nbsp;
                        </span>
                        }
                    >
                       <span>上海攀迅信息技术有限公司</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                附件&nbsp;
                        </span>
                        }
                    >
                        <div>
                            <Icon type="file"></Icon> 附件1.xlsx
                        </div>
                        <div>
                            <Icon type="file"></Icon> 附件2.xlsx
                        </div>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                只读权限&nbsp;
                        </span>
                        }
                    >
                       <span>Dego Xia</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                编辑权限&nbsp;
                        </span>
                        }
                    >
                       <span>Samuel Wu</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                备注说明&nbsp;
                        </span>
                        }
                    >
                        <span>此为效果展示</span>
                    </Form.Item>
                    {/* <Form.Item {...tailFormItemLayout}>
                    { formItems }
                    </Form.Item>
                    
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            确认
                    </Button>
                    </Form.Item> */}
                </Form>
                <div style={{width:"80%", margin:"auto"}}>
                    { formItems }
                </div>
               
                {/* <Modal width={800}
                    // title="Modal"
                    visible={this.state.projectPreviewVisible}
                    footer = {[
                        // <Button key="back" onClick={this.handleCancel}>
                        // Return
                        // </Button>,
                        <Button key="submit" type="primary" onClick={this.hideModal}>
                        关闭
                        </Button>,
                    ]}
                    //onOk={this.hideModal}
                    // onCancel={this.hideModal}
                    //okText="关闭"
                    // cancelText="取消"
                    >
                    { formItems }
                </Modal> */}
            </div>
            
        );
    }
}

const FlowPreviewForm = Form.create()(FlowPreview);

export default FlowPreviewForm;