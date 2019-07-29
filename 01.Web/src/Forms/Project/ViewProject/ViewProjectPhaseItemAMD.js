import React, { Component } from 'react';

import { Tabs, Button, notification, Form, Input, Select, DatePicker, Upload, Icon, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

import { Constants } from '../../../Common/Constants';

import axios from 'axios';

import moment from 'moment';

const FieldStatus = "Status";
const FieldAMDContentJson = "AMDContentJson";

class DocUpload extends React.Component {
    state = {
      fileList: [
      ],
    };

    componentDidMount()
    {
        if(this.props.file)
        {
            let files = [];
            
            files.push({
                uid:1,
                name: this.props.file.name,
                status:'done',
                url: this.props.file.url
            });

            this.setState({
                fileList:files
            })
        }
    }

    // componentWillUpdate(){

    // }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps && nextProps.file)
        {
            let files = [];
            
            files.push({
                uid:1,
                name: nextProps.file.name,
                status:'done',
                url: nextProps.file.url
            });

            this.setState({
                fileList:files
            })
        }
    }

    handleChange = info => {

      let fileList = [...info.fileList];

      // 1.限制上传文件
      fileList = fileList.slice(-1);

      // 2. 读取返回数据
      fileList = fileList.map(file => {
        
        if (file.response) {
           
          file.url = file.response.Data;
          
        }
        return file;
      });

    
        this.setState({ fileList }, () => {
            if (fileList && fileList[0].status==="done"){//fileList.length > 0 && fileList[0].url) {
                if (this.props.afterUpload) {
                    this.props.afterUpload(fileList[0].name, fileList[0].url);
                }
            }
        });
    };

    render() {
      //  console.log("upload", this.props.record)
      const props = {
        action:  `${Constants.APIBaseUrl}/Home/UploadFile`,//'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: this.handleChange,
        multiple: false,
      };

      //进行中
      return (
        <Upload {...props} fileList={this.state.fileList}>
          <Button>
            <Icon type="upload" /> 上传
          </Button>
        </Upload>
      );
    }
  }

export class ViewProjectAMDPhase1 extends React.Component {
    state={
        isSaving: false,
        content: null
    }

    componentDidMount()
    {
        this.setState({
            content: this.props.data[FieldAMDContentJson]? JSON.parse(this.props.data[FieldAMDContentJson]) : {}
       }) 
    }

