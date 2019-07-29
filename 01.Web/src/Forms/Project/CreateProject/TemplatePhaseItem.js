import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';

import Step2Form from './Step2Form';
import Step2FormAMD from './Step2FormAMD';

import { AMDPhase1, AMDPhase2, AMDPhase3, AMDPhase4, AMDPhase5 } from './Step2PhaseAMD';

import axios from 'axios';

import { Constants }  from '../../../Common/Constants';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;

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

class TemplatePhaseItem extends React.Component {
    onPlannedEndTimeChange(date, dateStr)
    {
        if(this.props.onPlannedEndTimeChange)
        {
            this.props.onPlannedEndTimeChange(date, this.props.data["Id"]);
        }
    }

    onPlannedStartTimeChange(date, dateStr)
    {
        if(this.props.onPlannedStartTimeChange)
        {
            this.props.onPlannedStartTimeChange(date, this.props.data["Id"]);
        }
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
     
        let fieldName = 'Name';
        let fieldComment = 'Description'
        let hasDocListField = "HasDocList";
        let hasLinkedFormField = "HasLinkedForm";
        let docListField = "DocListJson";
        let linkedFormField = "LinkedFormJson";

        let docListObj = JSON.parse(this.props.data[docListField]);
        let linkedFormObj = JSON.parse(this.props.data[linkedFormField]);

        const { getFieldDecorator } = this.props.form;

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
                    <Form.Item label="计划开始时间">
                        <DatePicker onChange={this.onPlannedStartTimeChange.bind(this)}></DatePicker>
                    </Form.Item>
                    <Form.Item label="计划结束时间">
                        <DatePicker onChange={this.onPlannedEndTimeChange.bind(this)}></DatePicker>
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
                
                    {this.props.data[hasDocListField]? <Table style={{width:'100%'}} columns={docListColumns} dataSource={docListObj} pagination={false}>文档列表</Table>:null}
                    
                    {this.props.data[hasLinkedFormField]? <Table style={{width:'100%'}} columns={linkedFormColumns} dataSource={linkedFormObj} pagination={false}>关联表单</Table>:null}
            </div>
        );
    }
}

   
const TemplatePhaseItemForm = Form.create()(TemplatePhaseItem);

export default TemplatePhaseItemForm;