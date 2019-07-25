import React from 'react';
import { Tree, Tabs, Icon, Table, Modal, message, Spin } from 'antd';
import CustomizedForm from './roleManageForm.js';
import {
    backRole_getBackRoleList,
    backRole_saveBackRole,
    backRole_deleteBackRole,
    backRole_getMenuIdsByRoleId,
    backRole_bindMenu,
} from '../../api/index';

import './menuManager.css';

const { TreeNode } = Tree;
const { TabPane } = Tabs
const { confirm } = Modal;

class MenuManager extends React.Component {
    constructor() {
        super();

        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            dataSource: [],
            roleId: '',
            handleRoleTitle: '',
            visibleRole: false,
            visibleMenu: false,
            treeNodeList: [],
            selectedNode: [],
            loading: false,
            loadingTree: false,
            submitLoading: false,
            confirmLoading: false,
            fields: {
                Name: {
                    value: 1
                },
                RoleNo: {
                    value: 1
                },
                Sequence: {
                    value: 1
                },
            },
        };

        this.onTabClick = this.onTabClick.bind(this);
        this.onRadioSelect = this.onRadioSelect.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRoleOk = this.handleRoleOk.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.onPaginationChange = this.onPaginationChange.bind(this);

        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: '权限编号',
                dataIndex: 'RoleNo',
                key: 'RoleNo',
            },
            {
                title: '角色排序',
                dataIndex: 'Sequence',
                key: 'Sequence',
            },
        ];
    }

    onTabClick(key) {
        console.log('--> onTabClick');
        console.log('key = ' + key);
        switch(Number(key)) {
            case 1:
                this.onRefresh();
                break;
            case 2: 
                this.onAdd();
                break;
            case 3:
                this.onEdit();
                break;
            case 4:
                this.onDelete();
                break;
            case 5:
                this.onConfigMenu();
                break;
        }
    }

    onRadioSelect(row, selectedRows) {
        console.log('--> onRadioSelect');
        console.log(row);
        console.log('selectedRows = ' + selectedRows);
        this.setState({ 'roleId': row.Id });
    }

    onRefresh() {
        console.log('--> onRefresh');
        this.getRoleList();
    }

    onAdd() {
        console.log('--> onAdd');
        let emptyFields = JSON.parse(JSON.stringify(this.state.fields));
        for(let key of Object.keys(emptyFields)) {
          if(emptyFields[key].value) {
            emptyFields[key].value = '';
          }
        }
        this.setState({ 'handleRoleTitle': '添加角色' });
        this.setState({ fields: emptyFields });
        this.setState({ 'visibleRole': true });
    }

    onEdit() {
        console.log('--> onEdit');
        if(!this.state.roleId){ 
            message.info('请选择一个角色');
            return; 
        };
        const menuData = this.state.dataSource.find(item => item.Id === this.state.roleId);
        const editFields = JSON.parse(JSON.stringify(this.state.fields));
        for(let key of Object.keys(editFields)) {
          editFields[key].value = menuData[key];
        }
        this.setState({ fields: editFields });
        this.setState({ 'handleRoleTitle': '编辑角色' });
        this.setState({ 'visibleRole': true });
    }

    onDelete() {
        if(!this.state.roleId){ 
            message.info('请选择一个角色');
            return; 
        };
        const that = this;
        console.log('--> onDelete');
        confirm({
            title: '确定删除这个角色吗？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                backRole_deleteBackRole(that.state.roleId)
                .then(res => {
                    message.success('删除成功', 3);
                    that.getRoleList();                  
                })
            },
            onCancel() {},
        });
    }

    onConfigMenu() {
        if(!this.state.roleId){ 
            message.info('请选择一个角色');
            return; 
        };
        this.setState({ visibleMenu: true });
        this.getMenuIdsByRoleId(this.state.roleId);
    }

    onSelect() {
        console.log('--> onSelect');
    }

    onCheck(checkedKeys, evt) {
        console.log('--> onCheck');
        console.log(checkedKeys);
        this.setState({ selectedNode: checkedKeys });      
    }

    handleFormChange(changedFields) {
        console.log('--> changedFields');
        console.log(changedFields);
        this.setState((state) => ({
            fields: { ...state.fields, ...changedFields },
        }));
    };

    handleRoleOk() {
        console.log('handleRoleOk -->');
        this.setState({ submitLoading: true });
        const fields = this.state.fields;
        const roleData = {};
        for(let key of Object.keys(fields)) {
            roleData[key] = fields[key].value;
        }
        if(this.state.handleRoleTitle === '添加角色') {
          backRole_saveBackRole(Object.assign(roleData, { Id: 0 }))
            .then(res => {
              console.log('添加成功');
              this.setState({ submitLoading: false });
              this.setState({ visibleRole: false });
              message.success('添加成功', 3);
              this.getRoleList();
            })
        } else if(this.state.handleRoleTitle === '编辑角色') {
          backRole_saveBackRole(Object.assign(roleData, { Id: this.state.roleId }))
            .then(res => {
              console.log('编辑成功');
              this.setState({ submitLoading: false });
              this.setState({ visibleRole: false });
              message.success('编辑成功', 3);
              this.getRoleList();
            })
        }
    }

    handleOk() {
        this.bindMenu();
    }

    getMenuIdsByRoleId(roleId) {
        this.setState({ loadingTree: true });
        backRole_getMenuIdsByRoleId(roleId)
            .then(res => {
                this.setState({ loadingTree: false });
                let Data = res.Data;
                if(!Data) {return };
                const selectedNode = [];
                Data.forEach(node => {
                    node.Id = node.Id.toString();
                    node.SubMenuList.forEach(subNode => {
                        subNode.Id = subNode.Id.toString();
                        if(subNode.IsBind) {
                            selectedNode.push(subNode.Id);
                        }
                    })
                });
                console.log('selectedNode -->');
                console.log(selectedNode);
                this.setState({ treeNodeList: Data });
                this.setState({ selectedNode: selectedNode });
            })
    }

    bindMenu() {
        const { roleId, selectedNode } = this.state;
        if(!roleId){ return };
        this.setState({ confirmLoading: true });
        backRole_bindMenu(roleId, selectedNode)
            .then(res => {
              this.setState({ confirmLoading: false });
              this.setState({ visibleMenu: false });
              message.success('绑定菜单成功', 3);
            })
    }

    renderTreeNodes(data) {
        const treeNode = data.map(item => {
            if (item.SubMenuList) {
              return (
                <TreeNode title={item.Name} key={item.Id} dataRef={item}>
                  {this.renderTreeNodes(item.SubMenuList)}
                </TreeNode>
              );
            }
            return <TreeNode title={item.Name} key={item.Id} dataRef={item} />;
        });
        return treeNode;
    }

    onPaginationChange(page, pageSize) {
        this.setState({ current: page },()=>{
          this.getRoleList();
        });
    }

    getRoleList() {
        this.setState({ loading: true });
        backRole_getBackRoleList(this.state.current, this.state.pageSize)
            .then(res => {
                this.setState({ loading: false });
                const Data = res.Data;
                if(!Data) { return };
                const { ResultData, TotalRecords } = res.Data;
                console.log('--> TotalRecords = ' + TotalRecords);
                this.setState({ total: TotalRecords });
                this.setState({ dataSource: ResultData });
            })
    }

    componentDidMount() {
        this.getRoleList();
    }

    render() {
        const { fields } = this.state;
        const treeNode = this.renderTreeNodes(this.state.treeNodeList);
        return(
            <div className='menuManage'>
                <div className='box'>
                    <div className='main'>
                        {/* tab */}
                        <div className='tab'>
                        <Tabs type="card" onTabClick={this.onTabClick}>
                            <TabPane tab={<span><Icon type="redo" />刷新</span>} key="1"></TabPane>
                            <TabPane tab={<span><Icon type="plus-circle" />添加</span>} key="2"></TabPane>
                            <TabPane tab={<span><Icon type="form" />编辑</span>} key="3"></TabPane>
                            <TabPane tab={<span><Icon type="close-circle" />删除</span>} key="4"></TabPane>
                            <TabPane tab={<span><Icon type="unordered-list" />配置菜单</span>} key="5"></TabPane>
                        </Tabs>
                        </div>
                        {/* table */}
                        <div className='tableBox'>
                            <div className='table'>
                                <Table 
                                    rowKey={(record) => record.Id}
                                    loading={this.state.loading}
                                    columns={this.columns} 
                                    dataSource={this.state.dataSource} 
                                    rowSelection={{
                                        type:'radio',
                                        columnTitle:"选择",
                                        onSelect: this.onRadioSelect,
                                    }}
                                    pagination={{
                                        current: this.state.current,
                                        pageSize: this.state.pageSize,
                                        total: this.state.total,
                                        onChange: this.onPaginationChange,
                                    }}
                                    size="small" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    title={this.state.handleRoleTitle}
                    visible={this.state.visibleRole}
                    footer={null}
                    onCancel={ () => {this.setState({ visibleRole: false })} }
                >
                    <CustomizedForm {...fields} onChange={this.handleFormChange} onSure={this.handleRoleOk} submitLoading={this.state.submitLoading}/>
                </Modal>

                <Modal
                    title='配置菜单'
                    visible={this.state.visibleMenu}
                    confirmLoading={this.state.confirmLoading}
                    okText='确定'
                    cancelText='取消'
                    onOk={this.handleOk}
                    onCancel={ () => {this.setState({ visibleMenu: false })} }
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
                                            treeNode
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

export default MenuManager;