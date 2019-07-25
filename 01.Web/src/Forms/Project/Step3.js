import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import { Button, message, Form, Input, Select, DatePicker, Upload, Icon, Steps, Modal  } from 'antd';

import  TemplateStep3, { Step3PhaseItem }  from '../Template/Step3';

import createHistory from 'history/createHashHistory';

const { Option } = Select;
const { TextArea, Search  } = Input;

class CreateProjectStep3 extends React.Component {
    constructor(props) {
        super(props);
      
        console.log(props);
        this.gotoProjectList.bind(this);
      }

    gotoProjectList = ()=>{

        const hashHistory = createHistory();

        hashHistory.push("/app/project/list");
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
        return (
            <div style={{ overflow: "auto", height: `${height}px` }}>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginRight: "200px" }}>
                    <Form.Item label="项目名称">
                       <span>{this.props.data["name"]}</span>
                    </Form.Item>
                    {/* <Form.Item
                        label={
                            <span>
                                项目描述&nbsp;
                        </span>
                        }
                    >
                        <span>GDS门户网站</span>
                    </Form.Item> */}
                </Form>
                <div style={{textAlign:"center"}}>
                <span>创建成功，您可前往<a href="javascript:void(0)" onClick={this.gotoProjectList.bind(this)}>项目列表</a>查看更多信息</span>
                </div>
                
            </div>
            
        );
    }
}

const CreateProjectStep3Form = Form.create()(CreateProjectStep3);

export default CreateProjectStep3Form;