import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

import React, { Component } from 'react';

import axios from 'axios';

import { Constants }  from '../../Common/Constants';

const { Option } = Select;
const { TextArea } = Input;

const AutoCompleteOption = AutoComplete.Option;

class Step1 extends React.Component {
    state = {
       // confirmDirty: false,
        //autoCompleteResult: [],
        projectTypeList: []
    };

    componentDidMount() {
        if(this.props.data)
        {
            this.props.form.setFieldsValue({
                name: this.props.data.name
            })

            this.props.form.setFieldsValue({
                comment: this.props.data.comment
            })

            this.props.form.setFieldsValue({
                type: this.props.data.type
            })
        }
        // this.props.form.setFieldsValue({
        //   name: this.props.data.phaseName
        // })

        axios.get(`${Constants.APIBaseUrl}/ProjectType/GetProjectTypeList`, {
            headers: { 'Content-Type': 'application/json' }
          })
            .then(res => {
                this.setState({
                    projectTypeList: res.data.Data.ResultData
                })
            })
            .catch(function (error) {
                console.log(error);
            });
      }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                if(this.props.onNextStep)
                {
                    this.props.onNextStep(values);
                }
            }
        });
    };

    // handleConfirmBlur = e => {
    //     const value = e.target.value;
    //     this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
       // const { autoCompleteResult } = this.state;

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        // const prefixSelector = getFieldDecorator('prefix', {
        //     initialValue: '86',
        // })(
        //     <Select style={{ width: 70 }}>
        //         <Option value="86">+86</Option>
        //         <Option value="87">+87</Option>
        //     </Select>,
        // );

        // const websiteOptions = autoCompleteResult.map(website => (
        //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        // ));

        let projectTypes = this.state.projectTypeList.map(pt => (
            <Option value={pt.Id}>{pt.Name}</Option>
        ));

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{marginRight:"200px"}}>
                <Form.Item label="项目模板名称">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '请输入项目模板名称',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            项目模板备注&nbsp;
                        </span>
                    }
                >
                    {getFieldDecorator('comment', {
                        rules: [{ required: true, message: '请输入模板备注', whitespace: true }],
                    })(<TextArea rows={4} autosize={{minRows:4, maxRows:10}} />)}
                </Form.Item>
                <Form.Item label="所属类别名称">
                    {getFieldDecorator('type', {
                        rules: [{ required: true, message: '请选择所属类别' }],
                    })(
                        <Select style={{ width: 300 }}>
                           {projectTypes}
                        </Select>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        下一步
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const TemplateStep1 = Form.create({ name: 'register' })(Step1);

   export default TemplateStep1;