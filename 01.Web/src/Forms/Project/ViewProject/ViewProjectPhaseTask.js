
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Select, DatePicker, AutoComplete , notification, Row, Col, Checkbox, Radio, Table, InputNumber } from 'antd';

import { Constants } from '../../../Common/Constants';

export default class ViewProjectPhaseTask extends React.Component {
    state={
        datasource: []
    }

    componentDidMount()
    {

    }

    componentWillReceiveProps(){

    }

    canAddTask(){
        if((localStorage[Constants.UserTypeStr]===Constants.AdminRole || localStorage[Constants.UserTypeStr]===Constants.PMRole)
        && this.props.inProgress)
        {
            return true;
        }

        return false;
    }

    render(){
        return(
            <div>
                <div style={{textAlign:"center"}}>
                    <h1>任务列表</h1>
                </div>
                <div>
                    {this.canAddTask() ? <Button type="primary">添加任务</Button> : null}
                </div>
            </div>
        );
    }
}