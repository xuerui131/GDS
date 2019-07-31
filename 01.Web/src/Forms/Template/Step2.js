import {
  Form,
  Input,
  Tooltip,
  Icon,
  Modal,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Table,
  Popconfirm,
  Divider
} from 'antd';

import React, { Component } from 'react';

import './Step2.css';

import axios from 'axios';

import { Constants } from '../../Common/Constants';

const { Option } = Select;
const { TextArea } = Input;

const options = [
  { label: '文档列表', value: '1' },
  { label: '关联表单', value: '2' }
];

class Step2PhaseItem extends React.Component {
  state = {
    isDocListVisible: false,
    isLinkFormVisible: false,
  };

  onDocChanged = (checkedValues) => {
    let fieldHasDocList = 'hasDocList' + this.props.data.id

    let isDocListChecked = this.props.form.getFieldValue(fieldHasDocList);

    if (!isDocListChecked) {
      this.setState({
        isDocListVisible: true
      })
    }
    else {
      this.setState({
        isDocListVisible: false
      })
    }
  }

  onLinkedFormChanged = (checkedValues) => {
    let fieldHasLinkedForm = 'hasLinkedForm' + this.props.data.id

    let isLinkedFormChecked = this.props.form.getFieldValue(fieldHasLinkedForm);

    if (!isLinkedFormChecked) {
      this.setState({
        isLinkFormVisible: true
      })
    }
    else {
      this.setState({
        isLinkFormVisible: false
      })
    }
  }

  componentDidMount() {
    if (this.props.data) {
      this.props.form.setFieldsValue(
        this.props.data
      )

      let fieldHasDocList = 'hasDocList' + this.props.data.id
      let fieldHasLinkedForm = 'hasLinkedForm' + this.props.data.id

      if (this.props.data[fieldHasDocList]) {
        this.setState({
          isDocListVisible: true
        })
      }

      if (this.props.data[fieldHasLinkedForm]) {
        this.setState({
          isLinkFormVisible: true
        })
      }
    }

  }

  render() {
    const { getFieldDecorator } = this.props.form;

    let fieldName = 'name' + this.props.data.id;
    let fieldComment = 'comment' + this.props.data.id
    let fieldHasDocList = 'hasDocList' + this.props.data.id
    let fieldHasLinkedForm = 'hasLinkedForm' + this.props.data.id
    let fieldDocList = 'docList' + this.props.data.id
    let fieldLinkedForm = 'linkedForm' + this.props.data.id

    let docListStyle = {
      display: this.state.isDocListVisible ? 'block' : 'none',
      width: '100%'
    }
    let linkedFormStyle = {
      display: this.state.isLinkFormVisible ? 'block' : 'none',
      width: '100%'
    }

    return (
      <div>
        {/* <Form {...formItemLayout} style={{ marginRight: "200px" }}> */}
        <Form.Item label="项目阶段名称">
          {getFieldDecorator(fieldName, {
            rules: [
              {
                required: true,
                message: '请输入项目阶段名称',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              项目阶段描述&nbsp;
                            </span>
          }
        >
          {getFieldDecorator(fieldComment, {
            rules: [{ required: true, message: '请输入阶段备注', whitespace: true }],
          })(<TextArea rows={2} autosize={{ minRows: 2, maxRows: 4 }} />)}
        </Form.Item>
        <Row gutter={8}>
          <Col span={6}>
            <span>
              必要内容&nbsp;
                              </span>
          </Col>
          <Col span={6}>
            <Form.Item>
              {getFieldDecorator(fieldHasDocList, {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox onChange={this.onDocChanged.bind(this)}>文档列表</Checkbox>)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item>
              {getFieldDecorator(fieldHasLinkedForm, {
                valuePropName: 'checked',
                initialValue: false,
              })(<Checkbox onChange={this.onLinkedFormChanged.bind(this)}>关联表单</Checkbox>)}
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Form.Item style={{ width: '100%' }}>
            {getFieldDecorator(fieldDocList)
              (<EditableTable style={docListStyle} data={this.props.data[fieldDocList]} ></EditableTable>)}
          </Form.Item>

          <Divider style={docListStyle}></Divider>

          <Form.Item style={linkedFormStyle}>
            {getFieldDecorator(fieldLinkedForm)
              (<ReadOnlyTable style={linkedFormStyle} data={this.props.data[fieldLinkedForm]} ></ReadOnlyTable>)}
          </Form.Item>
        </div>
      </div>
    );
  }
}

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={this.toggleEdit}
        >
          {children}
        </div>
      );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '文件类型名',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: '描述',
        dataIndex: 'comment',
        editable: true,
      },
      {
        title: '必要性',
        dataIndex: 'isRequired',
        editable: false,
        render: (value, record) => (
          value ? <Checkbox checked onChange={() => this.handleRequiredChange(value, record)}>必须</Checkbox>
            : <Checkbox onChange={() => this.handleRequiredChange(value, record)}>必须</Checkbox>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
      ],
      count: 0,
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps["data-__field"] && nextProps["data-__field"].value && Array.isArray(nextProps["data-__field"].value)) {
      let datasource = [];
      nextProps["data-__field"].value.forEach((item, index) => {
        datasource.push({
          key: item.key,
          name: item.name,
          comment: item.comment,          
          isRequired: item.isRequired,
        })
      });

      this.setState({
        dataSource: datasource,
      })
    }
  }

  handleRequiredChange(value, row) {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    item.isRequired = !value;
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData }, () => {
      this.handleChange()
    });
  }


