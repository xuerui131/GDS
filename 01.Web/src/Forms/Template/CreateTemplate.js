import React, { Component } from 'react';
import { useStore } from "../../Store/useStore";

import { Steps, Button, message, Form, notification } from 'antd';

import './Template.css';

import TemplateStep1 from './Step1';
import TemplateStep2 from './Step2';
import TemplateStep3 from './Step3';
import Step4 from './Step4';

import axios from 'axios';
import { Constants }  from '../../Common/Constants';

const { Step } = Steps;

export const CreateTemplateHOC = props => {
    const {
        state
    } = useStore();

    console.log("state", state);
    return (
        <CreateTemplate token={state.user.token} {...props}></CreateTemplate>
    )
}

class CreateTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            step1Content: null,
            step2Content: null,
        };
    }

    next(stepContent) {
        const current = this.state.current + 1;

        //第一步的数据
        if(this.state.current === 0)
        {
            console.log(stepContent);
            this.setState({
                step1Content: stepContent
            })

            this.setState({ current });
        }
        //第二步的数据
        if(this.state.current === 1)
        {
            console.log("step2 value", stepContent);
            this.setState({
                step2Content: stepContent
            })
            this.setState({ current });
        }

        //第三步，提交数据库
        if(this.state.current === 2)
        {
            let body = {
                id:0,
                Name:this.state.step1Content.name,
                Description: this.state.step1Content.comment,
                DepartmentId: this.state.step1Content.deptId
            };
    
            let that = this;

            axios.post(`${Constants.APIBaseUrl}/Template/SaveTemplate`, body, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    console.log("save template response =>", res);

                    let templateId = res.data.Data;


                    this.saveStep2Values(templateId, this.state.step2Content, current);

                    //this.setState({ current });
                })
                .catch(function (error) {
                    console.log("login fail");
                    notification.open({
                        message: '保存失败',
                        description:
                          '保存模板基本信息失败',
                        onClick: () => {
                          //console.log('Notification Clicked!');
                        },
                        duration: 3
                      });
                });

        }
    }

    saveStep2Values(templateId, values, currentStep)
    {      
        console.log("step2 values to save:", values);
        
        let body = [];
        values.map(phaseValue => {
            body.push(
                {
                    id: 0,
                    templateId: parseInt(templateId),
                    name: phaseValue.name,
                    description: phaseValue.comment,
                    hasDocList: phaseValue.hasDocList,
                    hasLinkedForm: phaseValue.hasLinkedForm,
                    currentPhaseId: 0,
                    docListJson: phaseValue.docList ? JSON.stringify(phaseValue.docList) : "",
                    linkedFormJson: phaseValue.linkedForm ? JSON.stringify(phaseValue.linkedForm) : "",
                }
            );
        });       

        axios.post(`${Constants.APIBaseUrl}/TemplatePhase/SaveTemplatePhaseList`, body, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                console.log("result=>", res);

                //let templateId = res.data.Data;
                this.setState({ current: currentStep });

            })
            .catch(function (error) {
                console.log("save phase failed");
                notification.open({
                    message: '保存失败',
                    description:
                        '保存模板阶段信息失败',
                    onClick: () => {
                        //console.log('Notification Clicked!');
                    },
                    duration: 3
                });
            });

        // values.map(phaseValue => {
        //     let body = {
        //         id:0,
        //         templateId: parseInt(templateId),
        //         name: phaseValue.name,
        //         description: phaseValue.comment,
        //         hasDocList: phaseValue.hasDocList,
        //         hasLinkedForm: phaseValue.hasLinkedForm,
        //         currentPhaseId:0,
        //         docListJson: phaseValue.docList? JSON.stringify(phaseValue.docList) : "",
        //         linkedFormJson: phaseValue.linkedForm? JSON.stringify(phaseValue.linkedForm) : "",
        //     }

        //     console.log("step2 object to save:", body);

        //     axios.post(`${Constants.APIBaseUrl}/TemplatePhase/SaveTemplatePhase`, body, {
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        //         .then(res => {
        //             console.log("result=>", res);
    
        //             let templateId = res.data.Data;
    
        //             if(++count)
        //             {
        //                 this.setState({ current: currentStep });
        //             }
                    
        //         })
        //         .catch(function (error) {
        //             console.log("save phase failed");
        //             notification.open({
        //                 message: '保存失败',
        //                 description:
        //                   '保存模板阶段信息失败',
        //                 onClick: () => {
        //                   //console.log('Notification Clicked!');
        //                 },
        //                 duration: 3
        //               });
        //         });
        // });
        
    }

    prev(stepContent) {
        const current = this.state.current - 1;
        //第二步的数据
        if(this.state.current === 1)
        {
            console.log("step2 value", stepContent);
            this.setState({
                step2Content: stepContent
            })

            this.setState({ current });
        }

        this.setState({ current });
    }

    render() {
        console.log("props.token", this.props);

        const steps = [
            {
              title: '项目基础信息',
              content: <TemplateStep1 onNextStep={this.next.bind(this)} data={this.state.step1Content}></TemplateStep1>,
            },
            {
              title: '项目阶段设计',
              content: <TemplateStep2 onNextStep={this.next.bind(this)} onPreStep={this.prev.bind(this)}
               data={this.state.step2Content}></TemplateStep2>,
            },
            {
              title: '内容确认',
              content: <TemplateStep3 onNextStep={this.next.bind(this)} onPreStep={this.prev.bind(this)}
              data={this.state.step2Content}></TemplateStep3>,
            },
            {
              title: '完成',
              content: <Step4></Step4>,
            }
          ];

        const { current } = this.state;
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                {/* <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                </Button>
                    )}
                </div> */}
            </div>
        );
    }
}

//const CreateTemplate = Form.create()(EditableTable);

export default CreateTemplate;