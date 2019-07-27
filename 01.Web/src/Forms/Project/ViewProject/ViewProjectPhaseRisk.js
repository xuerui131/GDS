
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


class ViewProjectPhaseRisk extends React.Component {
    state={
        dataSource: [],
        isAddRiskModalVisible: false,
        allUsers: [],
        riskTypes: [], //风险类别
        severities: [], //严重性

        isEditRiskModalVisible: false,
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
        this.getRiskTypes();
        this.getSeverities();
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

    getRiskTypes()
    {
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/GetRiskTypeList`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
          
            this.setState({
                riskTypes:res.data.Data
            });
        })
    }

    getSeverities()
    {
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/GetRiskSeverityList`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
          
            this.setState({
                severities:res.data.Data
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

    canAddRisk(){
        if((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
        && this.props.inProgress)
        {
            return true;
        }

        return false;
    }

    handleAddRisk()
    {
        let that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let id = 1;
                if(that.state.dataSource && that.state.dataSource.length>0)
                {
                    id = that.state.dataSource[that.state.dataSource.length - 1].id + 1;
                }

                let risk = {
                    id: id,
                    riskType: values.riskType,
                    severity: values.severity,
                    detail: values.detail,
                    assignedTo: values.assignedTo,
                    status: taskStatus[0]
                }

                let risks = this.state.dataSource;
                risks.push(risk);

                let body = {
                    projectPhaseId: this.props.projectPhaseId,
                    newRisk: true,
                    risk: { id: id, status: taskStatus[0], ...values }
                }
               
                axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateRisk`, body, {
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => {
                        that.setState({ 
                            isAddRiskModalVisible: false,
                            dataSource: risks
                        });

                        if(this.props.afterSaveRisk)
                        {
                            this.props.afterSaveRisk(JSON.stringify(risks));
                        }
                    })
                    .catch(function (error) {
                        that.setState({
                            isSavingDraft: false
                        })
                        notification.open({
                            message: '保存失败',
                            description:
                                '保存风险失败',
                            onClick: () => {
                                //console.log('Notification Clicked!');
                            },
                            duration: 3
                        });
                    });        

               
            }
        });
    }

    handleEditRisk() {
        let that = this;

        let risks = this.state.dataSource;
        let editRisk = risks.filter(t => t.id === this.state.editRecord.id)[0];

        editRisk.nextSteps = this.state.editRecord.nextSteps;
        editRisk.status = this.state.editRecord.status;
        editRisk.workaround = this.state.editRecord.workaround;

        this.setState({
            dataSource: risks
        });

        let body = {
            projectPhaseId: this.props.projectPhaseId,
            newRisk: false,
            risk: { ...this.state.editRecord }
        }

        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateRisk`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                that.setState({
                    isEditRiskModalVisible: false,
                });

                if (this.props.afterSaveRisk) {
                    this.props.afterSaveRisk(JSON.stringify(risks));
                }
            })
            .catch(function (error) {
                that.setState({
                    isSavingDraft: false
                })
                notification.open({
                    message: '保存失败',
                    description:
                        '保存风险失败',
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
                riskType: '',
                severity: '',
                assignedTo: ''
            })
    }

    deleteRiskHandler(riskId)
    {
        if(!window.confirm("确定删除?"))
        {
            return;
        }
        let body = {
            projectPhaseId: this.props.projectPhaseId,
            risk:{
                id: riskId
            }
        }
       
        let that = this;
        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/DeleteRisk`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {

                let risks = this.state.dataSource;
                let tempRisks = [];
                risks.forEach(risk => {
                    if(risk.id != riskId)
                    {
                        tempRisks.push(risk);
                    }
                })

                that.setState({ 
                    isAddRiskModalVisible: false,
                    dataSource: tempRisks
                });

                if(this.props.afterSaveRisk)
                {
                    this.props.afterSaveRisk(JSON.stringify(tempRisks));
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

    riskColumns = [
        {
            title: '#',
            dataIndex: 'id',
            width: '2%',
        },
        {
            title: '类别',
            dataIndex: 'riskType',
            width: '8%',
        },
        {
            title: '严重性',
            dataIndex: 'severity',
            width: '8%',
        },
        {
          title: '问题//风险描述',
          dataIndex: 'detail',
          width: '8%',
        },
        {
            title: '后续工作计划',
            dataIndex: 'nextSteps',
            width: '6%',
          },
        {
          title: '负责人',
          dataIndex: 'assignedTo',
          width: '6%',
        },
        {
            title: '目标完成日期',
            dataIndex: 'targetDate',
            width: '12%',
            render: (text, record) => (
                <DatePicker disabled value={record.targetDate? moment(record.targetDate) : null}></DatePicker> 
              )
          },         
        {
          title: '状态',
          dataIndex: 'status',
          width: '8%',
        },
        {
            title: '应急预案',
            dataIndex: 'workaround',
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '100px',
            render: (text, record) => (
                <span className="action">
                {
                    ((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
                    || record.assignedTo === localStorage[Constants.UserNameLabel])?
                    <span className="canClick" onClick={() => {
                        let recordCopyStr = JSON.stringify(record);
                        let recordCopy = JSON.parse(recordCopyStr);

                        this.setState({
                        editRecord: recordCopy,
                        isEditRiskModalVisible: true
                    })}}>编辑</span> 
                    : null
                }
                {
                    (localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)?
                    <span className="canClick" style={{marginLeft:'5px'}} onClick={() => this.deleteRiskHandler(record.id)}>删除</span> 
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
                    columns={this.riskColumns} dataSource={this.state.dataSource}
                    locale={{
                        emptyText: '暂无数据',
                    }}></Table>
                </div>
                <div>
                    {this.canAddRisk() ? <Button onClick={()=>{
                        this.clearAddModal();
                        this.setState({
                            isAddRiskModalVisible: true
                        })
                    }} type="primary">添加任务</Button> : null}
                </div>
                <Modal
                    title="添加风险"
                    visible={this.state.isAddRiskModalVisible}
                    closable={false}
                    footer = {[
                        <Button key="back" onClick={ () => {this.setState({ isAddRiskModalVisible: false })} }>
                        取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleAddRisk.bind(this)}>
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
                        {getFieldDecorator('riskType', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择风险类别',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["subject"] ? this.props.data["subject"] : null
                                //,
                            })(
                                    <Select>
                                        {
                                            this.state.riskType.map( s=>
                                                <Option value={s}>{s}</Option>
                                            )
                                        }
                                    </Select> 
                            )}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    严重性&nbsp;
                            </span>
                            }
                        >
                        {getFieldDecorator('description', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择严重性',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["description"] ? this.props.data["description"] : null
                                //,
                            })( <Select>
                                        {
                                            this.state.severities.map( s=>
                                                <Option value={s}>{s}</Option>
                                            )
                                        }
                                    </Select> )}                    
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    风险描述&nbsp;
                            </span>
                            }
                        >
                        {getFieldDecorator('detail', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写风险描述',
                                    },
                                ],
                                //initialValue: this.props.data && this.props.data["description"] ? this.props.data["description"] : null
                                //,
                            })(<Input />)}
                            
                        </Form.Item>
                        <Form.Item label="责任人">
                        {getFieldDecorator('assignedTo', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择责任人',
                                    },
                                ],
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
                    title="编辑风险"
                    visible={this.state.isEditRiskModalVisible}
                    closable={false}
                    footer = {[
                        <Button key="back" onClick={ () => {this.setState({ isEditRiskModalVisible: false })} }>
                        取消
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleEditRisk.bind(this)}>
                        保存
                        </Button>
                    ]}
                >
                <Form {...formItemLayout} style={{ marginRight: "20px" }}>
                        <Form.Item
                            label={
                                <span>
                                    后续步骤&nbsp;
                            </span>
                            }
                        >
                        <Input defaultValue={this.state.editRecord.nextSteps} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.nextSteps = e.target.value
                             this.setState({
                                editRecord: record
                            })
                        } }></Input>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    目标完成日期&nbsp;
                            </span>
                            }
                        >
                        <DatePicker defaultValue={this.state.editRecord.targetDate? moment(this.state.editRecord.targetDate) : null} onChange={ (e)=>{
                            let record = this.state.editRecord;
                            record.targetDate = e
                             this.setState({
                                editRecord: record
                            })
                        } }></DatePicker>
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                                    应急预案&nbsp;
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

const ViewProjectPhaseRiskForm = Form.create()(ViewProjectPhaseRisk);

export default ViewProjectPhaseRiskForm;