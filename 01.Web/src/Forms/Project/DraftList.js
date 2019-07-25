import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input } from 'antd';
import axios from 'axios';

import { Constants }  from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

const { Option } = Select;

  const columns = [
    {
      title: '部门',
      dataIndex: 'dept',
      width: '8%',
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        width: '15%',        
    },
    {
        title: '项目编号',
        dataIndex: 'no',
        width: '10%',
        render: (name, record) => (
            <Link to={"/app/project/create/"+record.id}>{name}</Link>
          )
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
  ];

class DraftList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptList: [],
            draftList: [],
            loading: false,            
        };
    }

    componentWillMount() {       
        this.getDeptList();
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

    onSearch() {
        this.setState({
            loading: true
        })
        this.setState({ loading: true });
        axios.get(`${Constants.APIBaseUrl}/Project/GetDraftList`, {
            headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        })
            .then(res => {
                this.setState({ loading: false });
                let tempProjectList = [];

                if (res && res.data && res.data.Data && res.data.Data.ResultData) {
                    res.data.Data.ResultData.map(data => {
                        let dept = this.state.deptList.filter(dept => dept.Id === data.BusinessDept);

                        tempProjectList.push({
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
                    draftList: tempProjectList //res.data.Data.ResultData
                });

                this.setState({
                    loading: false
                })
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
                this.setState({
                    loading: false
                })
            });
    }

    render() {
        return <Table
        loading={this.state.loading}
        dataSource={this.state.draftList}
        columns={columns}
        />
    }
}

export default DraftList;