import React, { Component } from 'react';

import { Button, Modal, Form, Input, Select, DatePicker, AutoComplete , notification, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';
import { any } from 'prop-types';
import axios from 'axios';

import { Constants } from '../../../Common/Constants';

import { ReadOnlyProjectAMDPhase1, ReadOnlyProjectAMDPhase2, ReadOnlyProjectAMDPhase3, ReadOnlyProjectAMDPhase4, ReadOnlyProjectAMDPhase5 } from './ADMPhases';

const { Option } = Select;
const { TextArea, Search } = Input;

const projectMemberColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '部门',
        dataIndex: 'dept',
    }
];

//AMD项目模板
class Step1FormAMD extends React.Component {
    state = {
        //项目成员
        isProjectMembersSelectorVisible: false,
        afterProjectMembersSelected: any,
        selectedProjectMembers: any,
        selectedProjectMembersRowKeys: [], //用来记录人员选择表的选中项，以便清除

        projectTemplates: [],
        peopleData:[],

        projectId: 0,

        isTemplatePreviewModalVisible: false,
    };

    componentDidMount() {
       
        // this.getPMs();
        // this.getDepartmentList();
        // this.GetOutMemberInfoListByName();
    }

    componentWillMount()
    {
        this.getTemplateList();
        this.getBusinessPerson();
    }

    componentWillReceiveProps(){
        if(this.props.data.id)
        {   
            this.setState({
                projectId: this.props.data.id
            })
        }
    }

