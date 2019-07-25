import React, { Component } from 'react';

import { Icon, Table, Input, Button, Card, Col, Row, Select, Form } from 'antd';
import axios from 'axios';
import { Constants }  from '../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';
import ProjectList from '../Project/ProjectList';
import FlowList from '../Flow/List';

// const { Option } = Select;

// const columns = [
//   // {
//   //   title: '序号',
//   //   dataIndex: 'id',
//   //   width: '7%',
//   // },
//   {
//     title: '部门',
//     dataIndex: 'dept',
//     width: '8%',
//   },
//   {
//       title: '项目名称',
//       dataIndex: 'name',
//       width: '20%',
//       render: (name, record) => (
//           <Link to={"/app/project/view/"+record.id}>{name}</Link>
//         )
//   },
//   {
//       title: '项目编号',
//       dataIndex: 'no',
//       width: '15%',
//   },
//   {
//       title: '创建时间',
//       dataIndex: 'createdAt',
//       width: '15%',
//   },
//   {
//       title: '项目经理',
//       dataIndex: 'pm',
//       width: '15%',
//   },
//   {
//       title: '当前状态',
//       dataIndex: 'status',
//       width: '10%',
//   },
//   // {
//   //   title: '当前阶段',
//   //   dataIndex: 'stage',
//   //   width: '15%',
//   // }
// ];

class Index extends React.Component {
  state={
    totalProjectCount: 0,
    notStartedProjectCount: 0,
    inProgressProjectCount: 0,
    completedProjectCount: 0,
    // deptList: [],
    // projectList: [],
    // searchDeptId:0,
    // searchProjectName:'',
    // searchProjectNo:'',
    // isSearching: false,
    isPendingItemsExpanded: false,  //待处理流程是否折叠
    isProjectsExpanded: false //项目列表是否折叠
  }

  componentWillMount(){
    axios.get(`${Constants.APIBaseUrl}/Project/GetProjectList`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
          this.setState({
            totalProjectCount: res.data.Data.ResultData.length,
            notStartedProjectCount: res.data.Data.ResultData.filter(proj => proj.Status == 0).length,
            inProgressProjectCount: res.data.Data.ResultData.filter(proj => proj.Status == 1).length,
            completedProjectCount: res.data.Data.ResultData.filter(proj => proj.Status == 2).length,
          });
      })
      .catch(function (error) {
          console.log(error);
          console.log("search fail");
      });
  }

  render() {
    const redCardStyle = {
      borderLeft: '5px',
      borderLeftColor:'red',
      borderStyle:'solid',
      borderRadius:'8px',
      color:'red'
    };

    const greenCardStyle = {
      borderLeft: '5px',
      borderLeftColor:'green',
      borderStyle:'solid',
      borderRadius:'8px',
      color:'green'
    };

    const orangeCardStyle = {
      borderLeft: '5px',
      borderLeftColor:'orange',
      borderStyle:'solid',
      borderRadius:'8px',
      color:'orange'
    };

    const blueCardStyle = {
      borderLeft: '5px',
      borderLeftColor:'blue',
      borderStyle:'solid',
      borderRadius:'8px',
      color:'blue'
    };

    let pendingItemsTitle = 
    this.state.isPendingItemsExpanded? <span>待处理流程<Icon style={{marginLeft:'3px'}} type="down" onClick={()=>{ this.setState({ isPendingItemsExpanded: false}) }}></Icon></span> 
    : <span>待处理流程<Icon style={{marginLeft:'3px'}} type="up" onClick={()=>{ this.setState({ isPendingItemsExpanded: true})}} ></Icon></span> 
  ;

    let projectTitle = 
      this.state.isProjectsExpanded? <span>项目列表<Icon style={{marginLeft:'3px'}} type="down" onClick={()=>{ this.setState({ isProjectsExpanded: false}) }}></Icon></span> 
      : <span>项目列表<Icon style={{marginLeft:'3px'}} type="up" onClick={()=>{ this.setState({ isProjectsExpanded: true})}} ></Icon></span> 
    ;

    return <Row gutter={16} style={{marginTop:'16px'}}>
    <Col span={24}>
      <Row gutter={8}>
        <Col span={6}>
            <Link to={"/app/project/list/"}>
              <Card title={<span style={{ color: greenCardStyle.color }}>项目总计</span>} style={greenCardStyle}>
                <span style={{ fontSize: '22px' }}>{this.state.totalProjectCount}</span>
              </Card>
            </Link>
        </Col>   
        <Col span={6}>
            <Link to={"/app/project/list/0"}>
              <Card title={<span style={{ color: blueCardStyle.color }}>未启动</span>} style={blueCardStyle}>
                <span style={{ fontSize: '22px' }}>{this.state.notStartedProjectCount}</span>
              </Card>
            </Link>
        </Col>    
        <Col span={6}>
            <Link to={"/app/project/list/1"}>
              <Card title={<span style={{ color: redCardStyle.color }}>进行中</span>} style={redCardStyle}>
                <span style={{ fontSize: '22px' }}>{this.state.inProgressProjectCount}</span>
              </Card>
            </Link>
        </Col>   
        <Col span={6}>
            <Link to={"/app/project/list/2"}>
              <Card title={<span style={{ color: orangeCardStyle.color }}>已完成</span>} style={orangeCardStyle}>
                <span style={{ fontSize: '22px' }}>{this.state.completedProjectCount}</span>
              </Card>
            </Link>
        </Col>    
        {/* <Col span={6}>
          <Card title={<span style={{color:blueCardStyle.color}}>我参与的</span>} style={blueCardStyle}>
          <span style={{fontSize:'22px'}}>6</span>
        </Card>
        </Col>     */}
      </Row>
      <Card title={pendingItemsTitle} bordered={false} style={{marginTop:'10px'}}>
        {
          this.state.isPendingItemsExpanded?
          <FlowList></FlowList>
          :null
        }
      </Card>
      <Card title={projectTitle} bordered={false} style={{marginTop:'0px'}}>
      {
        this.state.isProjectsExpanded? 
        <ProjectList></ProjectList>
        : null
      }
        
      </Card>
    </Col>
    {/* <Col span={8}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col> */}
  </Row>    ;
  }
}

const DashBoard = Form.create()(Index);

export default DashBoard;