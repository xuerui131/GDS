import React from 'react';
import { Row, Col, Button, Table, Divider, Modal, message, Form, Select, Input } from 'antd';
import CustomizedForm from './Form';
import { 
    GetOutMemberInfoList, 
    SaveOutMemberInfo, 
    DeleteOutMemberInfo,
} from '../../api/index';

const { confirm } = Modal;
const { Option } = Select;

class OutMemberList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        current: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        outMemberId: '',
        visibleOutMember: false,
        handleOutMemberTitle: '',
        loading: false,
        confirmLoading: false,
        submitLoading: false,
        fields: {
          Name: {
            value: ''
          },
          Company: {
            value: ''
          },
          Phone: {
            value: ''
          },
          Email: {
            value: ''
          },
        },
      }

      this.onAdd = this.onAdd.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.handleOutMemberInfoOk = this.handleOutMemberInfoOk.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
      this.getOutMemberInfoList = this.getOutMemberInfoList.bind(this);
      this.onPaginationChange = this.onPaginationChange.bind(this);

      this.columns = [
        {
          title: '姓名',
          dataIndex: 'Name',
          key: 'Name',
        },
        {
          title: '公司',
          dataIndex: 'Company',
          key: 'Company',
        },
        {
          title: '手机',
          dataIndex: 'Phone',
          key: 'Phone',
        },
        {
          title: '邮箱',
          dataIndex: 'Email',
          key: 'Email',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span className="action">
              <span className="canClick" onClick={() => this.onEdit(record.Id)}>编辑</span>
              <Divider type="vertical" />
              <span className="canClick" onClick={() => this.onDelete(record.Id)}>删除</span>              
            </span>
          ),
        },
      ];
    }

    onAdd() {
      console.log('--> add');
      const emptyFields = JSON.parse(JSON.stringify(this.state.fields));
      for(let key of Object.keys(emptyFields)) {
        if(emptyFields[key].value) {
          emptyFields[key].value = '';
        }
      }
      this.setState({ handleOutMemberTitle: '添加外部人员' });
      this.setState({ fields: emptyFields });
      this.setState({ visibleOutMember: true });
    }

    onEdit(id) {
      console.log('--> edit');
      console.log('id = ' + id);
      this.setState({ outMemberId: id });
      const outMemberInfoData = this.state.dataSource.find(item => item.Id === id);
      const editFields = JSON.parse(JSON.stringify(this.state.fields));
      for(let key of Object.keys(editFields)) {
        editFields[key].value = outMemberInfoData[key];
      }
      this.setState({ fields: editFields });
      this.setState({ handleOutMemberTitle: '编辑外部人员' });
      this.setState({ visibleOutMember: true });
    }

    onDelete(id) {
      const that = this;
      console.log('--> delete');
      confirm({
        title: '确定删除这个外部人员吗？',
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          DeleteOutMemberInfo(id)
            .then(res => {
              message.success('删除成功', 3);
              that.getOutMemberInfoList();
            })
        },
        onCancel() {},
      });
    }

    handleOutMemberInfoOk() {
      console.log('handleOutMemberInfoOk -->');
      this.setState({ submitLoading: true });
      const fields = this.state.fields;
      const outMemberInfoData = {};
      for(let key of Object.keys(fields)) {
        outMemberInfoData[key] = fields[key].value;
      }
      if(this.state.handleOutMemberTitle === '添加外部人员') {
        SaveOutMemberInfo(Object.assign(outMemberInfoData, { id: 0 }))
          .then(res => {
            console.log('添加成功');
            this.setState({ submitLoading: false });
            this.setState({ visibleOutMember: false });
            message.success('添加成功', 3);
            this.getOutMemberInfoList();
          })
      } else if(this.state.handleOutMemberTitle === '编辑外部人员') {
        SaveOutMemberInfo(Object.assign(outMemberInfoData, { id: this.state.outMemberId }))
          .then(res => {
            console.log('编辑成功');
            this.setState({ submitLoading: false });
            this.setState({ visibleOutMember: false });
            message.success('编辑成功', 3);
            this.getOutMemberInfoList();
          })
      }
    }

    onPaginationChange(page, pageSize) {
      this.setState({ current: page },()=>{
        this.getOutMemberInfoList();
      });
    }

    handleFormChange(changedFields) {
      this.setState((state) => ({
        fields: { ...state.fields, ...changedFields },
      }));
    };

    getOutMemberInfoList() {
      this.setState({ loading: true });
      GetOutMemberInfoList(this.state.current, this.state.pageSize)
        .then(res => {
          console.log('---> 外部人员列表');
          console.log(res);
          this.setState({ loading: false });
          const { ResultData, TotalRecords } = res.Data;
          this.setState({ total: TotalRecords });
          this.setState({ dataSource: ResultData });
        })
    }

    componentDidMount() {
      this.getOutMemberInfoList();
    }

    render() {
      const { fields } = this.state;
      return (
        <div className='departmentList'>
          <Row type="flex" justify='end'>
            <Col>
              <Button type="primary" onClick={this.onAdd}>添加</Button>
            </Col>
          </Row> 

          <Table
            rowKey={(record) => record.Id}
            loading={this.state.loading}
            dataSource={this.state.dataSource} 
            columns={this.columns}
            pagination={{
              current: this.state.current,
              pageSize: this.state.pageSize,
              total: this.state.total,
              onChange: this.onPaginationChange,
            }}
            size="small" 
            />

          <Modal
            title={this.state.handleOutMemberTitle}
            visible={this.state.visibleOutMember}
            footer={null}
            // onOk={this.handleOutMemberInfoOk}
            onCancel={ () => {this.setState({ visibleOutMember: false })} }
          >
            <CustomizedForm {...fields} onChange={this.handleFormChange} onSure={this.handleOutMemberInfoOk} submitLoading={this.state.submitLoading}/>
          </Modal>
        </div>
      )
    }
}

export default OutMemberList;