    getBusinessPerson() {
        axios.get(`${Constants.APIBaseUrl}/Users/GetAllUsers`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let tempData=[];
            res.data.Data.map(item => {
                tempData.push({
                    key:item.Id,
                    name:item.Name,
                    value: item.Name,
                    dept:item.StaffNo
                })
            })
            this.setState({
                peopleData:tempData
            });
        })
    }

    getTemplateList = () => {
        axios.get(`${Constants.APIBaseUrl}/Template/GetTemplateList`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                if (!res || !res.data || !res.data.Data) {
                    return;
                }
                let projectTemplates = [];
                
                //加入固定模板
                projectTemplates.push({
                    id: Constants.FixedTemplateId,
                    type: "其他",
                    name: "AMD项目模板",
                    desc: "AMD项目模板",
                    createdAt: '',
                    createdBy: ''
                });

                res.data.Data.ResultData.forEach(item => {
                    projectTemplates.push({
                        id: item.Id,
                        type: item.ProjectType === 1 ? "IT" : "其他",
                        name: item.Name,
                        desc: item.Description,
                        createdAt: '',
                        createdBy: ''
                    });
                })

                this.setState({
                    projectTemplates
                    
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    onTemplateChangeHandler = (e) => {
        if(this.props.templateChangeHandler)
        {
            this.props.templateChangeHandler(e);
        }
    }

    clearProjectMembersTable = () => {
        this.setState({ selectedProjectMembersRowKeys: [] });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        let height = window.innerHeight - 260;

        let leftFormTopItemStyle = {
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftFormItemStyle = {
            border: 'solid',
            height: '65px',
            borderRight: 'none',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let leftTextAreaFormItemStyle = {
            border: 'solid',
            height: '115px',
            borderRight: 'none',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightTextAreaFormItemStyle = {
            border: 'solid',
            height: '115px',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormTopItemStyle = {
            border: 'solid',
            height: '65px',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let rightFormItemStyle = {
            border: 'solid',
            height: '65px',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        let projectTemplateOptions = this.state.projectTemplates.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>);
        
        const { selectedProjectMembersRowKeys } = this.state;
        const rowSelection = {
            selectedProjectMembersRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                if (selectedRows && selectedRows.length > 0) {
                    this.setState({
                        selectedProjectMembers: selectedRows
                    })
                }

                this.setState({ selectedProjectMembersRowKeys: selectedRowKeys });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div style={{ overflow: "auto", height: `${height}px` }}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="请选择项目模板">
                            {getFieldDecorator('templateId', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择项目模板',
                                    },
                                ],
                                initialValue: this.props.data.templateId ? this.props.data.templateId : null
                                ,
                            })(<Select style={{ width: '200px' }} onChange={this.onTemplateChangeHandler.bind(this)}>
                                {projectTemplateOptions}
                            </Select>)}

                            <Button type="link" onClick={()=>{
                                    this.setState({
                                        isTemplatePreviewModalVisible: true
                                    })
                                }}>预览</Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <span>请填写项目信息</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormTopItemStyle}>
                        <Form.Item label="项目名称">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目名称',
                                    },
                                ],
                                initialValue: this.props.data.name ? this.props.data.name : null
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormTopItemStyle}>
                        <Form.Item label="是否审批">
                            {getFieldDecorator('approval', {
                                initialValue: this.props.data.approval ? this.props.data.approval : 2
                            })(<Radio.Group>
                                <Radio value={1}>是</Radio>
                                <Radio value={2}>否</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="签约客户名称">
                            {getFieldDecorator('signedCustomer', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写签约客户',
                                    },
                                ],
                                initialValue: this.props.data.signedCustomer ? this.props.data.signedCustomer : null
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="数据中心">
                            {getFieldDecorator('dataCenter', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写数据中心',
                                    },
                                ],
                                initialValue: this.props.data.dataCenter ? this.props.data.dataCenter : null
                            })(
                                <Input></Input>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="项目范围简述">
                            {getFieldDecorator('scope', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目范围',
                                    },
                                ],
                                initialValue: this.props.data.scope ? this.props.data.scope : null
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目成员">
                            {getFieldDecorator('projectMembers', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择项目成员',
                                    },
                                ],
                                initialValue: this.props.data.projectMembers ? this.props.data.projectMembers : null
                            })(
                                <Search
                                    placeholder="请选择..."
                                    enterButton="选择"
                                    size="default"
                                    onSearch={value => {
                                        let that = this;
                                        this.setState({
                                            isProjectMembersSelectorVisible: true,
                                            afterProjectMembersSelected: () => {
                                                let personsStr = '';

                                                if (this.state.selectedProjectMembers && Array.isArray(this.state.selectedProjectMembers)) {
                                                    personsStr = this.state.selectedProjectMembers.map(person => person.name).join(';');
                                                }

                                                that.props.form.setFieldsValue(
                                                    {
                                                        projectMembers: personsStr
                                                    })

                                                this.clearProjectMembersTable();
                                            }
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="岗位职责">
                            {getFieldDecorator('duty', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写岗位职责',
                                    },
                                ],
                                initialValue: this.props.data.duty ? this.props.data.duty : null
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="项目风险">
                            {getFieldDecorator('risk', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目风险',
                                    },
                                ],
                                initialValue: this.props.data.risk ? this.props.data.risk : null
                            })(
                                <Input></Input>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="声明">
                            {getFieldDecorator('statement', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写声明',
                                    },
                                ],
                                initialValue: this.props.data.statement ? this.props.data.statement : null
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="立项时间">
                            {getFieldDecorator('approvedAt', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写立项时间',
                                    },
                                ],
                                initialValue: this.props.data.approvedAt ? this.props.data.approvedAt : null
                            })(
                                <DatePicker></DatePicker>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="计划验收时间">
                            {getFieldDecorator('planCheckAt', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写计划验收时间',
                                    },
                                ],
                                initialValue: this.props.data.planCheckAt ? this.props.data.planCheckAt : null
                            })(
                                <DatePicker></DatePicker>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                      
                    </Col>
                </Row>
                <Modal
                    title="请选择"
                    centered
                    visible={this.state.isProjectMembersSelectorVisible}
                    okText="确定"
                    cancelText="取消"
                    onOk={() => {
                        this.setState({ isProjectMembersSelectorVisible: false })
                        this.state.afterProjectMembersSelected()
                    }}
                    onCancel={() => { this.setState({ isProjectMembersSelectorVisible: false }) }}
                >
                    <Table
                        columns={projectMemberColumns} dataSource={this.state.peopleData}
                        rowSelection={rowSelection}
                    />
                </Modal>
                <Modal
                    title="阶段预览"
                    visible={this.state.isTemplatePreviewModalVisible}
                    closable={false}
                    width="80%"
                    footer = {[
                        <Button type="primary" key="back" onClick={ () => {this.setState({ isTemplatePreviewModalVisible: false })} }>
                        关闭
                        </Button>
                    ]}
                >
                    <div>
                        <div key={1} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            <div id='phase1'>阶段1
                            </div>
                            <ReadOnlyProjectAMDPhase1></ReadOnlyProjectAMDPhase1>
                        </div>
                        <div key={2} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            <div id='phase2'>阶段2
                                </div>
                                <ReadOnlyProjectAMDPhase2></ReadOnlyProjectAMDPhase2>
                            </div>
                        <div key={3} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            <div id='phase3'>阶段3
                            </div>
                            <ReadOnlyProjectAMDPhase3></ReadOnlyProjectAMDPhase3>
                        </div>
                        <div key={4} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            <div id='phase4'>阶段4
                            </div>
                            <ReadOnlyProjectAMDPhase4></ReadOnlyProjectAMDPhase4>
                        </div>
                        <div key={5} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                            <div id='phase5'>阶段5
                            </div>
                            <ReadOnlyProjectAMDPhase5></ReadOnlyProjectAMDPhase5>
                        </div>
                    
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Step1FormAMD;