  handleChange = () => {
    let { onChange } = this.props;
    if (onChange) {
      onChange(this.state.dataSource);
    }
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `文档名`,
      comment: '文档描述',
      isRequired: false,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    }, () => {
      this.handleChange()
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];

    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData }, () => {
      this.handleChange()
    });


  };

  // //内部数据结构转换为表单值
  // dataSourceToForm(dataSource) {
  //   console.log("datasource to form", dataSource);
  //   let formValue = [];
  //   dataSource.forEach(item => {
  //     formValue.push({
  //       name: `文档名`,
  //       comment: '文档描述',
  //       isRequired: false,
  //     });
  //   });
  //   return formValue;
  // }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    let myStyle = { ...this.props.style };
    return (
      <div style={myStyle}>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加
          </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

const { Column } = Table;
class ReadOnlyTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'id',
        width: '10%',
      },
      {
        title: '类别',
        dataIndex: 'type',
        width: '25%',
      },
      {
        title: '表单名称',
        dataIndex: 'name',
        width: '45%',
        // render: (name) => (
        //     <a href="javascript:void(0)">{name}</a>
        //   )
      },
      // {
      //   title: '内容',
      //   dataIndex: 'content',
      //   width: '45%',
      //   // render: (name) => (
      //   //     <a href="javascript:void(0)">{name}</a>
      //   //   )
      // },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      visible: false,
      content: '',
      dataSource: [
      ],
      projectTypeList: [],
      formList: [],
      count: 0,
      //FormTableData:[],
      selectedProjectType: '',
      selectedForm: '',
    };

  }

  componentDidMount() {
    axios.get(`${Constants.APIBaseUrl}/ProjectType/GetProjectTypeList`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        this.setState({
          projectTypeList: res.data.Data.ResultData
        })
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`${Constants.APIBaseUrl}/FormLibrary/GetFormLibraryList`, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        this.setState({
          formList: res.data.Data.ResultData
        })
      })
      .catch(function (error) {
        console.log(error);
      });

      //this.getFormList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps["data-__field"] && nextProps["data-__field"].value && Array.isArray(nextProps["data-__field"].value)) {
      let datasource = [];
      nextProps["data-__field"].value.forEach((item, index) => {
        datasource.push({
          key: item.id,
          id: item.id,
          name: item.name,
          type: item.type,
          content: item.content,
        })
      });

      this.setState({
        dataSource: datasource,
      })
    }
  }

  handleChange = () => {
    let { onChange } = this.props;
    if (onChange) {
      onChange(this.state.dataSource);
    }
  }

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  };

  handleAdd = () => {
    if (!this.state.selectedProjectType || !this.state.selectedForm) {
      return;
    }

    const { count, dataSource } = this.state;

    //this.state.formList.filter(p => p.Id == e)[0].Name
    let selectedFormObj = this.state.formList.filter(form => form.Name === this.state.selectedForm);
    if(!selectedFormObj || selectedFormObj.length === 0)
    {
      return;
    }

    const newData = {
      key: count + 1,
      id: count + 1,
      type: this.state.selectedProjectType,
      name: this.state.selectedForm,
      content: selectedFormObj[0].Content
    };


    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    }, () => {
      this.handleChange()
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];

    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData }, () => {
      this.handleChange()
    });


  };

  // getFormList() {
  //   axios.get(`${Constants.APIBaseUrl}/FormLibrary/GetFormLibraryList`, {
  //     headers: { 'Content-Type': 'application/json' }
  //   }).then(res => {
  //     console.log("result=>", res);
  //     const { ResultData } = res.data.Data
  //     if (ResultData.length > 0) {
  //       this.setState({
  //         FormTableData: ResultData.map(item => ({ Id: item.Id, Name: item.Name, ProjectTypeName: item.ProjectTypeName, Content: item.Content,isRequired:false,link:false }))
  //       })
  //     }
  //   })
  // }
  onProjectTypeChange(e) {
    this.setState({
      selectedProjectType: this.state.projectTypeList.filter(p => p.Id == e)[0].Name
    })
  }

  onFormChange(e) {
    this.setState({
      selectedForm: this.state.formList.filter(p => p.Id == e)[0].Name
    })
  }

  // //内部数据结构转换为表单值
  // dataSourceToForm(dataSource) {
  //   console.log("datasource to form", dataSource);
  //   let formValue = [];
  //   dataSource.forEach(item => {
  //     formValue.push({
  //       name: `IT`,
  //       comment: '文档描述',
  //       isRequired: false,
  //     });
  //   });
  //   return formValue;
  // }
  // openModal(record) {
  //     this.setState({
  //         content: record.Content,
  //         visible: true
  //     })
  // }
  // handleCancel() {
  //     this.setState({
  //         visible: false
  //     })
  // }
  // //必要性
  // handleRequiredChange(id) {
  //   const  { FormTableData } = this.state
  //   let modifyList = FormTableData.map((item)=>{
  //     if(item.Id===id)item.isRequired = !item.isRequired 
  //     return item
  //   })
  //   console.log(modifyList)
  //   this.setState({
  //     FormTableData:modifyList
  //   })
  // }
  // //修改关联数据
  // modifyLink(id){
  //   const  { FormTableData } = this.state
    
  //   let modifyList = FormTableData.map((item)=>{
  //     if(item.Id===id)item.link = !item.link 
  //     return item
  //   })
    
  //   this.setState({
  //     FormTableData:modifyList
  //   })

  //   let { onChange } = this.props;
  //   if (onChange) {
  //     onChange(this.state.FormTableData.filter(item=>item.link===true));
  //   }
  // }
  render() {
    //const { FormTableData,visible,content } = this.state;
    const { dataSource } = this.state;
    // const components = {
    //   body: {
    //     row: EditableFormRow,
    //     cell: EditableCell,
    //   },
    // };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    // let projectTypes = this.state.projectTypeList.map(pt => (
    //   <Option value={pt.Id}>{pt.Name}</Option>
    // ));
    let projectTypes = this.state.projectTypeList.map(pt => (
      <Option key={pt.Id} value={pt.Id}>{pt.Name}</Option>
    ));

    //let projectTypeDefault = this.state.projectTypeList.length>0? this.state.projectTypeList[0].Id : 1;
    //defaultValue={parseInt(projectTypeDefault)}

    let forms = this.state.formList.map(f => (
      <Option key={f.Id} value={f.Id}>{f.Name}</Option>
    ));

    //let formDefault = this.state.formList.length>0? this.state.formList[0].Id : 1;
    //defaultValue={parseInt(formDefault)} 

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <Select style={{ width: 150 }} onChange={this.onProjectTypeChange.bind(this)}>
            {projectTypes}
          </Select>
          <Select style={{ width: 150, marginLeft: "15px" }} onChange={this.onFormChange.bind(this)}>
            {forms}
          </Select>
          <Button type="primary" style={{ marginLeft: "15px" }} onClick={this.handleAdd.bind(this)}>
            添加
          </Button>
        </div>
        <div>
        <Table
            dataSource={dataSource}
            columns={columns}
          />
        {/* <Table dataSource={FormTableData}>
                <Column title="ID" dataIndex="Id" key="Id" />
                <Column title="Name" dataIndex="Name" key="Name" />
                <Column title="ProjectTypeName" dataIndex="ProjectTypeName" key="ProjectTypeName" />
                <Column title="必要性" dataIndex="isRequired" editable="false" key="isRequired" render={
                  (value, record) => (
                    <Checkbox checked={record.isRequired} onChange={() => this.handleRequiredChange(record.Id)}>必须</Checkbox>
                  )
                } />
                    <Column
                    title="Action"
                    key="Content"
                    render={(text, record) => (
                        <span>
                            <a href="javascript:;" onClick={() => { this.openModal(record) }}>预览</a>   <a href="javascript:;" onClick={() => { this.modifyLink(record.Id) }}>{record.link==true?'删除':'关联'}</a>
                        </span>
                     
                    )}
                />
            </Table>
            <Modal
                title="表单预览"
                visible={visible}
                onCancel={()=>{ this.handleCancel()}}
                onOk={()=>{this.handleCancel()}}
            >
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </Modal> */}
        </div>
      </div>
    );
  }
}
// const Step2PhaseItemForm = Form.create({ name: 'register' })(Step2PhaseItem);

