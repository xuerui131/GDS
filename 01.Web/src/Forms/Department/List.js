import React from 'react';
import { Row, Col, Button, Table, Divider, Modal, message, Form, Select, Input } from 'antd';
import CustomizedForm from './Form';
import { 
  GetDepartmentList, 
  GetDepartmentById, 
  SaveDepartment,
  DeleteDepartment, 
  SetAuditor, 
  SetChargePerson, 

  GetAllUsers,
} from '../../api/index';

import './List.css';

const { confirm } = Modal;
const { Option } = Select;

class DepartmentList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        current: 1,
        pageSize: 10,
        total: 0,
        dataSource: [],
        departmentId: '',
        visibleDepartment: false,
        handleDepartmentTitle: '',
        visibleManager: false,
        handleManagerTitle: '',
        manager: '',
        managerOption: [],
        loading: false,
        confirmLoading: false,
        submitLoading: false,
        fields: {
          DepmentNo: {
            value: ''
          },
          Name: {
            value: ''
          },
          NameEN: {
            value: ''
          },
          Address: {
            value: ''
          },
          // Auditor: {
          //   value: ''
          // },
          // ChargePerson: {
          //   value: ''
          // },
        },
      }

      this.onAdd = this.onAdd.bind(this);
      this.onEdit = this.onEdit.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.handleDepartmentOk = this.handleDepartmentOk.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
      this.getDepartmentList = this.getDepartmentList.bind(this);
      this.onManagerChange = this.onManagerChange.bind(this);
      this.handleManagerOk = this.handleManagerOk.bind(this);
      this.onPaginationChange = this.onPaginationChange.bind(this);

      this.onPersonChange = this.onPersonChange.bind(this);
      this.onPersonFocus = this.onPersonFocus.bind(this);
      this.onPersonBlur = this.onPersonBlur.bind(this);
      this.onPersonSearch = this.onPersonSearch.bind(this);

      this.columns = [
        {
          title: '部门编号',
          dataIndex: 'DepmentNo',
          key: 'DepmentNo',
        },
        {
          title: '部门名称',
          dataIndex: 'Name',
          key: 'Name',
        },
        {
          title: '部门英文名',
          dataIndex: 'NameEN',
          key: 'NameEN',
        },
        {
          title: '公司地址',
          dataIndex: 'Address',
          key: 'Address',
        },
        {
          title: '添加时间',
          dataIndex: 'AddTime',
          key: 'AddTime',
        },
        {
          title: '审核人',
          dataIndex: 'Auditor',
          key: 'Auditor',
          render: (auditor, record) => {
            if(!auditor) {
              return <span key={ record.Id } className="canClick" onClick={() => this.onAddAuditor(record.Id)}>添加</span>
            } else {
              return <span key={ record.Id } className="canClick" onClick={() => this.onEditAuditor(record.Id, record.Auditor)}>{ auditor }</span>
            }
          }
        },
        {
          title: '负责人',
          dataIndex: 'ChargePerson',
          key: 'ChargePerson',
          render: (chargePerson, record) => {
            if(!chargePerson) {
              return <span key={ record.Id } className="canClick" onClick={() => this.onAddChargePerson(record.Id)}>添加</span>
            } else {
              return <span key={ record.Id } className="canClick" onClick={() => this.onEditChargePerson(record.Id, record.ChargePerson)}>{ chargePerson }</span>
            }
          }
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
      this.setState({ handleDepartmentTitle: '添加部门' });
      this.setState({ fields: emptyFields });
      this.setState({ visibleDepartment: true });
    }

    onEdit(id) {
      console.log('--> edit');
      console.log('id = ' + id);
      this.setState({ departmentId: id });
      const departmentData = this.state.dataSource.find(item => item.Id === id);
      const editFields = JSON.parse(JSON.stringify(this.state.fields));
      for(let key of Object.keys(editFields)) {
        editFields[key].value = departmentData[key];
      }
      this.setState({ fields: editFields });
      this.setState({ handleDepartmentTitle: '编辑部门' });
      this.setState({ visibleDepartment: true });
    }

    onDelete(id) {
      const that = this;
      console.log('--> delete');
      confirm({
        title: '确定删除这个部门吗？',
        content: '',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          DeleteDepartment(id)
            .then(res => {
              message.success('删除成功', 3);
              that.getDepartmentList();
            })
        },
        onCancel() {},
      });
    }

    addAuditor(id) {
      this.setState({ departmentId: id });
      this.setState({ handleManagerTitle: '审核人' });
      this.setState({ visibleManager: true });
    }

    onAddAuditor(id) {
      this.setState({ manager: ''});
      this.addAuditor(id)
    }

    onEditAuditor(id, name) {
      this.setState({ manager: name});
      this.addAuditor(id);
    }

    addChargePerson(id) {
      this.setState({ departmentId: id });
      this.setState({ handleManagerTitle: '负责人' });
      this.setState({ visibleManager: true });
    }

    onAddChargePerson(id) {
      this.setState({ manager: ''});
      this.addChargePerson(id)
    }

    onEditChargePerson(id, name) {
      this.setState({ manager: name});
      this.addChargePerson(id)
    }


    onPersonChange(val) {
      console.log('--> onPersonChange');
      this.setState({ manager: val });
      this.GetAllUsers(val);
    }

    onPersonBlur() {
      console.log('--> onPersonBlur');
      this.onPersonFocus(); 
    }

    onPersonFocus() {
      console.log('--> onPersonFocus');
      this.GetAllUsers('');
    }

    onPersonSearch(val) {
      console.log('--> onPersonSearch');
      this.GetAllUsers(val);
    }

    GetAllUsers(Name) {
      GetAllUsers(Name)
        .then(res => {
          const Data = res.Data;
          const managerOption = Data.map(item => Object.assign({}, {
              Id: item.Id,
              Name: item.Name
          }));
          this.setState({ 'managerOption': managerOption });
        })
    }

    handleDepartmentOk() {
      console.log('handleDepartmentOk -->');
      this.setState({ submitLoading: true });
      const fields = this.state.fields;
      const departmentData = {};
      for(let key of Object.keys(fields)) {
        departmentData[key] = fields[key].value;
      }
      if(this.state.handleDepartmentTitle === '添加部门') {
        SaveDepartment(Object.assign(departmentData, { id: 0 }))
          .then(res => {
            console.log('添加成功');
            this.setState({ submitLoading: false });
            this.setState({ visibleDepartment: false });
            message.success('添加成功', 3);
            this.getDepartmentList();
          })
      } else if(this.state.handleDepartmentTitle === '编辑部门') {
        // const oldDepartmentData = this.state.dataSource.find(item => item.Id === this.state.departmentId);
        SaveDepartment(Object.assign(departmentData, { id: this.state.departmentId }))
          .then(res => {
            console.log('编辑成功');
            this.setState({ submitLoading: false });
            this.setState({ visibleDepartment: false });
            message.success('编辑成功', 3);
            this.getDepartmentList();
          })
      }
    }

    onManagerChange(evt) {
    }

    handleManagerOk() {
      console.log('--> handleManagerOk');
      this.setState({ confirmLoading: true });
      const { departmentId, manager, handleManagerTitle } = this.state;
      if(handleManagerTitle === '审核人') {
        SetAuditor(departmentId, manager)
          .then(res => {
            console.log('设置审核人成功...');
            this.setState({ confirmLoading: false });
            this.setState({ visibleManager: false });
            message.success('设置审核人成功', 3);
            this.getDepartmentList();
          })
      } else if(handleManagerTitle === '负责人') {
        SetChargePerson(departmentId, manager)
          .then(res => {
            this.setState({ confirmLoading: false });
            this.setState({ visibleManager: false });
            message.success('设置负责人成功', 3);
            this.getDepartmentList();
          })
      } 
    }

    onPaginationChange(page, pageSize) {
      this.setState({ current: page },()=>{
        this.getDepartmentList();
      });
    }

    handleFormChange(changedFields) {
      this.setState((state) => ({
        fields: { ...state.fields, ...changedFields },
      }));
    };

    getDepartmentList() {
      this.setState({ loading: true });
      GetDepartmentList(this.state.current, this.state.pageSize)
        .then(res => {
          console.log('---> 部门列表');
          console.log(res);
          this.setState({ loading: false });
          const { ResultData, TotalRecords } = res.Data;
          ResultData.map(item => Object.assign(item, {
            AddTime: new Date(parseInt(item.AddTime.substr(6, 13))).toLocaleDateString(),
          }))
          this.setState({ total: TotalRecords });
          this.setState({ dataSource: ResultData });
        })
    }

    componentDidMount() {
      this.getDepartmentList();
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
            title={this.state.handleDepartmentTitle}
            visible={this.state.visibleDepartment}
            footer={null}
            // onOk={this.handleDepartmentOk}
            onCancel={ () => {this.setState({ visibleDepartment: false })} }
          >
            <CustomizedForm {...fields} onChange={this.handleFormChange} onSure={this.handleDepartmentOk} submitLoading={this.state.submitLoading}/>
          </Modal>

          <Modal
            title={ '设置' + this.state.handleManagerTitle }
            visible={this.state.visibleManager}
            confirmLoading={this.state.confirmLoading}
            okText='确定'
            cancelText='取消'
            onOk={this.handleManagerOk}
            onCancel={ () => {this.setState({ visibleManager: false })} }
          >
            <Form layout="inline">
              <Select
                value={this.state.manager}
                showSearch
                style={{ width: 200 }}
                placeholder="Select a manager"
                optionFilterProp="children"
                onChange={this.onPersonChange}
                onFocus={this.onPersonFocus}
                onBlur={this.onPersonBlur}
                onSearch={this.onPersonSearch}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.managerOption.map((manager) =>
                  <Option value={manager.Name} key={manager.Id}>
                    {manager.Name}
                  </Option>
                )}
              </Select>
            </Form>
          </Modal>
        </div>
      )
    }
}

export default DepartmentList;