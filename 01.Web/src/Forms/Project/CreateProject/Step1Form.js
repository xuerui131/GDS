import React, { Component } from 'react';

import { Button, Modal, Form, Input, Select, DatePicker, AutoComplete , notification, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';
import { any } from 'prop-types';
import axios from 'axios';
import { GetOutMemberInfoListByName } from '../../../api/index';

import { Constants } from '../../../Common/Constants';

const { Option } = Select;
const { TextArea, Search } = Input;

const peopleColumns = [
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

const externalPeopleColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: '公司',
        dataIndex: 'company',
    }
];


class Step1Form extends React.Component {
    state = {
        isPersonSelectorVisible: false,
        afterPersonSelected: any,
        selectedPersons: any,

        isExternalPersonSelectorVisible: false,
        afterExternalPersonSelected: any,
        selectedExternalPersons: any,

        selectedRowKeys: [], //用来记录人员选择表的选中项，以便清除

        selectedExternalPersonRowKeys: [],//用来记录外部成员选择表的选中项，以便清除

        projectTemplates: [],
        business: [],
        peopleData:[],
        pmData:[],
        department:[],
        externalPersonData: [],

        projectId: 0,

        //projectDetail: {}
    };

    componentDidMount() {
        this.getTemplateList();
        this.getBusinessPerson();
        this.getPMs();
        this.getDepartmentList();
        this.GetOutMemberInfoListByName();
    }

    componentWillReceiveProps(){
        if(this.props.data.id)
        {   
            this.setState({
                projectId: this.props.data.id
            })
        }
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
                
                // //加入固定模板
                // projectTemplates.push({
                //     id: Constants.FixedTemplateId,
                //     type: "其他",
                //     name: "ADM项目模板",
                //     desc: "ADM项目模板",
                //     createdAt: '',
                //     createdBy: ''
                // });

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
    getBusinessPerson() {
        axios.get(`${Constants.APIBaseUrl}/Users/GetAllUsers`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let business = [],tempData=[];
            res.data.Data.map(item => {
                business.push(item.Name);
                tempData.push({
                    key:item.Id,
                    name:item.Name,
                    value: item.Name,
                    dept:item.StaffNo
                })
            })
            this.setState({
                business,
                peopleData:tempData
            });
        })
    }