class Step2 extends React.Component {
  state = {
    phaseItems: [],
    maxId: 1, //当前最大Id，一直加1，不会随着删除Item而减少。为了避免Form中有重名的FormItem。
  };

  componentDidMount() {
    let items = this.state.phaseItems;
    if (!this.props.data) {
      items.push({
        id: 1,
        // orderNo:1,
        name1: '',
        comment1: '',
        hasDocList1: false,
        hasLinkedForm1: false
      });
      this.setState({
        phaseItems: items,
      });
    }
    else {
      this.props.data.map(item => {
        let idField = "id";
        let nameField = "name" + item.id;
        let commentField = "comment" + item.id;
        let hasDocListField = "hasDocList" + item.id;
        let hasLinkedFormField = "hasLinkedForm" + item.id;

        let docListField = "docList" + item.id;
        let linkedFormField = "linkedForm" + item.id;

        let itemObj = {};
        itemObj[idField] = item.id;
        itemObj[nameField] = item.name;
        itemObj[commentField] = item.comment;
        itemObj[hasDocListField] = item.hasDocList;
        itemObj[hasLinkedFormField] = item.hasLinkedForm;

        itemObj[docListField] = item.docList;
        itemObj[linkedFormField] = item.linkedForm;

        items.push(itemObj);
      });

      this.setState({
        phaseItems: items
      });
    }

  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);

