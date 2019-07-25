import { Table, Modal, Button } from "antd";
import axios from "axios";
import React, { Component } from "react";
import { Constants } from "../../Common/Constants";

import { createForm } from "rc-form";

const { Column, ColumnGroup } = Table;

class FormLib extends React.Component {
    state = {
        TableData: [],
        visible: false,
        content: [],
        loading: false,
    };

    componentDidMount() {
        this.getList()
    }

    getList() {
        this.setState({ loading: true });
        axios.get(`${Constants.APIBaseUrl}/FormLibrary/GetFormLibraryList`, {
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            this.setState({ loading: false });
            console.log("result=>", res);
            const { ResultData } = res.data.Data
            if (ResultData.length > 0) {
                this.setState({
                    TableData: ResultData.map(item => ({ Id: item.Id, Name: item.Name, ProjectTypeName: item.ProjectTypeName, Content: item.Content }))
                })
            }
        })
    }

    submit = e => {
        console.log("submit");
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if(err)
          {
              console.log(err);
          }

          console.log(values);
        });

    };

    openModal(record) {
        
        console.log(record.Content);
        let contentObj = JSON.parse(record.Content);
        
        //JSON.parse('[{"label":{"name": "标题:","id":"label1","type": "span","style": { "color":"red"}},"input":{"id":"input1","type": "input","initialValue": "测试","style": { "width":"200px" }}}]');
        
        //JSON.parse(record.Content);
      
        this.setState({
            content: contentObj,
            visible: true
        })
    }
    CloseModal() {
        this.setState({
            visible: false
        })
    }
    render() {
        const { TableData, visible, content } = this.state

        let count = 0;

        const { getFieldProps } = this.props.form;

        let formItems = this.state.content.map(
            item => {
                let field1 = React.createElement(
                  item.label.type,
                  {
                  style: item.label.style},
                  item.label.name
                  );
      
                let input1 = React.createElement(
                  item.input.type,
                  {
                    style: item.input.style,
                    ...getFieldProps(item.input.id,{
                      rules:[{
                            required:true,
                            //message: `请输入${item.input.name}`
                        }],
                      initialValue:item.input.initialValue
                    }),
                  },
                  null
                  );
      
                return <div key={"div"+count++}>
                  {field1} {input1}
                </div>
            }
          );

        let form = React.createElement(
            "div",
            {},
            <div>
                {/* {field1} {input1} */}
                {formItems}
                {/* <br />
                <button onClick={this.submit.bind(this)}>submit</button> */}
            </div>
        );


        return <div>
            <Table dataSource={TableData} loading={this.state.loading}>
                <Column title="编号" dataIndex="Id" key="Id" />
                <Column title="名称" dataIndex="Name" key="Name" />
                <Column title="项目类型" dataIndex="ProjectTypeName" key="ProjectTypeName" />
                <Column
                    title="操作"
                    key="Content"
                    render={(text, record) => (
                        <span>
                            <a href="javascript:;" onClick={() => { this.openModal(record) }}>预览</a>
                        </span>
                    )}
                />
            </Table>
            <Modal
                title="表单预览"
                visible={visible}
                footer={<Button type="primary" onClick={this.CloseModal.bind(this)}>关闭</Button>}
                //onCancel={()=>{ this.handleCancel()}}
                //onOk={()=>{this.CloseModal()}}
            >
                {form}
            </Modal>
        </div>;
    }
}

export default createForm()(FormLib);