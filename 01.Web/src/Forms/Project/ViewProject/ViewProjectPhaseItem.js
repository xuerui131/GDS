import React, { Component } from 'react';

import { Modal, Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox,Radio, Table, InputNumber  } from 'antd';

import axios from 'axios';

import { Constants }  from '../../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

import { createForm } from "rc-form";

import ViewProjectPhaseTask from './ViewProjectPhaseTask';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search  } = Input;


class DocUpload extends React.Component {
    state = {
      fileList: [
        // {
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'http://www.baidu.com/xxx.png',
        // },
      ],
    };

    componentDidMount()
    {
        if(this.props.record && this.props.record.fileList)
        {
            let index = 0
            let files = this.props.record.fileList.map(file => ({
                uid:index++,
                name: file.name,
                status:'done',
                url: file.url
            }));

            this.setState({
                fileList:files
            })
        }
    }

    handleChange = info => {

        let allDone = true; //是否有文件都处于完成状态

      let fileList = [...info.fileList];

      console.log(info);

      // 1.限制上传文件
      //fileList = fileList.slice(-1);

      // 2. 读取返回数据
      fileList = fileList.map(file => {
        if(file.status !== 'done')
        {
            allDone = false;
        }

        if (file.response) {
          // Component will show file.url as link
          console.log(file.response)
          file.url = file.response.Data;
          
        }
        return file;
      });

      console.log("allDone",allDone);
        this.setState({ fileList }, () => {
            if (fileList && allDone){//fileList.length > 0 && fileList[0].url) {
                if (this.props.afterUpload) {
                    this.props.afterUpload(this.props.record, this.state.fileList);
                }
            }
        });
    };

    render() {
      //  console.log("upload", this.props.record)
      const props = {
        action:  `${Constants.APIBaseUrl}/Home/UploadFile`,//'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        multiple: false,
      };

      if(this.props.status == 0) //未开始
      {
        return (
            <span>上传文件</span>
          );
      }

      if(this.props.status == 2) //已完成
      {
        if(this.props.record && this.props.record.fileList)
        {            
            return(
                <div>
                    {this.props.record.fileList.map(file => (
                        <a href={file.url} target="_blank" style={{display:'block'}}>{file.name}</a>)
                    )}
                </div>
            );
            
        }
        else
        {
            return(
                <span>无上传文件</span>
                );
        }
      }
      
      //进行中
      return (
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> 上传文件
          </Button>
        </Upload>
      );
    }
  }

class ViewProjectPhaseItem extends React.Component {
    state={
        isSaving: false,
        docListObj: null,
        linkedFormObj: null,
        isFormModalVisible: false,
        formContentObj: [], //将要填写的表单，由一系列的Lable、Input组成
        formId: 0, //将要填写的表单ID
        isFormReviewModalVisible: false,
        formReviewContentObj: {}
        //formItems: []
    }
    componentDidMount() {
        let docListObj = JSON.parse(this.props.data[this.docListField]);
        let linkedFormObj = JSON.parse(this.props.data[this.linkedFormField]);
        
        this.setState({
            docListObj,linkedFormObj
        })
    }

    fieldPMApproval = 'pmApproval';
    fieldName = 'Name';
    fieldComment = 'Remark';
    fieldPlannedStartTime = 'PlannedStartTimeStr'
    fieldPlannedEndTime = 'PlannedEndTimeStr'
    hasDocListField = "HasDocList";
    hasLinkedFormField = "HasLinkedForm";
    docListField = "DocListContentJson";
    linkedFormField = "LinkedFormContentJson";
    statusField = "Status";

