import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';
import { any } from 'prop-types';

import axios from 'axios';

import { Constants }  from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;


class ViewTemplate extends React.Component {
    state={
        templatePhases: [],
        projectTypeList: [],
        templateInfo: {}
    }
    componentDidMount() {
        axios.get(`${Constants.APIBaseUrl}/TemplatePhase/GetTemplatePhaseList?templateId=${this.props.match.params.templateId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("result=>", res);
                
                this.setState({
                    templatePhases: res.data.Data.ResultData
                });
            })
            .catch(function (error) {
                console.log(error);
            });

            
        axios.get(`${Constants.APIBaseUrl}/ProjectType/GetProjectTypeList`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({
                    projectTypeList: res.data.Data.ResultData
                })

                this.getTemplateInfo();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getTemplateInfo()
    {
        axios.get(`${Constants.APIBaseUrl}/Template/GetTemplateById?Id=${this.props.match.params.templateId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("result=>", res);

                this.setState({
                    templateInfo: res.data.Data
                });
            })
            .catch(function (error) {
                console.log(error);
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
        
        let orderNo = 1;
       
        let phases = this.state.templatePhases.map(phase =>{
            return (
                <div style={{borderWidth:"1px", borderStyle:"solid", padding:"10px", margin:"10px"}}>
                    阶段{orderNo++}
                    <TemplatePhaseItem data={phase}></TemplatePhaseItem>
                </div>
            )
        });

        let projectTypes = this.state.projectTypeList.map(pt => (
            <Option value={pt.Id}>{pt.Name}</Option>
        ));

        console.log("this.state.templateInfo.Name", this.state.templateInfo.Name);
        return (
            <div>
                <Link to="/app/template/list" style={{float:'right'}}>返回</Link>
                 <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                        <div style={{ overflow: "auto", height: `${height}px` }}>
                        <Form {...formItemLayout} style={{marginRight:"200px"}}>
                            <Form.Item label="项目模板名称">
                               <Input disabled value={this.state.templateInfo.Name} />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span>
                                        项目模板备注&nbsp;
                                    </span>
                                }
                            >
                               <TextArea disabled rows={4} autosize={{minRows:4, maxRows:10}} value={this.state.templateInfo.Description} />
                            </Form.Item>
                            <Form.Item label="所属类别名称">
                                <Select disabled style={{ width: 300 }} value={this.state.templateInfo.ProjectType}> 
                                    {projectTypes}
                                </Select>
                            </Form.Item>
                        </Form>
                        </div>
                    </TabPane>
                    <TabPane tab="项目阶段" key="2">
                        {phases}
                    </TabPane>
                </Tabs>
            </div>
           
            
        );
    }
}


const  docListColumns = [
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
    }
  ]

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
     
        let fieldName = 'Name';
        let fieldComment = 'Description'
        let hasDocListField = "HasDocList";
        let hasLinkedFormField = "HasLinkedForm";
        let docListField = "DocListJson";
        let linkedFormField = "LinkedFormJson";

        let docListObj = JSON.parse(this.props.data[docListField]);
        let linkedFormObj = JSON.parse(this.props.data[linkedFormField]);

        return (
            <div>
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                    <Form.Item label="项目阶段名称">
                       <span>{this.props.data[fieldName]}</span>
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                项目阶段描述&nbsp;
                            </span>
                        }
                    >
                        <TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} disabled defaultValue={this.props.data[fieldComment]}>
                        </TextArea>
                    </Form.Item>
                    <Row gutter={8}>
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
                    </Row>
                    
                </Form>
                
                    {this.props.data[hasDocListField]? <Table style={{width:'100%'}} columns={docListColumns} dataSource={docListObj}>文档列表</Table>:null}
                    
                    {this.props.data[hasLinkedFormField]? <Table style={{width:'100%'}} columns={linkedFormColumns} dataSource={linkedFormObj}>关联表单</Table>:null}
            </div>
        );
    }
}



export default ViewTemplate;