    afterUploadPlanFileHandler(planFileName, planFileUrl) {
        if(planFileName && planFileUrl)
        {
            let tempContent = this.state.content;
            tempContent.PlanFile = {
                name: planFileName,
                url: planFileUrl
            }

            this.setState({
                content: tempContent
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    afterUploadImplementFileHandler(impFileName, impFileUrl) {
        if(impFileName && impFileUrl)
        {
            let tempContent = this.state.content;
            tempContent.ImplementFile = {
                name: impFileName,
                url: impFileUrl
            }

            this.setState({
                content: tempContent
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    afterUploadSiteFileHandler(siteFileName, siteFileUrl) {
        if(siteFileName && siteFileUrl)
        {
            let tempContent = this.state.content;
            tempContent.SiteFile = {
                name: siteFileName,
                url: siteFileUrl
            }
            this.setState({
                content: tempContent
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    UpdateAMDContentJson()
    {        
        let amdContentJson = JSON.stringify(this.state.content);
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateAMDList?projectPhaseId=${this.props.data.Id}&amdContentJson=${amdContentJson}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {

            })
            .catch(function (error) {
                console.log(error);
                console.log("上传失败");
                notification.open({
                    message: '信息错误',
                    description:
                        '上传附件失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });

                return;
            });
    }

    completePhase(){       
        if(!this.state.content.PlanFile || !this.state.content.ImplementFile || !this.state.content.SiteFile){
            notification.open({
                message: '缺少必填项',
                description:
                  '请先上传进度计划、实施方案和场地规划',
                onClick: () => {
                },
                duration: 3
              });
            return;
        }

        this.setState({
            isSaving:true
        })
        let that = this;
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);
                this.setState({
                    isSaving:false
                })

                if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                that.setState({
                    isSaving:false
                })
            });
    }

    canCompletePhase()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    render() {
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

        if(!this.state.content)
        {
            return null;
        }
       
        return (
            <div>
                <Form {...formItemLayout}>
                    <div>
                        {this.props.data[FieldStatus] === 1 ? <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{ left: '80%' }} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[FieldStatus] === 2 ? <span style={{ display: 'block', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>已完成</span> : null}
                    </div>
                     <Form.Item label="项目阶段名称">
                        <span>立项</span>
                    </Form.Item>
                    <Form.Item label="项目进度计划">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.content.PlanFile} afterUpload={this.afterUploadPlanFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 ? <a href={this.state.content.PlanFile.url} target="_blank" style={{display:'block'}}>{this.state.content.PlanFile.name}</a> : null}
                    </Form.Item>
                    <Form.Item label="项目实施方案">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.content.ImplementFile} afterUpload={this.afterUploadImplementFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 ? <a href={this.state.content.ImplementFile.url} target="_blank" style={{display:'block'}}>{this.state.content.ImplementFile.name}</a> : null}
                    </Form.Item>
                    <Form.Item label="场地规划图">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.content.SiteFile} afterUpload={this.afterUploadSiteFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 ? <a href={this.state.content.SiteFile.url} target="_blank" style={{display:'block'}}>{this.state.content.SiteFile.name}</a> : null}
                    </Form.Item>
                </Form>
               
            </div>
        );
    }
}


export class ViewProjectAMDPhase2 extends React.Component {
    state={
        isSaving: false,
        purchaseStartAt: null, //采购发起时间
        expectedArriveAt: null, //预计到货时间
        arriveAt: null, //实际到货时间
        file: null
    }

    componentDidMount()
    {
        if(!this.props.data || !this.props.data.AMDContentJson)
        {
            return;
        }

        let content = JSON.parse(this.props.data.AMDContentJson);
        let file = content.file? content.file : null;
        this.setState({
            purchaseStartAt: content.purchaseStartAt? content.purchaseStartAt.substring(0, 10) : null,
            expectedArriveAt: content.expectedArriveAt? content.expectedArriveAt.substring(0, 10) : null,
            arriveAt: content.arriveAt? content.arriveAt.substring(0, 10) : null,
            file
       }) 
    }
    
    completePhase(){
        // if(!this.state.purchaseStartAt || !this.state.expectedArriveAt  || !this.state.arriveAt)
        // {
        //     notification.open({
        //         message: '缺少必填项',
        //         description:
        //           '请先填写：采购发起时间、预计到货时间、实际到货时间',
        //         onClick: () => {
        //         },
        //         duration: 3
        //       });
        //     return;
        // }

        this.setState({
            isSaving:true
        })
        let that = this;
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);
                this.setState({
                    isSaving:false
                })

                 if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                that.setState({
                    isSaving:false
                })
            });
    }

    afterUploadFileHandler(fileName, fileUrl) {
        if(fileName && fileUrl)
        {
            let file = {
                name: fileName,
                url: fileUrl
            }
            this.setState({
                file
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    UpdateAMDContentJson()
    {        
        let content = {
            purchaseStartAt: this.state.purchaseStartAt, //采购发起时间
            expectedArriveAt: this.state.expectedArriveAt, //预计到货时间
            arriveAt: this.state.arriveAt, //实际到货时间
            file: this.state.file
        }
        let amdContentJson = JSON.stringify(content);
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateAMDList?projectPhaseId=${this.props.data.Id}&amdContentJson=${amdContentJson}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                // if(this.props.afterCompletePhase)
                // {
                //     this.props.afterCompletePhase(this.props.data.Id);
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    canCompletePhase()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    render() {
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

        return (
            <Form {...formItemLayout}>
                    <div>
                        {this.props.data[FieldStatus] === 1 ? <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{ left: '80%' }} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[FieldStatus] === 2 ? <span style={{ display: 'block', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>已完成</span> : null}
                    </div>
                     <Form.Item label="项目阶段名称">
                        <span>采购备货</span>
                    </Form.Item>
                    <Form.Item label="采购发起时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                purchaseStartAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.purchaseStartAt ? moment(this.state.purchaseStartAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.purchaseStartAt ? moment(this.state.purchaseStartAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="预计到货时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                expectedArriveAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.expectedArriveAt ? moment(this.state.expectedArriveAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.expectedArriveAt ? moment(this.state.expectedArriveAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="实际到货时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                arriveAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.arriveAt ? moment(this.state.arriveAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.arriveAt ? moment(this.state.arriveAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="采购文件">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.file} afterUpload={this.afterUploadFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 && this.state.file ? <a href={this.state.file.url} target="_blank" style={{display:'block'}}>{this.state.file.name}</a> : null}
                    </Form.Item>
            </Form>          
        );
    }
}


export class ViewProjectAMDPhase3 extends React.Component {
    state={
        isSaving: false,
        impStartAt: null, //实施开始时间
        impEndAt: null, //实施完成时间
        file: null
    }

    componentDidMount()
    {
        if(!this.props.data || !this.props.data.AMDContentJson)
        {
            return;
        }

        let content = JSON.parse(this.props.data.AMDContentJson);
        let file = content.file? content.file : null;
        this.setState({
            impStartAt: content.impStartAt? content.impStartAt.substring(0, 10) : null,
            impEndAt: content.impEndAt? content.impEndAt.substring(0, 10) : null,
            file
       }) 
    }

    completePhase(){
        this.setState({
            isSaving:true
        })
        let that = this;
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);
                this.setState({
                    isSaving:false
                })

                 if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                that.setState({
                    isSaving:false
                })
            });
    }

    afterUploadFileHandler(fileName, fileUrl) {
        if(fileName && fileUrl)
        {
            let file = {
                name: fileName,
                url: fileUrl
            }
            this.setState({
                file
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    UpdateAMDContentJson()
    {        
        let content = {
            impStartAt: this.state.impStartAt, //实施开始时间
            impEndAt: this.state.impEndAt, //实施完成时间
            file: this.state.file
        }
        let amdContentJson = JSON.stringify(content);
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateAMDList?projectPhaseId=${this.props.data.Id}&amdContentJson=${amdContentJson}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    canCompletePhase()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    render() {
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

        return (
            <Form {...formItemLayout}>
                    <div>
                        {this.props.data[FieldStatus] === 1 ? <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{ left: '80%' }} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[FieldStatus] === 2 ? <span style={{ display: 'block', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>已完成</span> : null}
                    </div>
                     <Form.Item label="项目阶段名称">
                        <span>实施</span>
                    </Form.Item>
                    <Form.Item label="实施开始时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                impStartAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.impStartAt ? moment(this.state.impStartAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.impStartAt ? moment(this.state.impStartAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="实施完成时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                impEndAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.impEndAt ? moment(this.state.impEndAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.impEndAt ? moment(this.state.impEndAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="附件">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.file} afterUpload={this.afterUploadFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 && this.state.file ? <a href={this.state.file.url} target="_blank" style={{display:'block'}}>{this.state.file.name}</a> : null}
                    </Form.Item>
            </Form>          
        );
    }
}

export class ViewProjectAMDPhase4 extends React.Component {
    state={
        isSaving: false,
        testedAt: null, //测试完成时间
        file: null
    }

    componentDidMount()
    {
        if(!this.props.data || !this.props.data.AMDContentJson)
        {
            return;
        }

        let content = JSON.parse(this.props.data.AMDContentJson);
        let file = content.file? content.file : null;
        this.setState({
            testedAt: content.testedAt? content.testedAt.substring(0, 10) : null,
            file
       }) 
    }

    completePhase(){
        this.setState({
            isSaving:true
        })
        let that = this;
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);
                this.setState({
                    isSaving:false
                })

                 if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                that.setState({
                    isSaving:false
                })
            });
    }

    afterUploadFileHandler(fileName, fileUrl) {
        if(fileName && fileUrl)
        {
            let file = {
                name: fileName,
                url: fileUrl
            }
            this.setState({
                file
            }, ()=>{
                this.UpdateAMDContentJson();
            })
        }
    }

    UpdateAMDContentJson()
    {        
        let content = {
            testedAt: this.state.testedAt, //测试完成时间
            file: this.state.file
        }
        let amdContentJson = JSON.stringify(content);
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateAMDList?projectPhaseId=${this.props.data.Id}&amdContentJson=${amdContentJson}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    canCompletePhase()
    {
        if(localStorage[Constants.UserTypeStr]==Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

    render() {
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

        return (
            <Form {...formItemLayout}>
                    <div>
                        {this.props.data[FieldStatus] === 1 ? <Button disabled={!this.canCompletePhase()} loading={this.state.isSaving} style={{ left: '80%' }} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                        {this.props.data[FieldStatus] === 2 ? <span style={{ display: 'block', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>已完成</span> : null}
                    </div>
                     <Form.Item label="项目阶段名称">
                        <span>测试</span>
                    </Form.Item>
                    <Form.Item label="测试完成时间">
                      { this.props.data[FieldStatus] === 1 ? 
                        <DatePicker onChange={(e) => {
                            this.setState({
                                testedAt:e
                            }, ()=>{ 
                                this.UpdateAMDContentJson();
                            })
                        }} value={this.state.testedAt ? moment(this.state.testedAt) : null}></DatePicker> : null}
                      { this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.testedAt ? moment(this.state.testedAt) : null}></DatePicker> : null}
                    </Form.Item>
                    <Form.Item label="附件">
                      { this.props.data[FieldStatus] === 1 ? <DocUpload file={this.state.file} afterUpload={this.afterUploadFileHandler.bind(this)}></DocUpload> : null}
                      { this.props.data[FieldStatus] === 2 && this.state.file ? <a href={this.state.file.url} target="_blank" style={{display:'block'}}>{this.state.file.name}</a> : null}
                    </Form.Item>
            </Form>          
        );
    }
}

class ViewProjectAMDPhase5 extends React.Component {
    state={
        isSaving: false,
        content: {}
    }

    componentDidMount()
    {
        if(!this.props.data.AMDContentJson)
        {
            return;
        }

        let content = JSON.parse(this.props.data.AMDContentJson);
        this.setState({
            content
        })

    }
    
    completePhase(){
        this.setState({
            isSaving:true
        })
        let that = this;
        axios.get(`${Constants.APIBaseUrl}/ProjectPhase/UpdateStatus?Id=${this.props.data.Id}&Status=${Constants.Complete}`, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("project phase status update =>", res);               
                 if(this.props.afterCompletePhase)
                {
                    this.props.afterCompletePhase(this.props.data.Id);
                }
            })
            .catch(function (error) {
                console.log(error);
                console.log("阶段更新失败");
                that.setState({
                    isSaving:false
                })
            });
    }

    UpdateAMDContentJson(values)
    {        
        let content = {
          ...values
        }

        let amdContentJson = JSON.stringify(content);
       
        let body = {
            projectPhaseId: this.props.data.Id,
            amdContentJson
        }

        let that = this;

        axios.post(`${Constants.APIBaseUrl}/ProjectPhase/UpdateAMDList`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                notification.open({
                    message: '提示',
                    description:
                        '保存成功',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });

                this.setState({
                    isSaving: false
                })
            })
            .catch(function (error) {
                console.log(error);
                that.setState({
                    isSaving:false
                })

            });
    }

    

    Submit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                this.UpdateAMDContentJson(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form {...formItemLayout}>
                <div>
                    {this.props.data[FieldStatus] === 1 ? <Button disabled={!canCompletePhase()} loading={this.state.isSaving} style={{ left: '80%' }} type="primary" onClick={this.completePhase.bind(this)}>完成阶段</Button> : null}
                    {this.props.data[FieldStatus] === 2 ? <span style={{ display: 'block', textAlign: 'right', color: 'green', fontWeight: 'bold' }}>已完成</span> : null}
                </div>
                <Form.Item label="项目阶段名称">
                    <span>验收&amp;转运维</span>
                </Form.Item>
                <Row>
                    <Col span={8} style={leftFormTopItemStyle}>
                        <Form.Item label="实际验收时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('checkedAt', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写实际验收时间',
                                        },
                                    ],
                                    initialValue: this.state.content.checkedAt ? moment(this.state.content.checkedAt) : null
                                })(<DatePicker></DatePicker>) : null}
                            {this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.content.checkedAt ? moment(this.state.content.checkedAt) : null}></DatePicker> : null}
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormTopItemStyle}>
                        <Form.Item label="计费开始时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('chargeAt', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写计费开始时间',
                                        },
                                    ],
                                    initialValue: this.state.content.chargeAt ? moment(this.state.content.chargeAt) : null
                                })(<DatePicker></DatePicker>) : null}
                            {this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.content.chargeAt ? moment(this.state.content.chargeAt) : null}></DatePicker> : null}
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormTopItemStyle}>
                        <Form.Item label="计费结束时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('chargeEndAt', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写计费结束时间',
                                        },
                                    ],
                                    initialValue: this.state.content.chargeEndAt ? moment(this.state.content.chargeEndAt) : null
                                })(<DatePicker></DatePicker>) : null}
                            {this.props.data[FieldStatus] === 2 ? <DatePicker disabled value={this.state.content.chargeEndAt ? moment(this.state.content.chargeEndAt) : null}></DatePicker> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <Form.Item label="是否整栋楼客户">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('isWholeBuildingCustomer', {
                                    initialValue: this.state.content.isWholeBuildingCustomer ? this.state.content.isWholeBuildingCustomer : 2
                                })(<Radio.Group>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>) : null}
                            {this.props.data[FieldStatus] === 2 ? <Radio.Group disabled value={this.state.content.isWholeBuildingCustomer}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group> : null}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                       
                    </Col>
                </Row>
                <Row>
                    <Col span={8} style={leftFormItemStyle}>
                        <Form.Item label="机房">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('machineRoom', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写机房',
                                        },
                                    ],
                                    initialValue: this.state.content.machineRoom ? this.state.content.machineRoom : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.machineRoom} /> : null}
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormItemStyle}>
                        <Form.Item label="机柜数">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('cabinet', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写机柜数',
                                        },
                                    ],
                                    initialValue: this.state.content.cabinet ? this.state.content.cabinet : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.cabinet} /> : null}
                        </Form.Item>
                    </Col>
                    <Col span={8} style={rightFormItemStyle}>
                        <Form.Item label="机柜号">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('cabinetNo', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写机柜号',
                                        },
                                    ],
                                    initialValue: this.state.content.cabinetNo ? this.state.content.cabinetNo : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.cabinetNo} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 配电 - 开始*/}
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>配电</div>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="供电可靠性">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('powerAvailability', {
                                    rules: [
                                        {/* {
                                            required: true,
                                            message: '请填写机柜数',
                                        }, */}
                                    ],
                                    initialValue: this.state.content.powerAvailability ? this.state.content.powerAvailability : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.powerAvailability} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="供冷可靠性：">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('coolingAvailability', {
                                    rules: [
                                        {/* {
                                            required: true,
                                            message: '请填写机柜数',
                                        }, */}
                                    ],
                                    initialValue: this.state.content.coolingAvailability ? this.state.content.coolingAvailability : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.coolingAvailability} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="UPS时间：">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('upsTime', {
                                    rules: [
                                        {/* {
                                            required: true,
                                            message: '请填写机柜数',
                                        }, */}
                                    ],
                                    initialValue: this.state.content.upsTime ? this.state.content.upsTime : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.upsTime} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="UPS冗余：">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('upsRedundance', {
                                    rules: [
                                        {/* {
                                            required: true,
                                            message: '请填写机柜数',
                                        }, */}
                                    ],
                                    initialValue: this.state.content.upsRedundance ? this.state.content.upsRedundance : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.upsRedundance} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="发电机组：">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('generatorGroup', {
                                    rules: [
                                        {/* {
                                            required: true,
                                            message: '请填写机柜数',
                                        }, */}
                                    ],
                                    initialValue: this.state.content.generatorGroup ? this.state.content.generatorGroup : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.generatorGroup} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                 {/* 配电 - 结束*/}


                  {/* 空调 - 开始*/}
                  <Row>
                    <Col span={12} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>空调</div>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="空调标准">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('airconditioner', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.airconditioner ? this.state.content.airconditioner : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.airconditioner} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={leftFormItemStyle}>
                    </Col>
                    <Col span={12} style={rightFormItemStyle}>
                        <Form.Item label="空调冗余">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('airconditionerRedundance', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.airconditionerRedundance ? this.state.content.airconditionerRedundance : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.airconditionerRedundance} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 空调 - 结束*/}


                {/* 机房环境 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>机房环境</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>温度</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上限">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('upperLimitTemperature', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.upperLimitTemperature ? this.state.content.upperLimitTemperature : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.upperLimitTemperature} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="下限">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('downLimitTemperature', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.downLimitTemperature ? this.state.content.downLimitTemperature : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.downLimitTemperature} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更多">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('moreTemperature', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.moreTemperature ? this.state.content.moreTemperature : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.moreTemperature} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>湿度</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上限">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('upperLimitHumidity', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.upperLimitHumidity ? this.state.content.upperLimitHumidity : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.upperLimitHumidity} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="下限">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('downLimitHumidity', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.downLimitHumidity ? this.state.content.downLimitHumidity : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.downLimitHumidity} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更多">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('moreHumidity', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.moreHumidity ? this.state.content.moreHumidity : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.moreHumidity} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>更多</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="电磁屏蔽">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('emc', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.emc ? this.state.content.emc : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.emc} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="粉尘">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('powder', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.powder ? this.state.content.powder : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.powder} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="流明">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('lumen', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.lumen ? this.state.content.lumen : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.lumen} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="文字">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('text', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.text ? this.state.content.text : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.text} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 机房环境 - 结束*/}

                 {/* 消防 - 开始*/}
                 <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}>消防</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>系统</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="FM200">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('fm200', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.fm200 ? this.state.content.fm200 : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.fm200} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}>侦测</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="常规报警系统">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('normalAlarmSystem', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.normalAlarmSystem ? this.state.content.normalAlarmSystem : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.normalAlarmSystem} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'20px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{fontSize:'16px', textAlign:'center'}}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="控制系统">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('controlSystem', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.controlSystem ? this.state.content.controlSystem : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ? 
                                <Input disabled value={this.state.content.controlSystem} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                  {/* 消防 - 结束*/}

                {/* 变更管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>变更管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="提前通知时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('notifyTime', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.notifyTime ? this.state.content.notifyTime : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.notifyTime} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="一般变更窗口">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('windowTime', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.windowTime ? this.state.content.windowTime : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.windowTime} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="响应时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('responseTime', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.responseTime ? this.state.content.responseTime : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.responseTime} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 变更管理 - 结束*/}

                {/* 事件管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>事件管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="响应时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('responseTime2', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.responseTime2 ? this.state.content.responseTime2 : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.responseTime2} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 事件管理 - 结束*/}

                {/* 服务报告 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>服务报告</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="是否需要">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('needServiceReport', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.needServiceReport ? this.state.content.needServiceReport : 2
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </Radio.Group>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Radio.Group disabled value={this.state.content.needServiceReport}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="标准模板">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('standardTemplate', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.standardTemplate ? this.state.content.standardTemplate : 2
                                })(
                                    <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </Radio.Group>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Radio.Group disabled value={this.state.content.standardTemplate}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="提交方式">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('submitWay', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.submitWay ? this.state.content.submitWay : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.submitWay} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 服务报告 - 结束*/}

                 {/* 资产管理 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>资产管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="资产管理">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('capitalManagement', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.capitalManagement ? this.state.content.capitalManagement : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.capitalManagement} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 资产管理 - 结束*/}

                {/* IT巡检 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>IT巡检</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="IT巡检">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('itInspect', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.itInspect ? this.state.content.itInspect : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.itInspect} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* IT巡检 - 结束*/}

                {/* IT服务 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>IT服务</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}>标准服务</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="设备开关机">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('deviceTurnOnOff', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.deviceTurnOnOff ? this.state.content.deviceTurnOnOff : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.deviceTurnOnOff} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="设备重启">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('deviceReboot', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.deviceReboot ? this.state.content.deviceReboot : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.deviceReboot} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="插拔线路">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('plugLine', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.plugLine ? this.state.content.plugLine : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.plugLine} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="状态查看">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('statusCheck', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.statusCheck ? this.state.content.statusCheck : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.statusCheck} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}>定制服务</div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="厂商现场陪同">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('vendorOnSite', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.vendorOnSite ? this.state.content.vendorOnSite : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.vendorOnSite} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="上下架">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('onOffShelf', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.onOffShelf ? this.state.content.onOffShelf : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.onOffShelf} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="综合布线">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('comprehensiveLineDistribution', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.comprehensiveLineDistribution ? this.state.content.comprehensiveLineDistribution : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.comprehensiveLineDistribution} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="介质磁带">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('materialTape', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.materialTape ? this.state.content.materialTape : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.materialTape} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="备件存放">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('backupStorage', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.backupStorage ? this.state.content.backupStorage : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.backupStorage} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="代收代发">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('onbehalfDelivery', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.onbehalfDelivery ? this.state.content.onbehalfDelivery : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.onbehalfDelivery} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="更换配件">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('changeParts', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.changeParts ? this.state.content.changeParts : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.changeParts} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* IT服务 - 结束*/}

                 {/* 门禁/机柜锁管理 - 开始*/}
                 <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>门禁/机柜锁管理</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('exclusiveZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.exclusiveZone ? this.state.content.exclusiveZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.exclusiveZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('nonExclusiveZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.nonExclusiveZone ? this.state.content.nonExclusiveZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.nonExclusiveZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="授权范围">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('authorizedZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.authorizedZone ? this.state.content.authorizedZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.authorizedZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 门禁/机柜锁管理 - 结束*/}

                {/* CCTV - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>CCTV</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="公共区域">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('publicZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.publicZone ? this.state.content.publicZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.publicZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="机房区域">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('machineZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.machineZone ? this.state.content.machineZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.machineZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('cctvExclusiveZone', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.cctvExclusiveZone ? this.state.content.cctvExclusiveZone : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.cctvExclusiveZone} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="专属区域存储模式">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('cctvExclusiveZoneStorage', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.cctvExclusiveZoneStorage ? this.state.content.cctvExclusiveZoneStorage : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.cctvExclusiveZoneStorage} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* CCTV - 结束*/}


                {/* 门禁系统 - 开始*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>门禁系统</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="记录保存时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('recordPreservedPeriod', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.recordPreservedPeriod ? this.state.content.recordPreservedPeriod : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.recordPreservedPeriod} /> : null}
                        </Form.Item>
                    </Col>
                </Row>                                
                {/* 门禁系统 - 结束*/}


                {/* 资产归属 - 结束*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>资产归属</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="机柜">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('machineShelf', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.machineShelf ? this.state.content.machineShelf : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.machineShelf} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="PDU">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('pdu', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.pdu ? this.state.content.pdu : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.pdu} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="门禁系统">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('doorGuard', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.doorGuard ? this.state.content.doorGuard : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.doorGuard} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="CCTV">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('cctv', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.cctv ? this.state.content.cctv : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.cctv} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="IT设备">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('itDevice', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.itDevice ? this.state.content.itDevice : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.itDevice} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 资产归属 - 结束*/}


                {/* 其他 - 结束*/}
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}>其他</div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="合约罚款">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('contactPenalty', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.contactPenalty ? this.state.content.contactPenalty : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.contactPenalty} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="总包电量">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('totalFreePower', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.totalFreePower ? this.state.content.totalFreePower : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.totalFreePower} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="空置机柜数">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('unusedShelves', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.unusedShelves ? this.state.content.unusedShelves : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.unusedShelves} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="最少保底机柜数">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('shelfDownLimit', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.shelfDownLimit ? this.state.content.shelfDownLimit : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.shelfDownLimit} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="GDS承诺供电">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('gdsPromisedElectricity', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.gdsPromisedElectricity ? this.state.content.gdsPromisedElectricity : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.gdsPromisedElectricity} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="合约PUE">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('contractPUE', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.contractPUE ? this.state.content.contractPUE : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.contractPUE} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="超电单价">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('overchargeUnitPrice', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.overchargeUnitPrice ? this.state.content.overchargeUnitPrice : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.overchargeUnitPrice} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="空置单价">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('emptyUnitPrice', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.emptyUnitPrice ? this.state.content.emptyUnitPrice : null
                                })(
                                    <InputNumber ></InputNumber>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <InputNumber disabled value={this.state.content.emptyUnitPrice} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="最早进入保底时间">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('guaranteedTime', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.guaranteedTime ? this.state.content.guaranteedTime : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.guaranteedTime} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '20px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={4} style={leftFormItemStyle}>
                        <div style={{ fontSize: '16px', textAlign: 'center' }}></div>
                    </Col>
                    <Col span={16} style={rightFormItemStyle}>
                        <Form.Item label="GDS供电上线">
                            {this.props.data[FieldStatus] === 1 ?
                                getFieldDecorator('gdsPowerSupplyTopLimit', {
                                    rules: [
                                    ],
                                    initialValue: this.state.content.gdsPowerSupplyTopLimit ? this.state.content.gdsPowerSupplyTopLimit : null
                                })(
                                    <Input ></Input>
                                ) : null}
                            {this.props.data[FieldStatus] === 2 ?
                                <Input disabled value={this.state.content.gdsPowerSupplyTopLimit} /> : null}
                        </Form.Item>
                    </Col>
                </Row>
                {/* 其他 - 结束*/}

                <Row>
                        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
                        {this.props.data[FieldStatus] === 1 ?
                            <Button loading={this.state.isSaving} type="primary" onClick={this.Submit.bind(this)}>
                                提交
                            </Button>
                        : null}
                        </Col>
                    </Row>
            </Form>           
        );
    }
}

const ViewProjectAMDPhase5Form = Form.create()(ViewProjectAMDPhase5);
export default ViewProjectAMDPhase5Form;


const canCompletePhase = () =>
    {
        if(localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]==Constants.PMRole)
        {
            return true;
        }

        return false;
    }

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

const leftFormTopItemStyle = {
    border: 'solid',
    height: '65px',
    borderRight: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const leftFormItemStyle = {
    border: 'solid',
    height: '65px',
    borderRight: 'none',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const leftTextAreaFormItemStyle = {
    border: 'solid',
    height: '115px',
    borderRight: 'none',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightTextAreaFormItemStyle = {
    border: 'solid',
    height: '115px',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightFormTopItemStyle = {
    border: 'solid',
    height: '65px',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}

const rightFormItemStyle = {
    border: 'solid',
    height: '65px',
    borderTop: 'none',
    padding: '0 20px 0 0',
    borderColor: 'grey',
    borderWidth: '1px'
}