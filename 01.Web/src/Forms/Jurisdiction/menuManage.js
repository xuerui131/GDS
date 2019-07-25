import React from 'react';
import { Tree, Tabs, Icon, Table, Modal, message } from 'antd';
import CustomizedForm from './menuManagerForm';
import {
    backMenu_getBackMenuListByParentId,
    backMenu_saveBackMenu,
    backMenu_deleteBackMenu
} from '../../api/index';

import switchState from '../../utils/stateSwitch'
import './menuManager.css';


const { TreeNode } = Tree;
const { TabPane } = Tabs;
const { confirm } = Modal;

class MenuManager extends React.Component {
    constructor() {
        super();

        this.state = {
            dataSource: [],
            treeNodeList: [],
            selectedRadioId: '',
            menuParentId: 0,
            handleMenuTitle: '',
            visibleMenu: false,
            loading: false,
            submitLoading: false,
            fields: {
                Name: {
                    value: 1
                },
                MenuNo: {
                    value: 1
                },
                MenuType: {
                    value: 1
                },
                AccessUrl: {
                    value: 1
                },
                UrlType: {
                    value: 1
                },
                Sequence: {
                    value: 1
                },
                IsShow: {
                    value: 1
                },
                IsEnable: {
                    value: 1
                },
                MenuIcon: {
                    value: 1
                }
            },
        };

        this.onSelect = this.onSelect.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.getBackMenuListByParentId = this.getBackMenuListByParentId.bind(this);
        this.onRadioSelect = this.onRadioSelect.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleMenuOk = this.handleMenuOk.bind(this);

        this.columns = [
            {
                title: '菜单名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: '菜单编号',
                dataIndex: 'MenuNo',
                key: 'MenuNo',
            },
            {
                title: '菜单类型',
                dataIndex: 'MenuTypeName',
                key: 'MenuTypeName',
            },
            {
                title: '访问地址',
                dataIndex: 'AccessUrl',
                key: 'AccessUrl',
            },
            {
                title: '地址类型',
                dataIndex: 'UrlTypeName',
                key: 'UrlTypeName',
            },
            {
                title: '菜单顺序',
                dataIndex: 'Sequence',
                key: 'Sequence',
            },
            {
                title: '是否显示',
                dataIndex: 'IsShowName',
                key: 'IsShowName',
            },
            {
                title: '是否可用',
                dataIndex: 'IsEnableName',
                key: 'IsEnableName',
            },
            {
                title: '菜单图标',
                dataIndex: 'MenuIcon',
                key: 'MenuIcon',
                render: (MenuIcon, record) => (
                    <span>
                      <Icon type={MenuIcon} />
                    </span>
                ),
            },
        ];
    }


