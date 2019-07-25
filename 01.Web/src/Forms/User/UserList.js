import React from 'react';
import { Row, Col, Button, Table, Divider, Modal, message, Form, Input, Tree, Icon, Spin } from 'antd';
import moment from 'moment';
import switchState from '../../utils/stateSwitch'

import CustomizedForm from './UserForm';

import { 
  GetUsersList, 
  SaveUsers,
  DeleteUsers, 
  GetRoleIdsByUId,
  BindRole,
  UpdatePassword
} from '../../api/index';
const { confirm } = Modal;
const { TreeNode } = Tree;

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            dataSource: [],
            userId: '',
            handleUserTitle: '',
            visibleUser: false,
            treeNodeList: [],
            selectedNode: [],
            visibleRole: false,
            loading: false,
            loadingTree: false,
            submitLoading: false,
            confirmLoading: false,
            fields: {
                Name: {
                  value: ''
                },
                NameEN: {
                  value: ''
                },
                StaffNo: {
                  value: ''
                },
                UserName: {
                  value: ''
                },
                Phone: {
                  value: ''
                },
                Email: {
                  value: ''
                },
                EntryDate: {
                  value: ''
                },
                Sex: {
                  value: '1'
                },
                IDCard: {
                  value: ''
                },
                Images: {
                  value: ''
                },
            },
        }

        this.columns = [
          {
            title: '姓名',
            dataIndex: 'Name',
            key: 'Name',
          },
          {
            title: '英文名',
            dataIndex: 'NameEN',
            key: 'NameEN',
          },
          {
            title: '工号',
            dataIndex: 'StaffNo',
            key: 'StaffNo',
          },
          {
            title: '帐号',
            dataIndex: 'UserName',
            key: 'UserName',
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
              title: '入职时间',
              dataIndex: 'EntryDate',
              key: 'EntryDate',
            },
            {
              title: '性别',
              dataIndex: 'SexName',
              key: 'SexName',
            },
            {
              title: '身份证',
              dataIndex: 'IDCard',
              key: 'IDCard',
            },
            // {
            //   title: '用户图片',
            //   dataIndex: 'Images',
            //   key: 'Images',
            // },
            {
              title: '添加时间',
              dataIndex: 'CreateTime',
              key: 'CreateTime',
            },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span className="action">
                <span className="canClick" onClick={() => this.onEditRole(record.Id)}>角色</span>
                <Divider type="vertical" />
                <span className="canClick" onClick={() => this.onEdit(record.Id)}>编辑</span>
                <Divider type="vertical" />
                <span className="canClick" onClick={() => this.onDelete(record.Id)}>删除</span>              
              </span>
            ),
          },
      ]

        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.GetUsersList = this.GetUsersList.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);

        this.handleUserOk = this.handleUserOk.bind(this);

        this.handleRoleOk = this.handleRoleOk.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);
    }

    onAdd() {
        console.log('--> add');
        const emptyFields = JSON.parse(JSON.stringify(this.state.fields));
        for(let key of Object.keys(emptyFields)) {
          if(emptyFields[key].value) {
            emptyFields[key].value = '';
          }
        }
        emptyFields.EntryDate.value = moment(new Date());
        emptyFields.Sex.value = 1;
        this.setState({ handleUserTitle: '添加用户' });
        this.setState({ fields: emptyFields });
        this.setState({ visibleUser: true });
    }

    onEditRole(id) {
      console.log('--> onEditRole');
      console.log('id = ' + id);
      this.setState({ userId: id });
      this.setState({ visibleRole: true });
      this.setState({ loadingTree: true });
      GetRoleIdsByUId(id)
        .then(res => {
          this.setState({ loadingTree: false });
          if(!res.Data) { return };
          this.setState({ treeNodeList: res.Data });
          let selectedNode = res.Data.filter(item => item.IsBind);
          selectedNode = selectedNode.map(item => item.Id);
          console.log('--> selectedNode');
          console.log(selectedNode);
          this.setState({ selectedNode: selectedNode});
        })
    }

    onEdit(id) {
      console.log('--> edit');
      console.log('id = ' + id);
      this.setState({ userId: id });
      const userData = this.state.dataSource.find(item => item.Id === id);
      const editFields = JSON.parse(JSON.stringify(this.state.fields));
      for(let key of Object.keys(editFields)) {
        editFields[key].value = userData[key];
      }
      editFields.EntryDate.value = moment(userData.EntryDate);
      this.setState({ fields: editFields });
      this.setState({ handleUserTitle: '编辑用户' });
      this.setState({ visibleUser: true });
    }

    onDelete(id) {
      const that = this;
      console.log('--> delete');
      confirm({
        title: '确定删除这个用户吗？',
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          DeleteUsers(id)
            .then(res => {
              message.success('删除成功', 3);
              that.GetUsersList();
            })
        },
        onCancel() {},
      });
    }

    handleUserOk() {
      console.log('handleUserOk -->');
      const fields = this.state.fields;
      const userData = {};
      this.setState({ submitLoading: true });
      for(let key of Object.keys(fields)) {
        userData[key] = fields[key].value;
      }
      if(this.state.handleUserTitle === '添加用户') {
        SaveUsers(Object.assign(userData, { id: 0 }))
          .then(res => {
            this.setState({ submitLoading: false });
            console.log('添加成功');
            this.setState({ visibleUser: false });
            message.success('添加成功', 3);
            this.GetUsersList();
          })
      } else if(this.state.handleUserTitle === '编辑用户') {
        SaveUsers(Object.assign(userData, { id: this.state.userId }))
          .then(res => {
            this.setState({ submitLoading: false });
            console.log('编辑成功');
            this.setState({ visibleUser: false });
            message.success('编辑成功', 3);
            this.GetUsersList();
          })
      }
    }

    handleFormChange(changedFields) {
        this.setState((state) => ({
          fields: { ...state.fields, ...changedFields },
        }));
    }

    handleRoleOk() {
      console.log('--> handleRoleOk');
      const { userId, selectedNode } = this.state;
      if(!userId){ return };
      this.setState({ confirmLoading: true });
      BindRole(userId, selectedNode)
        .then(res => {
          this.setState({ confirmLoading: false });
          this.setState({ visibleRole: false });
          message.success('绑定角色成功', 3);
        })
    }

    onSelect() {
      console.log('--> onSelect');
    }

    onCheck(checkedKeys) {
      console.log('--> onCheck');
      this.setState({ selectedNode: checkedKeys });
    }

    onPaginationChange(page, pageSize) {
      this.setState({ current: page },()=>{
        this.GetUsersList();
      });
    }

    GetUsersList() {
        this.setState({ loading: true });
        GetUsersList(this.state.current, this.state.pageSize)
            .then(res => {
                console.log('获取用户列表成功...');
                this.setState({ loading: false });
                const { ResultData, TotalRecords } = res.Data;
                ResultData.map(item => Object.assign(item, {
                    CreateTime: new Date(parseInt(item.CreateTime.substr(6, 13))).toLocaleDateString(),
                    SexName: switchState.switchGender(item.Sex),
                    EntryDate: new Date(item.EntryDate).toLocaleDateString()
                }))
                this.setState({ total: TotalRecords });
                this.setState({ dataSource: ResultData });
            })
    }

    componentDidMount() {
        this.GetUsersList();
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
                    title={this.state.handleUserTitle}
                    visible={this.state.visibleUser}
                    footer={null}
                    // onOk={this.handleDepartmentOk}
                    onCancel={ () => {this.setState({ visibleUser: false })} }
                >
                    <CustomizedForm {...fields} submitLoading={this.state.submitLoading} onChange={this.handleFormChange} onSure={this.handleUserOk}/>
                </Modal>

                <Modal
                    title='配置角色'
                    visible={this.state.visibleRole}
                    confirmLoading={this.state.confirmLoading}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.handleRoleOk}
                    onCancel={ () => {this.setState({ visibleRole: false })} }
                >
                    {
                        this.state.loadingTree ? 
                            <Spin /> : 
                            (                        
                              <Tree
                                  checkable
                                  checkedKeys={this.state.selectedNode}
                                  defaultExpandAll={true}
                                  onSelect={this.onSelect}
                                  onCheck={this.onCheck}
                              >
                                  <TreeNode title="根目录" checkable={true} key="0">
                                  {
                                      this.state.treeNodeList.map((node) => 
                                          <TreeNode title={node.Name} key={node.Id}></TreeNode>                                    
                                      )
                                  }
                                  </TreeNode>
                              </Tree>
                            )
                    }
                </Modal>
            </div>
          )
    }
}

export default UserList;