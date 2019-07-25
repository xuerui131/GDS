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
        DepmentNo: Form.createFormField({
            ...props.DepmentNo,
            value: props.DepmentNo.value,
        }),
        Name: Form.createFormField({
            ...props.Name,
            value: props.Name.value,
        }),
        NameEN: Form.createFormField({
            ...props.NameEN,
            value: props.NameEN.value,
        }),
        Address: Form.createFormField({
            ...props.Address,
            value: props.Address.value,
        }),
        // Auditor: Form.createFormField({
        //     ...props.Auditor,
        //     value: props.Auditor.value,
        // }),
        // ChargePerson: Form.createFormField({
        //     ...props.ChargePerson,
        //     value: props.ChargePerson.value,
        // }),
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
      <Form.Item label="部门编号">
        {getFieldDecorator('DepmentNo', {
          rules: [{ required: true, message: '部门编号为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="部门名称">
        {getFieldDecorator('Name', {
          rules: [{ required: true, message: '部门名称为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="部门英文名">
        {getFieldDecorator('NameEN', {
          rules: [{ required: true, message: '部门英文名为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="公司地址">
        {getFieldDecorator('Address', {
          rules: [{ required: true, message: '公司地址为必填项!' }],
        })(<Input />)}
      </Form.Item>
      {/* <Form.Item label="审核人">
        {getFieldDecorator('Auditor', {
          rules: [{ required: true, message: 'Auditor is required!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="负责人">
        {getFieldDecorator('ChargePerson', {
          rules: [{ required: true, message: 'ChargePerson is required!' }],
        })(<Input />)}
      </Form.Item> */}
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