import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input,Popconfirm, notification, } from 'antd';
import axios from 'axios';

import { Constants }  from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

const { Option } = Select;

class TemplateList extends React.Component {
    columns = [
        {
          title: '序号',
          dataIndex: 'id',
          width: '10%',
        },
        {
          title: '部门',
          dataIndex: 'dept',
          width: '15%',
        },
        {
            title: '模板名称',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '创建者',
            dataIndex: 'createdBy',
        },
        {
          title: '操作',
          dataIndex: 'oper',
          render: (text, record) =>{
            
            return <div>
            <Link to={"/app/template/view/"+record.id} style={{marginRight:'20px'}}>查看</Link>
            <Popconfirm title="确定删除?" onConfirm={() => {
                //console.log(text);
                console.log(record);
    
                this.onDelete(record.id);
            }}>
            <a href="javascript:;">删除</a>
          </Popconfirm></div>
          }
                
        }
      ];

    constructor(props) {
        super(props);

        this.state = {
            type: '',
            name: '',
            createBy: '',
            dataSource:[              
              ],
            //projectTypeList: [],
            isSearching: false,
            loading: false,

            department:[],
            deptId: ''
        };
    }

    componentDidMount() {
        // this.getProjectTypes();
 
         this.getDepartmentList();
         this.onSearch();
     }

      getDepartmentList(){
        axios.get(`${Constants.APIBaseUrl}/Department/GetAllDepartment`, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (!res || !res.data || !res.data.Data) {
                return;
            }
            let department = [];
            res.data.Data.forEach(item => {
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

    onNameChange = (e)=>
    {
        this.setState({
            name:e.target.value
        })
    }

    onCreateByChange = (e)=>
    {
        this.setState({
            createBy:e.target.value
        })
    }

    onDeptChange = (deptId)=>
    {
        this.setState({
            deptId
        })
    }

    onSearch = ()=>{
        this.setState({
            isSearching: true
        })
        this.setState({ loading: true });

        let that = this;
        axios.get(`${Constants.APIBaseUrl}/Template/GetTemplateList?DepartId=${this.state.deptId}&Name=${this.state.name}&CreateBy=${this.state.createBy}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ loading: false });
                console.log("result=>", res);
                let ds = [];
                res.data.Data.ResultData.map(item => {
                    ds.push({
                        id: item.Id,
                        dept: item.DepartmentName, //this.getProjectTypeStr(item.ProjectType), //item.ProjectType===1? "IT" :"其他",
                        name: item.Name,
                        desc: item.Description,
                        createdAt: item.CreateTimeStr,
                        createdBy:item.CreateBy
                  });
                })
                
                this.setState({
                    dataSource: ds,
                    isSearching: false
                });
              
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");

                that.setState({
                    isSearching: false
                })
            });
    }

    // getProjectTypeStr(projectTypeId)
    // {
    //     if(this.state.projectTypeList && Array.isArray(this.state.projectTypeList))
    //     {
    //         let projectType = this.state.projectTypeList.filter(pt => pt.Id == projectTypeId);

    //         if(projectType && projectType.length > 0)
    //         {
    //             return projectType[0].Name;
    //         }
    //     }

    //     return '';
    // }   

    // getProjectTypes()
    // {
    //     axios.get(`${Constants.APIBaseUrl}/ProjectType/GetProjectTypeList`, {
    //         headers: { 'Content-Type': 'application/json' }
    //       })
    //         .then(res => {
    //             this.setState({
    //                 projectTypeList: res.data.Data.ResultData
    //             })

    //             this.onSearch();
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    onDelete = (id) => {
        let that =this;
        axios.get(`${Constants.APIBaseUrl}/Template/DeleteTemplate?id=${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("result=>", res);
                that.onSearch();
            })
            .catch(function (error) {
                console.log(error);
                console.log("delete fail");
                notification.open({
                    message: '错误',
                    description:
                      '删除失败',
                    onClick: () => {
                      //console.log('Notification Clicked!');
                    },
                    duration: 3
                  });
    
                  return;
            });
    }

    render() {
        // let projectTypes = this.state.projectTypeList.map(pt => (
        //     <Option value={pt.Id}>{pt.Name}</Option>
        // ));

        let departmentOptions = this.state.department.map(p => <Option key={p.key} value={p.key}>{p.name}</Option>);

        return <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={24}>
                <Row gutter={8}>
                    <Col span={6}>
                        部门：<Select style={{ width: 150 }} defaultValue={this.state.deptId} onChange={this.onDeptChange.bind(this)} >
                            {departmentOptions}
                        </Select>
                    </Col>
                    <Col span={6}>
                        模板名称：<Input style={{ width: "150px" }} 
                            defaultValue={this.state.name} onChange={this.onNameChange.bind(this)} 
                        />
                    </Col>
                    <Col span={6}>
                        创建人：<Input style={{ width: "150px" }} 
                            defaultValue={this.state.createBy} onChange={this.onCreateByChange.bind(this)} 
                        />
                    </Col>
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
                        dataSource={this.state.dataSource}
                        columns={this.columns}
                        />
                }
                    
                </Row>
            </Col>

        </Row>;
    }
}

export default TemplateList;