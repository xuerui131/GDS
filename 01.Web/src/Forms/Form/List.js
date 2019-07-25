import React, { Component } from 'react';
import { Button, Col, Row, Table, Form, Select, Input } from 'antd';

const { Option } = Select;

const dataSource= [
    {
      id: 1,
      type: 'IT',
      name: 'Portal DEV Project',
      createdAt: '2019-6-17',
      action: '操作'
    },
    {
        id: 2,
        type: 'Marketing',
        name: 'ERP DEV Project',
        createdAt: '2019-6-17',
        action: '操作'
      }
  ];

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      width: '7%',
    },
    {
      title: '类别',
      dataIndex: 'type',
      width: '8%',
    },
    {
        title: '表单名称',
        dataIndex: 'name',
        width: '20%',
        render: (name) => (
            <a href="javascript:void(0)">{name}</a>
          )
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: '15%',
    },
    {
      title: '操作',
      dataIndex: 'acion',
      width: '15%',
      render: (action) => (
        <a href="javascript:void(0)">预览</a>
      )
    }
  ];

class FormList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isResultVisible: false
        };
    }

    onSearch = ()=>{
        this.setState({
            isResultVisible: true
        });
    }

    render() {
        return <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col span={20}>
                <Row gutter={8}>
                    <Col span={6}>
                        类别：<Select style={{ width: 150 }} defaultValue="86">
                            <Option value="86">IT</Option>
                            <Option value="87">其他</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        名称：<Input style={{ width: "150px" }} />
                    </Col>
                    <Col span={4}>
                        <Button onClick={this.onSearch.bind(this)} type="primary">
                            搜索
                    </Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                {
                    this.state.isResultVisible?
                        <Table
                        dataSource={dataSource}
                        columns={columns}
                        /> : null
                }
                    
                </Row>
            </Col>

        </Row>;
    }
}

export default FormList;