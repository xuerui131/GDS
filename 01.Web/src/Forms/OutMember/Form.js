import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
};

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
        Name: Form.createFormField({
            ...props.Name,
            value: props.Name.value,
        }),
        Company: Form.createFormField({
            ...props.Company,
            value: props.Company.value,
        }),
        Phone: Form.createFormField({
            ...props.Phone,
            value: props.Phone.value,
        }),
        Email: Form.createFormField({
            ...props.Email,
            value: props.Email.value,
        }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
  const { getFieldDecorator } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        props.onSure();
      }
    });
  };
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="姓名">
        {getFieldDecorator('Name', {
          rules: [{ required: true, message: '姓名为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="公司">
        {getFieldDecorator('Company', {
        })(<Input />)}
      </Form.Item>
      <Form.Item label="手机">
        {getFieldDecorator('Phone', {
        })(<Input />)}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator('Email', {
        })(<Input />)}
      </Form.Item>
        <Row>
            <Col offset={19}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={props.submitLoading}>提交</Button>
                </Form.Item>
            </Col>
        </Row> 
    </Form>
  );
});

export default CustomizedForm;