    docListColumns = [
        {
            title: '项目经理确认',
            dataIndex: 'pmApproval',
            width: '15%',
            render: (pmApproval, record) => {
                //console.log("pmApproval",record.pmApproval);
                //仅在状态为1（进行中）时处于可编辑状态
                return  this.props.data.Status == 1?
                <Checkbox defaultChecked={record.pmApproval} disabled={!this.canPMApprove()} onChange={()=>{
                    console.log("on pm approve change")
                this.onPMApprove(record)}}></Checkbox>
                : <Checkbox defaultChecked={record.pmApproval} disabled></Checkbox>
            },
        },
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
        },
        {
            title: '上传',
            dataIndex: 'upload',
            editable: true,
            render: (text, record) => (
                <DocUpload status={this.props.data.Status} record={record} afterUpload={this.afterUploadHandler.bind(this)}></DocUpload>
            )            
          }
      ]

    linkedFormColumns = [
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
        ,
        {
          title: '操作',
          dataIndex: 'action',
          width: '20%',
          render:(text, record) => (
            <span className="action">
              {this.props.data.Status == 1?
              <span className="canClick" onClick={() => this.openModal(record)}>填写</span>:
              <soan>填写</soan>}        
            </span>
          ),
        }
      ];

      expandedRowRender = (record) => {
          if(!record.subData)
          { 
            return null;
          }
        const columns = [
          { title: '创建人', dataIndex: 'createdBy', key: 'createdBy' },
          { title: '创建日期', dataIndex: 'createdAt', key: 'createdAt' },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, subRecord) => {
            return  <span className="action">
                <span className="canClick" onClick={() => this.openReviewModal(subRecord)}>查看</span>              
              </span>
            }
          },
        ];
    
        // const data = [];
        // for (let i = 0; i < 3; ++i) {
        //   data.push({
        //     key: i,
        //     date: '2014-12-24 23:12:00',
        //     name: 'This is production name',
        //     upgradeNum: 'Upgraded: 56',
        //   });
        // }
        return <Table columns={columns} dataSource={record.subData} pagination={false} />;
      };
    
    afterUploadHandler(record, fileList) {
        console.log(record, fileList);

        if(fileList && Array.isArray(fileList) && fileList.length > 0)
        {
            let uploadedFileList = fileList.map(file => ({name:file.name, url: file.url})); //fileList[0].name;
            //let urlList = fileList.map(file => file.url); //fileList[0].url;
            let key = record.key;

            if(this.state.docListObj && Array.isArray(this.state.docListObj))
            {
                let tempDocList = this.state.docListObj;
                tempDocList.forEach(doc=>{
                    if(doc.key === key)
                    {
                        doc.fileList = uploadedFileList;
                        //doc.urlList = urlList;
                    }
                });

                this.setState({
                    docListObj: tempDocList
                }, ()=>{
                    console.log(this.state.docListObj);
                    let docListJson = JSON.stringify(this.state.docListObj);
                    axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateDocList?projectPhaseId=${this.props.data.Id}&docListJson=${docListJson}`, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                           
                        })
                        .catch(function (error) {
                            console.log(error);
                            console.log("上传失败");
                            notification.open({
                                message: '信息错误',
                                description:
                                  '上传附件失败',
                                onClick: () => {
                                  //console.log('Notification Clicked!');
                                },
                                duration: 3
                              });
            
                            return;
                        });
                    
                })
            }
        }
    }

    onPMApprove = (record) =>
    {
        console.log("onPMApprove", record);
        // if(!record.pmApproval)
        // {
        //     record.pmApproval = true;
        // }
        // else
        // {
        //     record.pmApproval = false;
        // }

        if(this.state.docListObj && Array.isArray(this.state.docListObj))
        {
            let newDocListObj = [];
            this.state.docListObj.forEach(doc=>{
                if(doc.key == record.key)
                {
                    doc.pmApproval = record.pmApproval? false : true; //这里要反过来
                }
                newDocListObj.push(doc);
            });

            this.setState({
                docListObj: newDocListObj
            }, ()=>{
                console.log(this.state.docListObj);
                let docListJson = JSON.stringify(this.state.docListObj);
                axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateDocList?projectPhaseId=${this.props.data.Id}&docListJson=${docListJson}`, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => {
                      
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("阶段更新失败");
                   
                    });
                
            })
        }

    }

    completePhase(){
        console.log(this.state.docListObj);
        if(this.state.docListObj && Array.isArray(this.state.docListObj))
        {
            if(this.state.docListObj.filter(doc => {
               return (!doc.pmApproval && doc.isRequired)
            }).length > 0)
            {
                notification.open({
                    message: '信息错误',
                    description:
                      '项目经理需要确认所有必要的文档',
                    onClick: () => {
                      //console.log('Notification Clicked!');
                    },
                    duration: 3
                  });

                return;
            }
        }

        this.setState({
            isSaving:true
        })
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);
                this.setState({
                    isSaving:false
                })

                if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                this.setState({
                    isSaving:false
                })
            });
    }

    canCompletePhase()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    
    canPMApprove()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    openModal(record) {
        console.log("record",record);
        let contentObj = JSON.parse(record.content);

        if(!contentObj)
        {
            return;
        }

        this.setState({
                formContentObj: contentObj,
                formId: record.id,
                isFormModalVisible: true
        })
    }

    openReviewModal(record)
    {
        console.log("record",record);
        //let contentObj = JSON.parse(record);

        if(!record || !record.formDefinition)
        {
            return;
        }

        //将值赋到模板定义中
        record.formDefinition.forEach(form => {
            let id = form.input.id;

            if(record.formData[id])
            {
                form.input.initialValue = record.formData[id];
            }
        })
     
        this.setState({
            formReviewContentObj: record,
            
        }, ()=>{
            this.setState(
                {
                    isFormReviewModalVisible: true
                }
            )
        })
    }

    //保存填写之后的表单
    saveForm() 
    {
        this.props.form.validateFields((err, values) => {
          if(err)
          {
              console.log(err);
          }

          console.log(values);

            let linkedFormObj = this.state.linkedFormObj;

            let form = linkedFormObj.filter(f => f.id === this.state.formId)[0];

            if(!form.subData)
            {
                form.subData = [];
            }
            
            var today = new Date();
            var todayStr = today.getFullYear()+"-" + (today.getMonth()+1) + "-" + today.getDate();

            form.subData.push({
                createdBy: localStorage[Constants.UserNameLabel],
                createdAt: todayStr,
                formDefinition: this.state.formContentObj,
                formData: values
            });

            console.log("linkedFormObj", linkedFormObj);

            this.setState({
               linkedFormObj: linkedFormObj
            }, ()=>{
                console.log(this.state.linkedFormObj);
                let linkedFormJson = JSON.stringify(this.state.linkedFormObj);
                let body = {
                    projectPhaseId: this.props.data.Id,
                    linkedFormJson: linkedFormJson
                }
                axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateLinkedForm`, 
                body,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => {
                      
                    })
                    .catch(function (error) {
                        console.log(error);
                        console.log("阶段关联表单失败");
                    });
            });
        });

        this.setState({
            isFormModalVisible: false
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

        let count = 0;

        const { getFieldProps } = this.props.form;

        let formItems = this.state.formContentObj.map(
            item => {
                let field1 = React.createElement(
                  item.label.type,
                  {
                  style: item.label.style},
                  item.label.name
                  );
      
                let input1 = React.createElement(
                  item.input.type,
                  {
                    style: item.input.style,
                    ...getFieldProps(item.input.id,{
                      rules:[{
                            required:true,
                            //message: `请输入${item.input.name}`
                        }],
                      initialValue:item.input.initialValue
                    }),
                  },
                  null
                  );
      
                return <div key={"div"+count++}>
                  {field1} {input1}
                </div>
            }
          );

        count = 0;
        let formReviewItems = this.state.formReviewContentObj.formDefinition? this.state.formReviewContentObj.formDefinition.map(
            item => {
                let field1 = React.createElement(
                  item.label.type,
                  {
                  style: item.label.style},
                  item.label.name
                  );
      
                let input1 = React.createElement(
                  item.input.type,
                  {
                    style: item.input.style,
                    value: item.input.initialValue,
                    readOnly: 'readonly'
                  },
                  null
                  );
      
                return <div key={"div"+count++}>
                  {field1} {input1}
                </div>
            }
          ): null;
     
        return (
            <div>
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                    <div>
                        {this.props.data[this.statusField] == 1?  <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{left:'80%'}} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[this.statusField] == 2?  <span style={{display:'block', textAlign:'right', color:'green', fontWeight:'bold'}}>已完成</span> : null}
                    </div>
                    <Form.Item label="项目阶段名称">
                       <span>{this.props.data[this.fieldName]}</span>
                    </Form.Item>
                    
                    <Form.Item
                        label={
                            <span>
                                项目阶段描述&nbsp;
                            </span>
                        }
                    >
                    
                        <TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} disabled defaultValue={this.props.data[this.fieldComment]}>
                        </TextArea>
                    </Form.Item>
                    <Form.Item label="计划开始时间">
                        <span >{this.props.data[this.fieldPlannedStartTime]}</span>
                    </Form.Item>
                    <Form.Item label="计划结束时间">
                        <span >{this.props.data[this.fieldPlannedEndTime]}</span>
                    </Form.Item>
                    {/* <Row gutter={8}>
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
                    </Row> */}
                    
                </Form>
                
                    {this.props.data[this.docListField]? 
                    <Table style={{width:'100%'}} pagination={false}
                    columns={this.docListColumns} dataSource={this.state.docListObj}>文档列表</Table>
                    :null}
                    
                    {this.props.data[this.linkedFormField]? 
                        <Table style={{width:'100%'}} pagination={false} expandedRowRender={this.expandedRowRender}
                        columns={this.linkedFormColumns} dataSource={this.state.linkedFormObj}>关联表单</Table>
                    :null}

                    <hr />
                    <ViewProjectPhaseTask data={this.props.data.TaskJson} inProgress={this.props.data[this.statusField] === Constants.InProgress}></ViewProjectPhaseTask>

                <Modal
                    title="表单预览"
                    visible={this.state.isFormModalVisible}
                    closable={false}
                    footer={
                    <div>
                        <Button onClick={this.saveForm.bind(this)} type="primary" style={{marginRight:'10px'}}>提交</Button>
                        <Button type="primary" onClick={()=>{
                            this.setState({
                                isFormModalVisible: false
                            });
                        }}>关闭</Button>
                    </div>
                    }
                    //onCancel={()=>{ this.handleCancel()}}
                    //onOk={()=>{this.CloseModal()}}
                >
                    {formItems}
                </Modal>
                <Modal
                    title="表单内容"
                    visible={this.state.isFormReviewModalVisible}
                    closable={false}
                    footer={
                    <div>
                        <Button type="primary" onClick={()=>{
                            this.setState({
                                isFormReviewModalVisible: false
                            });
                        }}>关闭</Button>
                    </div>
                    }
                    //onCancel={()=>{ this.handleCancel()}}
                    //onOk={()=>{this.CloseModal()}}
                >
                    {formReviewItems}
                </Modal>
            </div>
        );
    }
}

export default createForm()(ViewProjectPhaseItem);