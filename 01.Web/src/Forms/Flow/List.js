import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input, Popconfirm,Divider } from 'antd';
import axios from 'axios';

import { Constants }  from '../../Common/Constants';
import createHistory from 'history/createHashHistory';

import { Router, Route, Switch, Link } from 'react-router-dom';

const { Option } = Select;


const hashHistory = createHistory();

const navigateToEditor= (record)=>{
    console.log("navigate to", record);
    hashHistory.push('/Agent/Edit/'+record.id);
}



class FlowSList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptList: [],
            approvalList: [],
            searchType: '',
            searchDeptId:0,
            searchProjectName:'',
            searchProjectNo:'',
            searchCreateBy:'',
            isSearching: false,
            loading: false,
        };
    }

    projectColumns = [
        {
            title: '类别',
            dataIndex: 'itemType',
            width: '8%',
        },
        {
            title: '部门',
            dataIndex: 'dept',
            width: '10%',
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            width: '15%',
            render: (name, record) => (
              record.itemType==='项目'?  <Link to={"/app/project/approve/" + record.id}>{name}</Link>
                :<Link to={"/app/template/approve/" + record.id}>{name}</Link>
            )
        },
        {
            title: '描述',
            dataIndex: 'comment',
            width: '27%',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            width: '10%',
        },
        {
            title: '创建者',
            dataIndex: 'createBy',
            width: '10%',
        },
        // {
        //     title: '项目经理',
        //     dataIndex: 'pm',
        //     width: '15%',
        // },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) =>
                (
                    <span className="action">
                       <Popconfirm title="确定同意?" onConfirm={() => this.handleApprove(record)}>
                                <a href="javascript:;">同意</a>
                            </Popconfirm>
                        <Divider type="vertical" />
                        <Popconfirm title="确定拒绝?" onConfirm={() => this.handleReject(record)}>
                                <a href="javascript:;">拒绝</a>
                            </Popconfirm>
                    </span>
                )
        },
    ];

    componentWillMount() {
        axios.get(`${Constants.APIBaseUrl}/Department/GetDepartmentList`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(depts => {
                if (depts && depts.data && depts.data.Data && depts.data.Data.ResultData) {
                    this.setState({
                        deptList: depts.data.Data.ResultData
                    });
                }

                this.getApprovalList();
               //this.getTemplateApprovalList();
              //this. getProjectApprovalList();
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    getApprovalList(queryString)
    {
        this.setState({ loading: true });
        axios.get(`${Constants.APIBaseUrl}/flow/GetApprovalList?${queryString}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ loading: false });
                let tempTemplateList = [];

                if (res && res.data && res.data.Data && res.data.Data) {
                    res.data.Data.map(data => {
                        let dept = this.state.deptList.filter(dept => dept.Id === data.DepartId);

                        tempTemplateList.push({
                            id: data.Id,
                            itemType: data.ItemType,
                            dept: (dept && dept.length > 0) ? dept[0].Name : '',
                            name: data.Name,
                            comment: data.Description,
                            createdAt: data.CreateTimeStr,
                            createBy: data.CreateBy,
                            status: Constants.getProjectStatusStr(data.Status)
                        })
                    })
                }

                this.setState({
                    approvalList: tempTemplateList, //res.data.Data.ResultData
                    isSearching: false
                });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({
                    isSearching: false
                });
            });
    }

    // getTemplateApprovalList(queryString)
    // {
    //     this.setState({ loading: true });
    //     axios.get(`${Constants.APIBaseUrl}/Template/GetApprovalList?${queryString}`, {
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => {
    //             this.setState({ loading: false });
    //             let tempTemplateList = [];

    //             console.log(res.data);
    //             if (res && res.data && res.data.Data.ResultData) {
    //                 res.data.Data.ResultData.map(data => {
    //                     let dept = this.state.deptList.filter(dept => dept.Id === data.DepartId);

    //                     tempTemplateList.push({
    //                         id: data.Id,
    //                         itemType: '模板',
    //                         dept: (dept && dept.length > 0) ? dept[0].Name : '',
    //                         name: data.Name,
    //                         comment: data.Description,
    //                         createdAt: data.CreateTimeStr,
    //                         createBy: data.CreateBy,
    //                         status: Constants.getProjectStatusStr(data.Status)
    //                     })
    //                 })
    //             }

    //             this.setState({
    //                 approvalList: tempTemplateList //res.data.Data.ResultData
    //             }, ()=>{
    //                 this.getProjectApprovalList(queryString);
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             this.setState({
    //                 isSearching: false
    //             });
    //         });
    // }

    // getProjectApprovalList(queryString)
    // {
    //     this.setState({ loading: true });
    //     axios.get(`${Constants.APIBaseUrl}/Project/GetApprovalList?${queryString}`, {
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => {
    //             this.setState({ loading: false });
    //             let tempProjectList = this.state.approvalList;

    //             if (res && res.data && res.data.Data && res.data.Data.ResultData) {
    //                 res.data.Data.ResultData.map(data => {
    //                     let dept = this.state.deptList.filter(dept => dept.Id === data.BusinessDept);

    //                     tempProjectList.push({
    //                         id: data.Id,
    //                         itemType: '项目',
    //                         dept: (dept && dept.length > 0) ? dept[0].Name : '',
    //                         name: data.Name,
    //                         comment: data.Comments,
    //                         createdAt: data.CreateTimeStr,
    //                         createBy: data.CreateBy,
    //                         status: Constants.getProjectStatusStr(data.Status)
    //                     })
    //                 })
    //             }

    //             this.setState({
    //                 approvalList: tempProjectList, //res.data.Data.ResultData
    //                 isSearching: false
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             console.log("search fail");
    //             this.setState({
    //                 isSearching: false
    //             });
    //         });
    // }

    onSearch() {

        this.setState({
            isSearching: true
        })

        let queryString = `DepartId=${this.state.searchDeptId}&Name=${this.state.searchProjectName}&CreateBy=${this.state.searchCreateBy}&SearchType=${this.state.searchType}`;
        
        this.getApprovalList(queryString);
    }

    onTypeChange(e)
    {
        this.setState({
            searchType: e
        })
    }
    onDeptChange(e) {
        this.setState({
            searchDeptId: e
        })
    }

    onProjectNameChange(e) {
        this.setState({
            searchProjectName: e.target.value
        })
    }

    onCreateByChange = (e)=>
    {
        this.setState({
            searchCreateBy:e.target.value
        })
    }

    handleReject(record)
    {
        let url = record.itemType ==='项目'? 'Project/UpdateApprovalStatus' : 'Template/UpdateStatus';
        axios.get(`${Constants.APIBaseUrl}/${url}?Id=${record.id}&Status=2`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.onSearch();

            })
            .catch(function (error) {
                console.log(error);
                
            });
    }

    handleApprove(record)
    {
        let url = record.itemType ==='项目'? 'Project/UpdateApprovalStatus' : 'Template/UpdateStatus';

        axios.get(`${Constants.APIBaseUrl}/${url}?Id=${record.id}&Status=1`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.onSearch();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let depts = this.state.deptList.map(dept => (
            <Option value={dept.Id}>{dept.Name}</Option>
          ));

        return <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24}>
                <Row gutter={8}>
                <Col span={3}>
                    类别：<Select style={{ width: '60%' }} onChange={this.onTypeChange.bind(this)}>
                    <Option value="">--全部--</Option>
                    <Option value="模板">模板</Option>
                    <Option value="项目">项目</Option>
                    </Select>
                </Col>
                <Col span={5}>
                    部门：<Select style={{ width: 150 }} onChange={this.onDeptChange.bind(this)}>
                    {depts}
                    </Select>
                </Col>
                <Col span={5}>
                    项目名称：<Input style={{ width: "150px" }} defaultValue={this.state.searchProjectName} onChange={this.onProjectNameChange.bind(this)} />
                </Col>
                    <Col span={5}>
                        创建人：<Input style={{ width: "150px" }}
                            defaultValue={this.state.searchCreateBy} onChange={this.onCreateByChange.bind(this)}
                        />
                    </Col>
                {/* <Col span={6}>
                    项目编号：<Input style={{ width: "150px" }} defaultValue={this.state.searchProjectNo} onChange={this.onProjectNoChange.bind(this)} />
                </Col> */}
                <Col span={4}>
                    <Button loading={this.state.isSearching} onClick={this.onSearch.bind(this)} type="primary">
                    搜索
                        </Button>
                </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                {
                    <Table
                        loading={this.state.loading}
                        dataSource={this.state.approvalList}
                        columns={this.projectColumns}
                        />
                }
                    
                </Row>
            </Col>

        </Row>;
    }
}

export default FlowSList;