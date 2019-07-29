
import React, { Component } from 'react';
import { notification, Button, Modal, Form, Table, Input, AutoComplete, DatePicker, Select } from 'antd';

import { Constants } from '../../../Common/Constants';

import moment from 'moment';

import axios from 'axios';

const { Option } = Select;

const taskStatus = [
    '未开始',
    '进行中',
    '已完成',
    '已取消',
    '搁置'
]
   
const { TextArea, Search } = Input;



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


class ViewProjectPhaseTask extends React.Component {
    state={
        dataSource: [],
        isAddTaskModalVisible: false,
        allUsers: [],
        subjects: [],

        isEditTaskModalVisible: false,
        editRecord: {}
    }

    componentDidMount()
    {
        if(this.props.data)
        {
            let dataSource = JSON.parse(this.props.data)
            this.setState({
                dataSource
            })
        }

        this.getAllUsers();
        this.getTaskSubjectList();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data)
        {
            let dataSource = JSON.parse(nextProps.data)
            this.setState({
                dataSource
            })
        }
    }

    getTaskSubjectList()
    {
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/GetTaskSubjectList`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
          
            this.setState({
                subjects:res.data.Data
            });
        })
    }

    getAllUsers() {
        axios.get(`${Constants.APIBaseUrl}/Users/GetAllUsers`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let users = [];
            res.data.Data.forEach(user => {
                users.push(user.Name)
            })
            this.setState({
                allUsers:users
            });
        })
    }

    canAddTask(){
        if((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
        && this.props.inProgress)
        {
            return true;
        }

        return false;
    }

    handleAddTask()
    {
        let that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let id = 1;
                if(that.state.dataSource && that.state.dataSource.length>0)
                {
                    id = that.state.dataSource[that.state.dataSource.length - 1].id + 1;
                }

                let task = {
                    id: id,
                    subject: values.subject,
                    description: values.description,
                    //detail: values.detail,
                    owner: values.owner,
                    status: taskStatus[0]
                }

                let tasks = this.state.dataSource;
                tasks.push(task);

                let body = {
                    projectPhaseId: this.props.projectPhaseId,
                    newTask: true,
                    task: { id: id, status: taskStatus[0], ...values }
                }
               
                axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateTask`, body, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => {
                        that.setState({ 
                            isAddTaskModalVisible: false,
                            dataSource: tasks
                        });

                        if(this.props.afterSaveTask)
                        {
                            this.props.afterSaveTask(JSON.stringify(tasks));
                        }
                    })
                    .catch(function (error) {
                        that.setState({
                            isSavingDraft: false
                        })
                        notification.open({
                            message: '保存失败',
                            description:
                                '保存任务失败',
                            onClick: () => {
                                //console.log('Notification Clicked!');
                            },
                            duration: 3
                        });
                    });        

               
            }
        });
    }

    handleEditTask() {
        let that = this;

        let tasks = this.state.dataSource;
        let editTask = tasks.filter(t => t.id === this.state.editRecord.id)[0];

        editTask.log = this.state.editRecord.log;
        editTask.startTime = this.state.editRecord.startTime;
        editTask.endTime = this.state.editRecord.endTime;
        editTask.updateTime = this.state.editRecord.updateTime;
        editTask.status = this.state.editRecord.status;
        editTask.workaround = this.state.editRecord.workaround;

        this.setState({
            dataSource: tasks
        });

        let body = {
            projectPhaseId: this.props.projectPhaseId,
            newTask: false,
            task: { ...this.state.editRecord }
        }

        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateTask`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                that.setState({
                    isEditTaskModalVisible: false,
                });

                if (this.props.afterSaveTask) {
                    this.props.afterSaveTask(JSON.stringify(tasks));
                }
            })
            .catch(function (error) {
                that.setState({
                    isSavingDraft: false
                })
                notification.open({
                    message: '保存失败',
                    description:
                        '保存任务失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });
    }

    clearAddModal(){
        this.props.form.setFieldsValue(
            {
                subject: '',
                description: '',
                log: '',
                owner: ''
            })
    }

    deleteTaskHandler(taskId)
    {
        if(!window.confirm("确定删除?"))
        {
            return;
        }
        let body = {
            projectPhaseId: this.props.projectPhaseId,
            task:{
                id: taskId
            }
        }
       
        let that = this;
        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/DeleteTask`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {

                let tasks = this.state.dataSource;
                let tempTasks = [];
                tasks.forEach(task => {
                    if(task.id != taskId)
                    {
                        tempTasks.push(task);
                    }
                })

                that.setState({ 
                    isAddTaskModalVisible: false,
                    dataSource: tempTasks
                });

                if(this.props.afterSaveTask)
                {
                    this.props.afterSaveTask(JSON.stringify(tempTasks));
                }
            })
            .catch(function (error) {
                that.setState({
                    isSavingDraft: false
                })
                notification.open({
                    message: '删除失败',
                    description:
                        '删除任务失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });        

    
    }

    taskColumns = [
        {
            title: '#',
            dataIndex: 'id',
            width: '2%',
        },
        {
            title: '分类',
            dataIndex: 'subject',
            width: '8%',
        },
        {
            title: '任务项',
            dataIndex: 'description',
            width: '16%',
            render: (text, record) => (
                <div>
                    <TextArea readOnly row={2}>{record.description}</TextArea>
                </div>
              )
        },
        {
          title: '状态记录',
          dataIndex: 'log',
          width: '8%',
        },
        {
          title: '负责人',
          dataIndex: 'owner',
          width: '6%',
        },
        {
            title: '开始日期',
            dataIndex: 'startTime',
            width: '12%',
            render: (text, record) => (
                <DatePicker disabled value={record.startTime? moment(record.startTime) : null}></DatePicker> 
              )
          },
          {
            title: '完成日期',
            dataIndex: 'endTime',
            width: '12%',
            render: (text, record) => (
                <DatePicker disabled value={record.endTime? moment(record.endTime) : null}></DatePicker> 
              )
          },
          {
            title: '变更日期',
            dataIndex: 'updateTime',
            width: '12%',
            render: (text, record) => (
                <DatePicker disabled value={record.updateTime? moment(record.updateTime) : null}></DatePicker> 
              )
          },
        {
          title: '状态',
          dataIndex: 'status',
          width: '8%',
        },
        {
            title: '变通方案',
            dataIndex: 'workaround',
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            render: (text, record) => (
                <span className="action">
                {
                    (((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
                    || record.owner === localStorage[Constants.UserNameLabel]) && (this.props.inProgress || localStorage[Constants.UserTypeStr]===Constants.AdminRole))?
                    <span className="canClick" onClick={() => {
                        let recordCopyStr = JSON.stringify(record);
                        let recordCopy = JSON.parse(recordCopyStr);

                        this.setState({
                        editRecord: recordCopy,
                        isEditTaskModalVisible: true
                    })}}>编辑</span> 
                    : null
                }
                {
                    ((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
                    && this.props.inProgress)?
                    <span className="canClick" style={{marginLeft:'5px'}} onClick={() => this.deleteTaskHandler(record.id)}>删除</span> 
                    : null
                }
                
                  {/* <Divider type="vertical" />
                  <span className="canClick" onClick={() => this.onDelete(record.Id)}>删除</span>               */}
                </span>
              ),
          }
      ];

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <div>
                <div style={{textAlign:"center"}}>
                    <Table style={{width:'100%'}} pagination={false} 
                    columns={this.taskColumns} dataSource={this.state.dataSource}
                    locale={{
                        emptyText: '暂无数据',
                    }}></Table>
                </div>
                <div>
                    {this.canAddTask() ? <Button onClick={()=>{
                        this.clearAddModal();
                        this.setState({
                            isAddTaskModalVisible: true
                        })
                    }} type="primary">添加任务</Button> : null}
                </div>
                <Modal
                    title="添加任务"
                    visible={this.state.isAddTaskModalVisible}
                    closable={false}
                    footer = {[
                        <Button key="back" onClick={ () => {this.setState({ isAddTaskModalVisible: false })} }>
                        取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleAddTask.bind(this)}>
                        添加
                        </Button>
                    ]}
                >
                    <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                        <Form.Item
                            label={
                                <span>
                                    分类&nbsp;
                            </span>
                            }
                        >
                        {getFieldDecorator('subject', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择分类',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["subject"] ? this.props.data["subject"] : null
                                //,
                            })(
                                    <Select>
                                        {
                                            this.state.subjects.map( s=>
                                                <Option value={s}>{s}</Option>
                                            )
                                        }
                                    </Select> 
                            )}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    任务项&nbsp;
                            </span>
                            }
                        >
                        {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写任务项',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["description"] ? this.props.data["description"] : null
                                //,
                            })(<TextArea rows={2} />)}                    
                        </Form.Item>
                        {/* <Form.Item
                            label={
                                <span>
                                    任务详情&nbsp;
                            </span>
                            }
                        >
                        {getFieldDecorator('detail', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写任务详情',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["description"] ? this.props.data["description"] : null
                                //,
                            })(<TextArea rows={2} />)}
                            
                        </Form.Item> */}
                        <Form.Item label="负责人">
                        {getFieldDecorator('owner', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择负责人',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["owner"] ? this.props.data["owner"] : null
                            })(
                                <AutoComplete
                                dataSource={this.state.allUsers}
                                style={{ width: 200 }}
                                placeholder="请选择责任人"
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                                )}
                        </Form.Item>
                      
                    </Form>
                </Modal>
                <Modal
                    title="编辑任务"
                    visible={this.state.isEditTaskModalVisible}
                    closable={false}
                    footer = {[
                        <Button key="back" onClick={ () => {this.setState({ isEditTaskModalVisible: false })} }>
                        取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleEditTask.bind(this)}>
                        保存
                        </Button>
                    ]}
                >
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                        <Form.Item
                            label={
                                <span>
                                    状态记录&nbsp;
                            </span>
                            }
                        >
                        <Input defaultValue={this.state.editRecord.log} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.log = e.target.value
                             this.setState({
                                editRecord: record
                            })
                        } }></Input>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    开始日期&nbsp;
                            </span>
                            }
                        >
                        <DatePicker defaultValue={this.state.editRecord.startTime? moment(this.state.editRecord.startTime) : null} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.startTime = e
                             this.setState({
                                editRecord: record
                            })
                        } }></DatePicker>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    完成日期&nbsp;
                            </span>
                            }
                        >
                        <DatePicker defaultValue={this.state.editRecord.endTime? moment(this.state.editRecord.endTime) : null} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.endTime = e
                             this.setState({
                                editRecord: record
                            })
                        } }></DatePicker>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    变更日期&nbsp;
                            </span>
                            }
                        >
                        <DatePicker defaultValue={this.state.editRecord.updateTime? moment(this.state.editRecord.updateTime) : null} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.updateTime = e
                             this.setState({
                                editRecord: record
                            })
                        } }></DatePicker>                    
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    状态&nbsp;
                            </span>
                            }
                        >
                        {/* <Input defaultValue={this.state.editRecord.status} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.status = e.target.value
                             this.setState({
                                editRecord: record
                            })
                        } }></Input> */}
                        <Select defaultValue={this.state.editRecord.status} onChange={(newStatus)=>{
                            let record = this.state.editRecord;
                            record.status = newStatus;
                             this.setState({
                                editRecord: record
                            })
                        }}>
                            {
                                taskStatus.map(ts => 
                                    <Option value={ts}>{ts}</Option>
                                )
                            }
                        </Select>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    变通方案&nbsp;
                            </span>
                            }
                        >
                        <Input defaultValue={this.state.editRecord.workaround} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.workaround = e.target.value
                             this.setState({
                                editRecord: record
                            })
                        } }></Input>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const ViewProjectPhaseTaskForm = Form.create()(ViewProjectPhaseTask);

export default ViewProjectPhaseTaskForm;