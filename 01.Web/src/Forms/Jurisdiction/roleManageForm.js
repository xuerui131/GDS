import React from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
const { Option } = Select;

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
  name: 'global_state_role',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
        Name: Form.createFormField({
            ...props.Name,
            value: props.Name.value,
        }),
        RoleNo: Form.createFormField({
            ...props.RoleNo,
            value: props.RoleNo.value,
        }),
        Sequence: Form.createFormField({
            ...props.Sequence,
            value: props.Sequence.value,
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
        console.log(values);
        props.onSure(values);
      }
    });
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label='角色名称'>
            {getFieldDecorator('Name', {})(<Input />)}
        </Form.Item>
        <Form.Item label='权限编号'>
            {getFieldDecorator('RoleNo', {})(<Input />)}            
        </Form.Item>
        <Form.Item label='角色排序'>
            {getFieldDecorator('Sequence', {})(<Input />)}            
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