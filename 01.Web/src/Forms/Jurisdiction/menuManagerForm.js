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
  name: 'global_state_menu',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
        Name: Form.createFormField({
            ...props.Name,
            value: props.Name.value,
        }),
        MenuNo: Form.createFormField({
            ...props.MenuNo,
            value: props.MenuNo.value,
        }),
        MenuType: Form.createFormField({
            ...props.MenuType,
            value: props.MenuType.value,
        }),
        AccessUrl: Form.createFormField({
            ...props.AccessUrl,
            value: props.AccessUrl.value,
        }),
        UrlType: Form.createFormField({
            ...props.UrlType,
            value: props.UrlType.value,
        }),
        Sequence: Form.createFormField({
            ...props.Sequence,
            value: props.Sequence.value,
        }),
        IsShow: Form.createFormField({
            ...props.IsShow,
            value: props.IsShow.value,
        }),
        IsEnable: Form.createFormField({
            ...props.IsEnable,
            value: props.IsEnable.value,
        }),
        MenuIcon: Form.createFormField({
            ...props.MenuIcon,
            value: props.MenuIcon.value,
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
        <Form.Item label='菜单名称'>
            {getFieldDecorator('Name', {})(<Input />)}
        </Form.Item>
        <Form.Item label='菜单编号'>
            {getFieldDecorator('MenuNo', {})(<Input />)}            
        </Form.Item>
        <Form.Item label='菜单类型'>
            {getFieldDecorator('MenuType', {})(
                <Select style={{ width: '170px' }}>
                    <Option value={1}>直接页面</Option>
                    <Option value={2}>弹窗页面</Option>
                    <Option value={3}>内嵌页面</Option>
                </Select>
            )}
        </Form.Item>
        <Form.Item label='访问地址'>
            {getFieldDecorator('AccessUrl', {})(<Input />)}            
        </Form.Item>
        <Form.Item label='地址类型'>
            {getFieldDecorator('UrlType', {})(
                <Select style={{ width: '170px' }}>
                    <Option value={1}>内部地址</Option>
                    <Option value={2}>外部地址</Option>
                </Select>
            )}
        </Form.Item>
        <Form.Item label='菜单顺序'>
            {getFieldDecorator('Sequence', {})(<Input />)}            
        </Form.Item>
        <Form.Item label='是否显示'>
            {getFieldDecorator('IsShow', {})(
                <Select style={{ width: '170px' }}>
                    <Option value={1}>显示</Option>
                    <Option value={0}>隐藏</Option>
                </Select>
            )}
        </Form.Item>
        <Form.Item label='是否可用'>
            {getFieldDecorator('IsEnable', {})(
                <Select style={{ width: '170px' }}>
                    <Option value={1}>可用</Option>
                    <Option value={0}>不可用</Option>
                </Select>
            )}
        </Form.Item>
        <Form.Item label='菜单图标'>
            {getFieldDecorator('MenuIcon', {})(<Input />)}            
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