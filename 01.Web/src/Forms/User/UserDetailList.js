import React from 'react';
import { Row, Col, Button, Table, Divider, Modal, message, Form, Input } from 'antd';
import { 
  GetUserDetailList, 
  GetUserDetailById, 
  SaveUserDetail,
  DeleteUserDetail, 
} from '../../api/index';

class UserDetailList extends React.Component {
    state = {

    }

    componentDidMount() {
        
    }

    render() {
        return(<h3>UserDetailList page</h3>)
    }
}

export default UserDetailList;