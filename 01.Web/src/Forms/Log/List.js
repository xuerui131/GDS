import React from 'react';
import { Row, Col, Button, Table, Divider, Modal, message, Form, Select, Input } from 'antd';
import { GetLogList } from '../../api/index';
class LogList extends React.Component {
    constructor() {
        super();

        this.state = {
            pageSize: 10,
            total: 0,
            dataSource: [],
            loading: false,
        }

        this.onChange = this.onChange.bind(this);

        this.columns = [
            {
              title: '操作人',
              dataIndex: 'Operator',
              key: 'Operator',
            },
            {
              title: '功能模块',
              dataIndex: 'OperationModule',
              key: 'OperationModule',
            },
            {
                title: '操作',
                dataIndex: 'OperationType',
                key: 'OperationType',
              },
              {
                title: '修改内容',
                dataIndex: 'OperationContent',
                key: 'OperationContent',
              },
              {
                title: '修改时间',
                dataIndex: 'OperationTime',
                key: 'OperationTime',
              },
              {
                title: '备注',
                dataIndex: 'Remark',
                key: 'Remark',
              },
        ];
    }

    onChange(page, pageSize) {
        this.getLogList(page, pageSize);
    }

    getLogList(page = 1, pageSize = 10) {
        this.setState({ loading: true });
        GetLogList(page, pageSize)
            .then(res => {
                console.log('--> 日志列表');
                console.log(res);
                this.setState({ loading: false });
                if(!res.Data) { return };
                const { ResultData, TotalRecords } = res.Data;
                ResultData.map(item => Object.assign(item, {
                    OperationTime: new Date(parseInt(item.OperationTime.substr(6, 13))).toLocaleDateString(),
                }));
                this.setState({ total: TotalRecords });
                this.setState({ dataSource: ResultData });
            })
    }

    componentDidMount() {
        this.getLogList();
    }

    render() {
        return (
            <Table
                rowKey={(record) => record.Id}
                loading={this.state.loading}
                dataSource={this.state.dataSource} 
                columns={this.columns}
                pagination={{
                    pageSize: this.state.pageSize,
                    total: this.state.total,
                    onChange: this.onChange,
                }}
                size="small" 
            />
        )
    }
}

export default LogList;