        if (this.props.onNextStep) {
          let phaseValues = [];

          this.state.phaseItems.map(item => {
            phaseValues.push({
              id: item.id,
              name: values["name" + item.id],
              comment: values["comment" + item.id],
              hasDocList: values["hasDocList" + item.id],
              hasLinkedForm: values["hasLinkedForm" + item.id],
              docList: values["docList" + item.id],
              linkedForm: values["linkedForm" + item.id],
            });
          });

          this.props.onNextStep(phaseValues);
        }
      }
    });
  };

  preStep = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', values);
      // console.log('Merged values:', keys.map(key => names[key]));

      if (this.props.onPreStep) {
        let phaseValues = [];

        this.state.phaseItems.map(item => {
          phaseValues.push({
            id: item.id,
            name: values["name" + item.id],
            comment: values["comment" + item.id],
            hasDocList: values["hasDocList" + item.id],
            hasLinkedForm: values["hasLinkedForm" + item.id],
            docList: values["docList" + item.id],
            linkedForm: values["linkedForm" + item.id],
          });
        });

        this.props.onPreStep(phaseValues);
      }
    });

  }

  remove = item => {
    let itemIndex = -1;
    for (var index = 0; index < this.state.phaseItems.length; index++) {
      if (this.state.phaseItems[index].id == item.id) {
        itemIndex = index;
      }
    }

    let phaseItems = this.state.phaseItems;
    phaseItems.splice(itemIndex, 1);

    // let orderNo = 1;
    // phaseItems.forEach(phaseItem => {
    //   phaseItem.orderNo = orderNo++;
    // });

    this.setState({
      phaseItems: phaseItems
    });
  };

  add = () => {
    let phaseItems = this.state.phaseItems;
    let newId = this.state.maxId + 1;
    let nameField = "name" + newId;
    let commentField = "comment" + newId;
    let hasDocListField = "hasDocList" + newId;
    let hasLinkedFormField = "hasLinkedForm" + newId;
    // let orderNoField = "orderNo";

    let itemObj = {};
    itemObj["id"] = newId;
    itemObj[nameField] = '';
    itemObj[commentField] = '';
    itemObj[hasDocListField] = false;
    itemObj[hasLinkedFormField] = false;
    // itemObj[orderNoField] = phaseItems.length + 1;

    phaseItems.push(itemObj);

    this.setState({
      phaseItems: phaseItems,
      maxId: newId
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };

    let orderNo = 1;
    const formItems = this.state.phaseItems.map((item) => (
      <div key={item.id} style={{ borderWidth: "1px", borderStyle: "solid", padding: "10px", margin: "10px" }}>
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => this.remove(item)}
        />阶段{orderNo++}
        {/* <Step2PhaseItemForm data={item}></Step2PhaseItemForm> */}
        <Step2PhaseItem data={item} form={this.props.form}></Step2PhaseItem>
      </div>
    ));

    let height = window.innerHeight - 250;
    return (
      <div style={{ overflow: "auto", height: `${height}px` }}>
        <div>
          <Form {...formItemLayout} style={{ marginRight: "200px", width: "95%" }} onSubmit={this.handleSubmit}>
            {formItems}
            <Form.Item>
              <div style={{ textAlign: "center" }}>
                <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
                  <Icon type="plus" /> 新增下阶段
                          </Button>
              </div>
              <div>
                <Button type="primary" htmlType="submit">
                  下一步
                              </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.preStep}>
                  上一步
                              </Button>
              </div>
            </Form.Item>
          </Form>
        </div>

      </div>

    );
  }
}

const TemplateStep2 = Form.create({ name: 'register' })(Step2);

export default TemplateStep2;