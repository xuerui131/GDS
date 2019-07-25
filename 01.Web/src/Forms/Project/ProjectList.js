import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input } from 'antd';
import axios from 'axios';

import { Constants }  from '../../Common/Constants';
//import createHistory from 'history/createHashHistory';

import { Router, Route, Switch, Link } from 'react-router-dom';

const { Option } = Select;
//const hashHistory = createHistory();

  const columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'id',
    //   width: '7%',
    // },
    {
      title: '部门',
      dataIndex: 'dept',
      width: '8%',
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        width: '15%',
        render: (name, record) => (
            <Link to={"/app/project/view/"+record.id}>{name}</Link>
          )
    },
    {
        title: '项目编号',
        dataIndex: 'no',
        width: '10%',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: '10%',
    },
    {
        title: '项目经理',
        dataIndex: 'pm',
        width: '10%',
    },
    {
        title: '当前状态',
        dataIndex: 'status',
        width: '10%',
    },
    {
      title: '当前阶段',
      dataIndex: 'currentPhase',
      width: '10%',
    },
    // {
    //     title: <div><p>计划完成</p><p>时间</p></div>,
    //     dataIndex: 'plannedCompleteDate',
    //     width: '15%',
    //   },
    //   {
    //     title: <div><p>预计完成</p><p>时间</p></div>,
    //     dataIndex: 'expectedCompleteDate',
    //     width: '15%',
    //   }
  ];

class ProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptList: [],
            projectList: [],
            searchDeptId:0,
            searchStatus: -1,
            searchProjectName:'',
            searchProjectNo:'',
            searchPM:'',
            isSearching: false,
            loading: false
        };
    }

    componentWillMount() {
        let searchStatus = -1;
        if (this.props.match && this.props.match.params && this.props.match.params.status) {
            searchStatus = parseInt(this.props.match.params.status);

            this.setState({
                searchStatus
            }, ()=>{
                this.getDeptList();
            });
        }
        else
        {
            this.getDeptList();
        }
        
    }

    getDeptList(){
        this.setState({ loading: true });
        axios.get(`${Constants.APIBaseUrl}/Department/GetDepartmentList`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(depts => {
                this.setState({ loading: false });
                if (depts && depts.data && depts.data.Data && depts.data.Data.ResultData) {
                    this.setState({
                        deptList: depts.data.Data.ResultData
                    }, ()=>{
                        this.onSearch();
                    });
                }
                
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    // getProjectList(){
    //     axios.get(`${Constants.APIBaseUrl}/Project/GetProjectList`, {
    //         headers: { 'Content-Type': 'application/json' }
    //     })
    //         .then(res => {
    //             let tempProjectList = [];

    //             if (res && res.data && res.data.Data && res.data.Data.ResultData) {
    //                 res.data.Data.ResultData.map(data => {
    //                     let dept = this.state.deptList.filter(dept => dept.Id === data.BusinessDept);

    //                     tempProjectList.push({
    //                         id: data.Id,
    //                         dept: (dept && dept.length > 0) ? dept[0].Name : '',
    //                         no: data.No,
    //                         name: data.Name,
    //                         pm: data.ProjectManager,
    //                         createdAt: data.CreateTimeStr,
    //                         createdBy: data.CreatedBy,
    //                         currentPhase: data.CurrentPhase,
    //                         status: Constants.getProjectStatusStr(data.Status)
    //                     })
    //                 })
    //             }

    //             this.setState({
    //                 projectList: tempProjectList //res.data.Data.ResultData
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             console.log("search fail");
    //         });

    // }


    onSearch() {
        console.log(this.state.searchProjectName, this.state.searchProjectNo, this.state.searchDeptId);

        this.setState({
            isSearching: true
        })
        this.setState({ loading: true });
        axios.get(`${Constants.APIBaseUrl}/Project/GetProjectList?DepartId=${this.state.searchDeptId}&Name=${this.state.searchProjectName}&No=${this.state.searchProjectNo}&ProjectManager=${this.state.searchPM}&Status=${this.state.searchStatus===-1? '': this.state.searchStatus}`, {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        })
            .then(res => {
                this.setState({ loading: false });
                let tempProjectList = [];

                if (res && res.data && res.data.Data && res.data.Data.ResultData) {
                    res.data.Data.ResultData.map(data => {
                        let dept = this.state.deptList.filter(dept => dept.Id === data.BusinessDept);

                        tempProjectList.push({
                            key:data.Id,
                            id: data.Id,
                            dept: (dept && dept.length > 0) ? dept[0].Name : '',
                            no: data.No,
                            name: data.Name,
                            pm: data.ProjectManager,
                            createdAt: data.CreateTimeStr,
                            createdBy: data.CreatedBy,
                            currentPhase: data.CurrentPhase,
                            status: Constants.getProjectStatusStr(data.Status)
                        })
                    })
                }

                this.setState({
                    projectList: tempProjectList //res.data.Data.ResultData
                });

                this.setState({
                    isSearching: false
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
                this.setState({
                    isSearching: false
                })
            });
    }

    onDeptChange(e) {
        this.setState({
            searchDeptId: e
        })
    }

    onStatusChange(e){
        this.setState({
            searchStatus: e
        })
    }

    onProjectNameChange(e) {
        this.setState({
            searchProjectName: e.target.value
        })
    }

    onProjectNoChange(e) {
        this.setState({
            searchProjectNo: e.target.value
        })
    }

    onPMChange(e) {
        this.setState({
            searchPM: e.target.value
        })
    }

    render() {
        let depts = this.state.deptList.map(dept => (
            <Option key={dept.Id} value={dept.Id}>{dept.Name}</Option>
          ));

        return <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24}>
                <Row gutter={8}>
                <Col span={4}>
                    部门：<Select style={{ width: '60%' }} onChange={this.onDeptChange.bind(this)}>
                    {depts}
                    </Select>
                </Col>
                <Col span={5}>
                    项目名称：<Input style={{ width: '70%' }} defaultValue={this.state.searchProjectName} onChange={this.onProjectNameChange.bind(this)} />
                </Col>
                <Col span={5}>
                    项目编号：<Input style={{ width: '60%' }} defaultValue={this.state.searchProjectNo} onChange={this.onProjectNoChange.bind(this)} />
                </Col>
                <Col span={3}>
                    状态：<Select defaultValue={this.state.searchStatus} style={{ width: '60%' }} onChange={this.onStatusChange.bind(this)}>
                    <Option value={-1}>--全部--</Option>
                    <Option value={0}>未启动</Option>
                    <Option value={1}>进行中</Option>
                    <Option value={2}>已完成</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    项目经理：<Input style={{ width: '60%' }} defaultValue={this.state.searchPM} onChange={this.onPMChange.bind(this)} />
                </Col>
                <Col span={3}>
                    <Button loading={this.state.isSearching} onClick={this.onSearch.bind(this)} type="primary">
                    搜索
                        </Button>
                </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                {
                    <Table
                        loading={this.state.loading}
                        dataSource={this.state.projectList}
                        columns={columns}
                        />
                }
                    
                </Row>
            </Col>

        </Row>;
    }
}

export default ProjectList;