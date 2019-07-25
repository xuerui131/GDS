import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input } from 'antd';

const { Option } = Select;

const dataSource= [
    {
      id: 1,
      dept: 'IT',
      approver: 'Samuel Wu',
      action:'编辑'
    },
    {
        id: 2,
        dept: 'Finance',
        approver: 'XXX',
        action:'编辑'
      }
  ];

  const columns = [
    {
      title: '部们',
      dataIndex: 'dept',
      width: '25%',
    },
    {
      title: '审核人',
      dataIndex: 'approver',
      width: '50%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '15%',
      render: (dept) => (
        <a href="javascript:void(0)">编辑</a>
      )
    }
  ];

class FlowSetting extends React.Component {
    
    render() {
        return <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={20}>
            <Table
                        dataSource={dataSource}
                        columns={columns}
                        />
            </Col>

        </Row>;
    }
}

export default FlowSetting;