    getPMs() {
        axios.get(`${Constants.APIBaseUrl}/Users/GetPM`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
          
            let pms=[];
            res.data.Data.map(item => {
                pms.push(item.Name)
            })
            this.setState({
                pmData:pms
            });
        })
    }

    GetOutMemberInfoListByName(){
        axios.get(`${Constants.APIBaseUrl}/OutMemberInfo/GetOutMemberInfoList`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let tempPersons=[];
            
            res.data.Data.ResultData.map(item => {
                tempPersons.push({
                    key:item.Id,
                    name:item.Name,
                    company:item.Company
                })
            })

            this.setState({
                externalPersonData:tempPersons
            });
        })

    }

    clearPersonTable = () => {
        this.setState({ selectedRowKeys: [] });
    }

    clearExternalPersonTable = () => {
        this.setState({ selectedExternalPersonRowKeys: [] });
    }

    onTemplateChangeHandler = (e) => {
        if(this.props.templateChangeHandler)
        {
            this.props.templateChangeHandler(e);
        }
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

        let rightTextAreaFormItemStyle = {
            border: 'solid',
            height: '115px',
            borderTop: 'none',
            padding: '0 20px 0 0',
            borderColor: 'grey',
            borderWidth: '1px'
        }

        const { selectedRowKeys, selectedExternalPersonRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

                if (selectedRows && selectedRows.length > 0) {
                    this.setState({
                        selectedPersons: selectedRows
                    })
                }

                this.setState({ selectedRowKeys });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const rowSelectionExternalPersons = {
            selectedExternalPersonRowKeys,
            onChange: (selectedExternalPersonRowKeys, selectedRows) => {
                console.log(`selectedRowKeys for External Persons: ${selectedExternalPersonRowKeys}`, 'selectedRows: ', selectedRows);

                if (selectedRows && selectedRows.length > 0) {
                    this.setState({
                        selectedExternalPersons: selectedRows
                    })
                }

                this.setState({ selectedExternalPersonRowKeys: selectedExternalPersonRowKeys });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        let projectTemplateOptions = this.state.projectTemplates.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>);
        //let businessOptions = this.state.business.map(p => <Option key={p.key} value={p.name}>{p.name}</Option>);
        
        let departmentOptions = this.state.department.map(p => <Option key={p.key} value={p.key}>{p.name}</Option>);
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
                        <Form.Item label="部门">
                            {getFieldDecorator('dept', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择部门',
                                    },
                                ],
                                initialValue: this.props.data.dept ? this.props.data.dept : null
                            })(
                                <Select style={{ width: '200px' }} >
                                    {departmentOptions}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="业务负责人">
                            {getFieldDecorator('business', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择业务负责人',
                                    },
                                ],
                                initialValue: this.props.data.business ? this.props.data.business : null
                            })(<AutoComplete
                                dataSource={this.state.business}
                                style={{ width: 200 }}
                                placeholder="选择业务负责人"
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="开始日期">
                            {getFieldDecorator('startDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择开始日期',
                                    },
                                ],
                                initialValue: this.props.data.startDate ? this.props.data.startDate : null
                            })(
                                <DatePicker></DatePicker>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="结束日期">
                            {getFieldDecorator('endDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择结束日期',
                                    },
                                ],
                                initialValue: this.props.data.endDate ? this.props.data.endDate : null
                            })(
                                <DatePicker></DatePicker>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="项目背景说明">
                            {getFieldDecorator('background', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目背景说明',
                                    },
                                ],
                                initialValue: this.props.data.background ? this.props.data.background : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目需求、目标">
                            {getFieldDecorator('target', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目需求、目标',
                                    },
                                ],
                                initialValue: this.props.data.target ? this.props.data.target : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="项目获益">
                            {getFieldDecorator('profit', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目获益',
                                    },
                                ],
                                initialValue: this.props.data.profit ? this.props.data.profit : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label={<span><span>项目交付物/</span><span>关键目标</span></span>}>
                            {getFieldDecorator('delivery', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目交付物/关键目标',
                                    },
                                ],
                                initialValue: this.props.data.delivery ? this.props.data.delivery : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label={<span><span>截至报告日期最新项目状态。</span><br /><span>包括进度、问题、风险。</span></span>}>
                            {getFieldDecorator('lastStatusText', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写最新状态',
                                    },
                                ],
                                initialValue: this.props.data.lastStatusText ? this.props.data.lastStatusText : null
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目范围">
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
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="包括内容">
                            {getFieldDecorator('include', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写包括内容',
                                    },
                                ],
                                initialValue: this.props.data.include ? this.props.data.include : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="不包括内容">
                            {getFieldDecorator('exclude', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写不包含内容',
                                    },
                                ],
                                initialValue: this.props.data.exclude ? this.props.data.exclude : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftTextAreaFormItemStyle}>
                        <Form.Item label="成功标准">
                            {getFieldDecorator('successCriteria', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写成功标准',
                                    },
                                ],
                                initialValue: this.props.data.successCriteria ? this.props.data.successCriteria : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightTextAreaFormItemStyle}>
                        <Form.Item label="项目资源成本">
                            {getFieldDecorator('resourceCost', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目资源成本',
                                    },
                                ],
                                initialValue: this.props.data.resourceCost ? this.props.data.resourceCost : null
                            })(
                                <TextArea rows={4} ></TextArea>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="项目发起人">
                            {getFieldDecorator('starter', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择项目发起人',
                                    },
                                ],
                                initialValue: this.props.data.starter ? this.props.data.starter : null
                            })(<AutoComplete
                                dataSource={this.state.business}
                                placeholder="选择项目发起人"
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="指导小组">
                            {getFieldDecorator('director', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写指导小组',
                                    },
                                ],
                                initialValue: this.props.data.director ? this.props.data.director : null
                            })(
                                <Input ></Input>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="项目经理">
                            {getFieldDecorator('pm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择项目经理',
                                    },
                                ],
                                initialValue: this.props.data.pm ? this.props.data.pm : null
                            })(<AutoComplete
                                dataSource={this.state.pmData}
                                placeholder="选择项目经理"
                                filterOption={(inputValue, option) =>
                                    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />)}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="内部成员">
                            {getFieldDecorator('teammember', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择内部成员',
                                    },
                                ],
                                initialValue: this.props.data.teammember ? this.props.data.teammember : null
                            })(
                                <Search
                                    placeholder="请输入..."
                                    enterButton="选择"
                                    size="default"
                                    onSearch={value => {
                                        let that = this;
                                        this.setState({
                                            isPersonSelectorVisible: true,
                                            afterPersonSelected: () => {
                                                let personsStr = '';

                                                if (this.state.selectedPersons && Array.isArray(this.state.selectedPersons)) {
                                                    personsStr = this.state.selectedPersons.map(person => person.name).join(';');
                                                }

                                                that.props.form.setFieldsValue(
                                                    {
                                                        teammember: personsStr
                                                    })

                                                this.clearPersonTable();
                                            }
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="外部成员">
                            {getFieldDecorator('vendor', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择外部成员',
                                    },
                                ],
                                initialValue: this.props.data.vendor ? this.props.data.vendor : null
                            })(
                                <Search
                                    placeholder="请选择外部成员..."
                                    enterButton="选择"
                                    size="default"
                                    onSearch={value => {
                                        let that = this;
                                        this.setState({
                                            isExternalPersonSelectorVisible: true,
                                            afterExternalPersonSelected: () => {
                                                let personsStr = '';

                                                if (this.state.selectedExternalPersons && Array.isArray(this.state.selectedExternalPersons)) {
                                                    personsStr = this.state.selectedExternalPersons.map(person => person.name).join(';');
                                                }

                                                that.props.form.setFieldsValue(
                                                    {
                                                        vendor: personsStr
                                                    })

                                                this.clearExternalPersonTable();
                                            }
                                        });
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="人天单价(￥)">
                            {getFieldDecorator('manday', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写人天单价(￥)',
                                    },
                                ],
                                initialValue: this.props.data.manday ? this.props.data.manday : null
                            })(
                                <InputNumber style={{ width: "150px" }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="软件成本(￥)">
                            {getFieldDecorator('softCost', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写软件成本(￥)',
                                    },
                                ],
                                initialValue: this.props.data.softCost ? this.props.data.softCost : null
                            })(
                                <InputNumber style={{ width: "150px" }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="硬件成本(￥)">
                            {getFieldDecorator('hardCost', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写硬件成本(￥)',
                                    },
                                ],
                                initialValue: this.props.data.hardCost ? this.props.data.hardCost : null
                            })(
                                <InputNumber style={{ width: "150px" }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="项目总成本(￥)">
                            {getFieldDecorator('totalCost', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写项目总成本(￥)',
                                    },
                                ],
                                initialValue: this.props.data.totalCost ? this.props.data.totalCost : null
                            })(
                                <InputNumber style={{ width: "150px" }}
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="其他说明">
                            {getFieldDecorator('comment', {
                                rules: [
                                    {
                                        required: false,
                                    },
                                ],
                                initialValue: this.props.data.comment ? this.props.data.comment : null
                            })(
                                <Input></Input>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Modal
                    title="请选择"
                    centered
                    visible={this.state.isPersonSelectorVisible}
                    okText="确定"
                    cancelText="取消"
                    onOk={() => {
                        this.setState({ isPersonSelectorVisible: false })
                        this.state.afterPersonSelected()
                    }}
                    onCancel={() => { this.setState({ isPersonSelectorVisible: false }) }}
                >
                    <Table
                        columns={peopleColumns} dataSource={this.state.peopleData}
                        rowSelection={rowSelection}
                    />
                </Modal>
                <Modal
                    title="请选择"
                    centered
                    visible={this.state.isExternalPersonSelectorVisible}
                    okText="确定"
                    cancelText="取消"
                    onOk={() => {
                        this.setState({ isExternalPersonSelectorVisible: false })
                        this.state.afterExternalPersonSelected()
                    }}
                    onCancel={() => { this.setState({ isExternalPersonSelectorVisible: false }) }}
                >
                    <Table
                        columns={externalPeopleColumns} dataSource={this.state.externalPersonData}
                        rowSelection={rowSelectionExternalPersons}
                    />
                </Modal>
            </div>
        );
    }
}

// const Step1ContentForm = Form.create()(Step1Form);

export default Step1Form;