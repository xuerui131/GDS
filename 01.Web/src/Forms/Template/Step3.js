import {
    Form,
    Input,
    Tooltip,
    Modal,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Table,
    Popconfirm
} from 'antd';

import React, { Component } from 'react';

import './Step2.css';

const { Option } = Select;
const { TextArea } = Input;

let id = 0;

const options = [
    { label: '文档列表', value: '1' },
    { label: '关联表单', value: '2' }
  ];

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

//const { Column } = Table;
export class Step3PhaseItem extends React.Component {
    
    // componentDidMount() {
    //     if (this.props.data) {
    //         console.log("props.data", this.props.data);
    //         this.props.form.setFieldsValue(
    //             this.props.data
    //         )

    //         // this.props.form.setFieldsValue({
    //         //     comment: this.props.data.comment
    //         // })

    //         // this.props.form.setFieldsValue({
    //         //     type: this.props.data.type
    //         // })
    //     }

    // }
    // state={
    //   content: '',
    //   visible: false
    // }
    // openModal(record) {
    //     this.setState({
    //         content: record.Content,
    //         visible: true
    //     })
    // }
    // handleCancel() {
    //     this.setState({
    //         visible: false
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
     
        let fieldName = 'name'+this.props.data.id;
        let fieldComment = 'comment'+this.props.data.id
        let hasDocListField = "hasDocList" +this.props.data.id;
        let hasLinkedFormField = "hasLinkedForm" +this.props.data.id;
        let docListField = "docList" +this.props.data.id;
        let linkedFormField = "linkedForm" +this.props.data.id;

        // console.log(this.props.data[linkedFormField]);
        // const { content , visible } = this.state
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
                        <TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} disabled value={this.props.data[fieldComment]}>
                        
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
                
                    {this.props.data[hasDocListField]? <Table style={{width:'100%'}} columns={docListColumns} dataSource={this.props.data[docListField]}>文档列表</Table>:null}
                    {this.props.data[hasLinkedFormField]? <Table style={{width:'100%'}} columns={linkedFormColumns} dataSource={this.props.data[linkedFormField]}>关联表单</Table>:null}

                    {/* {this.props.data[hasLinkedFormField]? <Table style={{width:'100%'}}  dataSource={this.props.data[linkedFormField]}>
                    <Column title="ID" dataIndex="Id" key="Id" />
                    <Column title="Name" dataIndex="Name" key="Name" />
                    <Column title="ProjectTypeName" dataIndex="ProjectTypeName" key="ProjectTypeName" />
                    <Column title="必要性" dataIndex="isRequired" editable="false" key="isRequired" render={
                      (value, record) => (
                        <Checkbox disabled checked={record.isRequired}>必须</Checkbox>
                      )
                    } />
                        <Column
                        title="Action"
                        key="Content"
                        render={(text, record) => (
                            <span>
                                <a href="javascript:;" onClick={() => { this.openModal(record) }}>预览</a>
                            </span>
                        
                        )}
                    />
                    </Table>:null} */}
                   
                {/* <div>
                    <ReadOnlyTable></ReadOnlyTable>
                    <div style={{ textAlign: "center" }}>
                        <Select defaultValue="86" style={{ width: 150 }} disabled>
                            <Option value="86">IT</Option>
                            <Option value="87">其他</Option>
                        </Select>
                        <Select defaultValue="86" style={{ width: 150 }} disabled>
                            <Option value="86">IT开发项目</Option>
                            <Option value="87">IT运维项目</Option>
                        </Select>
                    </div>
                </div> */}
                {/* <Modal
                title="表单预览"
                visible={visible}
                onCancel={()=>{ this.handleCancel()}}
                onOk={()=>{this.handleCancel()}}
            >
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </Modal> */}
            </div>
        );
    }
}

const columns = [
    {
      title: '文件类型名',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: '描述',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: '必要性',
      dataIndex: 'address',
      editable: false,
      render: address => (
        <Checkbox disabled>必须</Checkbox>
      ),
    }
  ];

  const dataSource= [
    {
      key: '0',
      name: 'RFP',
      age: '需求文档',
      address: true,
    },
  ];

class ReadOnlyTable extends React.Component {
    render(){
        return (
            <div>
              <Table
                dataSource={dataSource}
                columns={columns}
              />
            </div>
          );
    }
      
    
  }

const Step3PhaseItemForm = Form.create({ name: 'register' })(Step3PhaseItem);

class Step3 extends React.Component {
    state = {
        isLoading: false,
        phaseItems: []
    };

    componentDidMount() {
        console.log("step3 props data", this.props.data);
        let items = this.state.phaseItems;
        if(!this.props.data)
        {
          items.push({
            id:1,
            name1: '',
            comment1: ''
          });
          this.setState({
            phaseItems: items
          });
        }
        else
        {
          this.props.data.map(item => {
            let nameField = "name" +item.id;
            let commentField = "comment" +item.id;
            let hasDocListField = "hasDocList" +item.id;
            let hasLinkedFormField = "hasLinkedForm" +item.id;
            let docListField = "docList" +item.id;
            let linkedFormField = "linkedForm" +item.id;
  
            let itemObj = {};
            itemObj["id"] = item.id;
            itemObj[nameField] = item.name;
            itemObj[commentField] = item.comment;
            itemObj[hasDocListField] = item.hasDocList;
            itemObj[hasLinkedFormField] = item.hasLinkedForm;
            itemObj[docListField] = item.docList;
            itemObj[linkedFormField] = item.linkedForm;
  
            items.push(itemObj);
          });
  
          this.setState({
            phaseItems: items
          });
        }
       
      }

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             const { keys, names } = values;
    //             console.log('Received values of form: ', values);
    //             console.log('Merged values:', keys.map(key => names[key]));

    //             if(this.props.onNextStep)
    //             {
    //                 this.setState({
    //                     isLoading: true
    //                 })
    //                 this.props.onNextStep();
    //             }
    //         }
    //     });
    // };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 20 },
            },
          };
          const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
          };
          
          let orderNo = 1;
          const formItems = this.state.phaseItems.map((item) => (
            <div style={{borderWidth:"1px", borderStyle:"solid", padding:"10px", margin:"10px"}}>
               阶段{orderNo++}
                <Step3PhaseItemForm data={item}></Step3PhaseItemForm>
            </div>
          ));

        let height = window.innerHeight - 250;
        console.log(window.innerHeight);
        return (      
            <div style={{overflow:"auto",height:`${height}px`}}>
                <div>
                    {formItems}
                </div>
                <div>
                    <Button type="primary" loading={this.state.isLoading} onClick={() => {
                        if(this.props.onNextStep)
                        {
                          this.setState({
                              isLoading: true
                          })
                            this.props.onNextStep();
                        }
                    }}>
                        确认
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => {
                        if (this.props.onPreStep) {
                            this.props.onPreStep();
                        }
                    }}>
                        上一步
                    </Button>
                </div>
            </div>      
           
        );
    }
}

const TemplateStep3 = Form.create({ name: 'register' })(Step3);

   export default TemplateStep3;