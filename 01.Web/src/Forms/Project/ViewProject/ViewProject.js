import React, { Component } from 'react';

import { Steps, Modal, Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

import axios from 'axios';

import { Constants } from '../../../Common/Constants';

import { Router, Route, Switch, Link } from 'react-router-dom';

import ViewProjectPhaseItem from './ViewProjectPhaseItem';

import ViewProjectForm from './ViewProjectForm';
import ViewProjectFormAMD from './ViewProjectFormAMD';

import ViewProjectAMDPhase5Form, {ViewProjectAMDPhase1, ViewProjectAMDPhase2, ViewProjectAMDPhase3, ViewProjectAMDPhase4 } from './ViewProjectPhaseItemAMD';

const { TabPane } = Tabs;

const { Option } = Select;
const { TextArea, Search } = Input;
const { Step } = Steps;

class ViewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetail: null,
            projectPhases: [],
            //projectPhasesAMD: [],
            //depts: [],
            isStarting: false,
            activeKey: "1",
        };        
    }

    initAMDProjectPhases(){
        let tempAMDPhases = [];

        //阶段1
        tempAMDPhases.push({
            id: 1
        })

        //阶段2
        tempAMDPhases.push({
            id: 2
        })

        //阶段3
        tempAMDPhases.push({
            id: 3
        })

        //阶段4
        tempAMDPhases.push({
            id: 4
        })

        //阶段5
        tempAMDPhases.push({
            id: 5
        })

        this.setState({
            projectPhases:tempAMDPhases
        })
    }
    
    componentWillMount() {     
        this.initAMDProjectPhases();

        //写在这里的话，即使直接访问http://localhost:3000/#/project/view/7
        //也可以生效
        //如果写在componentDidMount里面，直接访问上述链接，会Render，但不会调用componentDidMount
        let projectId = 0;
        if (this.props.match && this.props.match.params && this.props.match.params.projId) {
            projectId = parseInt(this.props.match.params.projId);
        }

        axios.get(`${Constants.APIBaseUrl}/project/GetProjectById?id=${projectId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({
                    projectDetail: res.data.Data
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });

        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/GetProjectPhaseList?projectId=${projectId}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phases =>", res);

                if(!res.data.Data.ResultData || res.data.Data.ResultData.length===0)
                {
                    return;
                }

                this.setState({
                    projectPhases: res.data.Data.ResultData
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("search fail");
            });
    }

    componentDidMount() {

    }

    onStartProject = e => {
        this.setState({
            isStarting: true
        })

        axios.get(`${Constants.APIBaseUrl}/Project/UpdateStatus?Id=${this.state.projectDetail.Id}&Status=${Constants.InProgress}&currentPhase=${this.state.projectPhases[0].Name}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project status update =>", res);

                let newProjectDetail = this.state.projectDetail;
                //已启动
                newProjectDetail.Status = 1;

                this.setState({
                    isStarting: false,
                    projectDetail: newProjectDetail
                });

                if (this.state.projectPhases && this.state.projectPhases.length > 0) {
                    this.startPhaseI(this.state.projectPhases[0].Id);
                }

            })
            .catch(function (error) {
                console.log(error);
                console.log("项目启动失败");
            });
    };

    //项目启动之后，将第一个阶段的状态设为启动
    startPhaseI(projectPhaseId) {
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${projectPhaseId}&Status=1`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);

                let newProjectPhases = this.state.projectPhases;
                //已启动
                newProjectPhases[0].Status = 1;

                let date = new Date();
                let dateStr = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2); //date.getDate();
                newProjectPhases[0].StartTimeStr = dateStr;

                this.setState({
                    projectPhases: newProjectPhases
                });
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段启动失败");
            });
    }

    afterCompletePhase(phaseId) {
        if (!phaseId) {
            return;
        }

        if (!this.state.projectPhases || this.state.projectPhases.length == 0) {
            return;
        }

        //status
        // null或0:未启动，1：已启动，2：已完成
        let newProjectPhases = this.state.projectPhases;
        for (let index = 0; index < newProjectPhases.length; index++) {
            if (newProjectPhases[index].Id == phaseId) {
                let date = new Date();
                let dateStr = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2); //date.getDate();

                debugger
                newProjectPhases[index].Status = 2;
                newProjectPhases[index].EndTimeStr = dateStr;

                if (index < (newProjectPhases.length - 1)) //当前完成的Phase后面还有Phase
                {
                    newProjectPhases[index + 1].Status = 1;
                    newProjectPhases[index + 1].StartTimeStr = dateStr;
                    axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${newProjectPhases[index + 1].Id}&Status=${Constants.InProgress}`, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                            console.log("project phase status update =>", res);
                        })
                        .catch(function (error) {
                            console.log(error);
                            console.log("阶段更新失败");
                        });


                    axios.get(`${Constants.APIBaseUrl}/Project/UpdateStatus?Id=${this.state.projectDetail.Id}&Status=${Constants.InProgress}&currentPhase=${newProjectPhases[index + 1].Name}`, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                            console.log("project phase status update =>", res);
                        })
                        .catch(function (error) {
                            console.log(error);
                            console.log("阶段更新失败");
                        });
                }
                else //当前的Phase已经是最后一个，设置Project的状态为2（已完成）
                {
                    axios.get(`${Constants.APIBaseUrl}/Project/UpdateStatus?Id=${this.state.projectDetail.Id}&Status=${Constants.Complete}&currentPhase=所有阶段已结束`, {
                        headers: { 'Content-Type': 'application/json' }
                    })
                        .then(res => {
                            let newProjectDetail = this.state.projectDetail;
                            //已完成
                            newProjectDetail.Status = 2;

                            this.setState({
                                projectDetail: newProjectDetail
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                            console.log("完成项目失败");
                        });
                }

                this.setState({
                    projectPhases: newProjectPhases
                });

                break;
            }
        }
    }

    canStartProject() {
        if (localStorage[Constants.UserTypeStr] == Constants.AdminRole || localStorage[Constants.UserTypeStr] == Constants.PMRole) {
            return true;
        }

        return false;
    }

    scrollToAnchor = (anchorName) => {
        console.log('anchorName', anchorName);

        if (this.state.activeKey !== "2") {
            this.setState({
                activeKey: "2"
            }, () => {
                if (anchorName) {
                    let anchorElement = document.getElementById(anchorName);
                    if (anchorElement) { anchorElement.scrollIntoView(); }
                }
            });

            return;
        }

        if (anchorName) {
            let anchorElement = document.getElementById(anchorName);
            if (anchorElement) { anchorElement.scrollIntoView(); }
        }
    }

    onActiveKeyChange = activeKey => {
        this.setState({ activeKey });
    };

    generateAMDPhases()
    {
        return (this.state.projectDetail && this.state.projectDetail.TemplateId === Constants.FixedTemplateId && this.state.projectPhases && this.state.projectPhases.length === 5)? 
        (
            <div>
            <div>
                <div key={1} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                    <div id='phase1'>阶段1
                        {/* <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span> */}
                        <span style={{ marginLeft: '50px' }}>结束时间：{this.state.projectPhases[0].EndTimeStr}</span>
                    </div>
                    {/* <amdPhases.ViewProjectAMDPhase1 data={phase} afterCompletePhase={this.afterCompletePhase.bind(this)}></amdPhases.ViewProjectAMDPhase1> */}
                    <ViewProjectAMDPhase1 data={this.state.projectPhases[0]} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectAMDPhase1>
                </div>
                <div key={2} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                    <div id='phase2'>阶段2
                        {/* <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span> */}
                        <span style={{ marginLeft: '50px' }}>结束时间：{this.state.projectPhases[1].EndTimeStr}</span>
                    </div>
                    <ViewProjectAMDPhase2 data={this.state.projectPhases[1]} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectAMDPhase2>
                </div>
                <div key={3} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                    <div id='phase3'>阶段3
                        {/* <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span>
                        <span style={{ marginLeft: '50px' }}>结束时间：{phase.EndTimeStr}</span> */}
                        <span style={{ marginLeft: '50px' }}>结束时间：{this.state.projectPhases[2].EndTimeStr}</span>
                    </div>
                    <ViewProjectAMDPhase3 data={this.state.projectPhases[2]} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectAMDPhase3>
                </div>
                <div key={4} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                    <div id='phase4'>阶段4
                        {/* <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span>
                        <span style={{ marginLeft: '50px' }}>结束时间：{phase.EndTimeStr}</span> */}
                        <span style={{ marginLeft: '50px' }}>结束时间：{this.state.projectPhases[3].EndTimeStr}</span>
                    </div>
                    <ViewProjectAMDPhase4 data={this.state.projectPhases[3]} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectAMDPhase4>
                </div>
                
            </div>
            <div key={5} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                    <div id='phase5'>阶段5
                    <span style={{ marginLeft: '50px' }}>结束时间：{this.state.projectPhases[4].EndTimeStr}</span>
                    </div>
                    <ViewProjectAMDPhase5Form data={this.state.projectPhases[4]} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectAMDPhase5Form>
                </div>
                </div>
        ): null;
    }

    render() {
        let height = window.innerHeight - 250;

        //此处的'phase'+orderNo作为锚点使用。点击顶部Steps的Title，可以导航到锚点
        let orderNo = 1;
        let phases = this.state.projectPhases.map(phase => (
            <div key={orderNo} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
                <div id={'phase' + orderNo}>阶段{orderNo++}
                    <span style={{ marginLeft: '50px' }}>开始时间：{phase.StartTimeStr}</span>
                    <span style={{ marginLeft: '50px' }}>结束时间：{phase.EndTimeStr}</span>
                </div>
                <ViewProjectPhaseItem data={phase} afterCompletePhase={this.afterCompletePhase.bind(this)}></ViewProjectPhaseItem>
            </div>
        ));

        //生成AMD阶段
        let phasesAMD = this.generateAMDPhases();
        
        let currentActivePhase = -1;
        let count = 0
        let headerSteps = this.state.projectPhases.map(phase => {

            let phaseId = 'phase' + (count + 1);

            if (phase.Status === Constants.InProgress) {
                currentActivePhase = count;
            }

            if (currentActivePhase == -1 && count == 0 && !phase.Status) //如果项目还未启动，第一个阶段的状态是wait
            {
                count++;
                return <Step key={count} title={<span>
                    <a href='javascript:void(0)' onClick={() => this.scrollToAnchor(phaseId)}>{phase.Name}</a>
                </span>} status='wait'></Step>
            }

            count++;
            
            if(phase.Status === Constants.Complete)
            {
                return <Step key={count} 
                title={<span>
                    <a href='javascript:void(0)' onClick={() => this.scrollToAnchor(phaseId)}>{phase.Name}</a>
                </span>}
                icon={<Icon type="check" style={{color:'#52c41a'}} />}
                ></Step>
            }

            return <Step key={count} title={<span>
                <a href='javascript:void(0)' onClick={() => this.scrollToAnchor(phaseId)}>{phase.Name}</a>
            </span>} ></Step>
        });

        let btnStartStyle = { width: '150px', right: '25px', marginTop: '10px' }
        // let depts = this.state.depts.map(dept => {
        //     return <Option value={dept.Id}>{dept.Name}</Option>
        // });

        return (
            this.state.projectDetail ?
                <div>
                    <div>
                        <Steps current={currentActivePhase}>
                            {headerSteps}
                        </Steps>

                    </div>
                    <div>
                        <Link to="/app/project/list" style={{ float: 'right', marginTop: '10px' }}>返回</Link>
                        <Tabs onChange={this.onActiveKeyChange.bind(this)} defaultActiveKey="1" activeKey={this.state.activeKey}>
                            <TabPane tab="基本信息" key="1">
                                <div style={{ overflow: "auto", height: `${height}px` }}>
                                    {                                       
                                        this.state.projectDetail.TemplateId === Constants.FixedTemplateId?
                                        <ViewProjectFormAMD projectDetail={this.state.projectDetail}></ViewProjectFormAMD> :
                                        <ViewProjectForm projectDetail={this.state.projectDetail}></ViewProjectForm>
                                    }
                                    
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        {this.state.projectDetail.Status == 0 ?
                                            <Button disabled={!this.canStartProject()} loading={this.state.isStarting} style={btnStartStyle} onClick={this.onStartProject.bind(this)} type="primary">启动</Button>
                                            : null}
                                        {
                                            this.state.projectDetail.Status == 1 ?
                                                <Button style={btnStartStyle} disabled type="primary">进行中</Button>
                                                : null
                                        }
                                        {
                                            this.state.projectDetail.Status == 2 ?
                                                <Button style={btnStartStyle} disabled type="primary">已完成</Button>
                                                : null
                                        }
                                    </div>

                                </div>
                            </TabPane>
                            <TabPane tab="项目阶段" key="2">
                                    {                                       
                                        this.state.projectDetail.TemplateId === Constants.FixedTemplateId?
                                        phasesAMD:
                                        phases
                                    }
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
                : null
        );
    }
}

export default ViewProject;