    onSelect(key) {
        console.log('--> onSelect');
        console.log(key);
        if(!key.length) { return };
        this.setState({ 'menuParentId': key[0] });
        this.getBackMenuListByParentId(key[0]);
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
        }
    }

    onRadioSelect(row, selectedRows) {
        console.log('--> onRadioSelect');
        console.log(row);
        console.log('selectedRows = ' + selectedRows);
        this.setState({ 'selectedRadioId': row.Id });
    }

    onRefresh() {
        console.log('--> onRefresh');
        this.getBackMenuListByParentId(this.state.menuParentId);
    }

    onAdd() {
        console.log('--> onAdd');
        let emptyFields = JSON.parse(JSON.stringify(this.state.fields));
        for(let key of Object.keys(emptyFields)) {
          if(emptyFields[key].value) {
            emptyFields[key].value = '';
          }
        }
        emptyFields = Object.assign({}, emptyFields, {
            MenuType: {
                value: 1
            },
            UrlType: {
                value: 1
            },
            IsShow: {
                value: 1
            },
            IsEnable: {
                value: 1
            },
        });
        this.setState({ 'handleMenuTitle': '添加菜单' });
        this.setState({ fields: emptyFields });
        this.setState({ 'visibleMenu': true });
    }

    onEdit() {
        console.log('--> onEdit');
        if(!this.state.selectedRadioId){ 
            message.info('请选择一个菜单');
            return; 
        };
        const menuData = this.state.dataSource.find(item => item.Id === this.state.selectedRadioId);
        const editFields = JSON.parse(JSON.stringify(this.state.fields));
        for(let key of Object.keys(editFields)) {
          editFields[key].value = menuData[key];
        }
        console.log(editFields);
        this.setState({ fields: editFields });
        this.setState({ 'handleMenuTitle': '编辑菜单' });
        this.setState({ 'visibleMenu': true });
    }

    onDelete() {
        if(!this.state.selectedRadioId){ 
            message.info('请选择一个菜单');
            return; 
        };
        const that = this;
        console.log('--> onDelete');
        confirm({
            title: '确定删除这个菜单吗？',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                backMenu_deleteBackMenu(that.state.selectedRadioId)
                .then(res => {
                    message.success('删除成功', 3);
                    if(that.state.menuParentId == 0) {
                        that.getFirstTree();
                    } else {
                        that.getBackMenuListByParentId(that.state.menuParentId);
                    }
                })
            },
            onCancel() {},
        });
    }

    handleFormChange(changedFields) {
        console.log('--> changedFields');
        this.setState((state) => ({
            fields: { ...state.fields, ...changedFields },
        }));
    };

    handleMenuOk(newFormData) {
        console.log('newFormData -->');
        console.log(newFormData);
        this.setState({ submitLoading: true });
        const { menuParentId, selectedRadioId, handleMenuTitle } = this.state;
        console.log('menuParentId = ' + menuParentId);
        if(handleMenuTitle === '添加菜单') {
            backMenu_saveBackMenu(Object.assign({}, newFormData, { ParentId: menuParentId }))
                .then(res => {
                    console.log('添加成功');
                    this.setState({ submitLoading: false });
                    this.setState({ visibleMenu: false });
                    message.success('添加成功', 3);
                    if(menuParentId == 0) {
                        this.getFirstTree();
                    } else {
                        this.getBackMenuListByParentId(menuParentId);
                    }
                })

        } else if(handleMenuTitle === '编辑菜单') {
            backMenu_saveBackMenu(Object.assign({}, newFormData, { ParentId: menuParentId, Id: selectedRadioId }))
                .then(res => {
                    console.log('编辑成功');
                    this.setState({ submitLoading: false });
                    this.setState({ visibleMenu: false });
                    message.success('编辑成功', 3);
                    if(menuParentId == 0) {
                        this.getFirstTree();
                    } else {
                        this.getBackMenuListByParentId(menuParentId);
                    }
                })
        }
    }

    getBackMenuListByParentId(id) {
        console.log('getBackMenuListByParentId -->');
        console.log('id = ' + id);
        this.setState({ loading: true });
        backMenu_getBackMenuListByParentId(id)
            .then(res => {
                const Data = res.Data.map(item => Object.assign(item, {
                    IsEnable: item.IsEnable,
                    IsEnableName: switchState.switchIsShow(item.IsEnable),
                    IsShow: item.IsShow,
                    IsShowName: switchState.switchIsEnable(item.IsShow),
                    MenuType: item.MenuType,
                    MenuTypeName: switchState.switchMenuType(item.MenuType),
                    UrlType: item.UrlType,
                    UrlTypeName: switchState.switchUrlType(item.UrlType),
                }));
                this.setState({ dataSource: Data});  
                this.setState({ loading: false });
            })
    }

    getFirstTree() {
        console.log('getFirstTree -->');
        backMenu_getBackMenuListByParentId(0)
            .then(res => {
                const Data = res.Data;
                const treeNodeList = Data.map(node => Object.assign({}, {
                    Name: node.Name,
                    Id: node.Id
                }));
                this.setState({ dataSource: Data});                
                this.setState({ treeNodeList });
            })
        this.getBackMenuListByParentId(0);
    }

    componentDidMount() {
        this.getFirstTree();
    }

    render() {
        const { fields } = this.state;
        return(
            <div className='menuManage'>
                <div className='box'>
                    {/* tree */}
                    <div className="treeBox">
                        <p className="title">应用目录</p>
                        <Tree
                            defaultExpandAll={true}
                            onSelect={this.onSelect}
                        >
                            <TreeNode title="根目录" checkable={true} key="0">
                            {
                                this.state.treeNodeList.map((node) => 
                                    <TreeNode title={node.Name} key={node.Id}></TreeNode>                                    
                                )
                            }
                            </TreeNode>
                        </Tree>
                    </div>
                    <div className='main'>
                        {/* tab */}
                        <div className='tab'>
                        <Tabs type="card" onTabClick={this.onTabClick}>
                            <TabPane tab={<span><Icon type="redo" />刷新</span>} key="1"></TabPane>
                            <TabPane tab={<span><Icon type="plus-circle" />添加</span>} key="2"></TabPane>
                            <TabPane tab={<span><Icon type="form" />编辑</span>} key="3"></TabPane>
                            <TabPane tab={<span><Icon type="close-circle" />删除</span>} key="4"></TabPane>
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
                                    size="small" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    title={this.state.handleMenuTitle}
                    visible={this.state.visibleMenu}
                    footer={null}
                    onCancel={ () => {this.setState({ visibleMenu: false })} }
                >
                    <CustomizedForm {...fields} onChange={this.handleFormChange} onSure={this.handleMenuOk} submitLoading={this.state.submitLoading}/>
                </Modal>
            </div>
        )
    }
}

export default MenuManager;