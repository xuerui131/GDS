import React from 'react';
import { Row, Col, Form, Select, Input, Button, DatePicker } from 'antd';
import './UserForm.css';
const { Option } = Select;


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
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
        NameEN: Form.createFormField({
            ...props.NameEN,
            value: props.NameEN.value,
        }),
        StaffNo: Form.createFormField({
            ...props.StaffNo,
            value: props.StaffNo.value,
        }),
        UserName: Form.createFormField({
            ...props.UserName,
            value: props.UserName.value,
        }),
        Phone: Form.createFormField({
            ...props.Phone,
            value: props.Phone.value,
        }),
        Email: Form.createFormField({
            ...props.Email,
            value: props.Email.value,
        }),
        EntryDate: Form.createFormField({
            ...props.EntryDate,
            value: props.EntryDate.value,
        }),
        Sex: Form.createFormField({
            ...props.Sex,
            value: props.Sex.value,
        }),
        IDCard: Form.createFormField({
            ...props.IDCard,
            value: props.IDCard.value,
        }),
        // Images: Form.createFormField({
        //     ...props.Images,
        //     value: props.Images.value,
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
      <Form.Item label="姓名">
        {getFieldDecorator('Name', {
          rules: [{ required: true, message: '姓名为必填项!' }],
        })(<Input style={{width: '170px'}}/>)}
      </Form.Item>
      <Form.Item label="英文名">
        {getFieldDecorator('NameEN')(<Input style={{width: '170px'}}/>)}
      </Form.Item>
      <Form.Item label="工号">
        {getFieldDecorator('StaffNo', {
          rules: [{ required: true, message: '工号为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="帐号">
        {getFieldDecorator('UserName', {
          rules: [{ required: true, message: '帐号为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="手机">
        {getFieldDecorator('Phone', {
          rules: [{ required: true, message: '手机为必填项!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="邮箱">
        {getFieldDecorator('Email', {
          rules: [
              { required: true, message: '邮箱为必填项!' }
            ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="入职时间">
        {getFieldDecorator('EntryDate', {
          rules: [{ required: true, message: '入职时间为必填项!' }],
        })(<DatePicker/>)}
      </Form.Item>
      <Form.Item label="性别">
        {getFieldDecorator('Sex', {
          rules: [{ required: true, message: '性别为必填项!' }],
        })(<Select style={{width: '170px'}}>
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
        </Select>)}
      </Form.Item>
      <Form.Item label="身份证">
        {getFieldDecorator('IDCard', {
          rules: [{ required: true, message: '身份证为必填项!' }],
        })(<Input />)}
      </Form.Item>
      {/* <Form.Item label="用户图片">
        {getFieldDecorator('Images')(<Input />)}
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