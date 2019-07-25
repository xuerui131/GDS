import React, { Component, useCallback } from 'react';
import { useStore } from "./Store/useStore";

import { Button, Input,notification } from 'antd';
import 'antd/dist/antd.css';

import logo from './asset/images/logo.png';

import axios from 'axios';
import { Constants }  from './Common/Constants';

import createHistory from 'history/createHashHistory';

const hashHistory = createHistory();

export const LoginHOC = (props)=>{
    const {
        state: {
          user: { loggedIn, userType }
        },
        dispatch
      } = useStore();

      const login = useCallback((userTypeLabel, authToken, userId) => {
        console.log(userTypeLabel, authToken,userId);
        let state = { userType:userTypeLabel, token: authToken, userId:userId };
        dispatch({ type: "login", ...state });
    }, [dispatch]);

    const logout = useCallback(() => dispatch({ type: "logout" }), [dispatch]);

    const handleAfterLogin = (token) => {
        // let loginData = {
        //     loginName:formData.phone.substring(0,3) + formData.phone.substring(4,8) + formData.phone.substring(9),
        //     password:formData.password
        // };

        // axios.post(`${Constants.APIBaseUrl}/base/login`, loginData)
        //     .then(res => {
                
        //         console.log('res=>', res);
        //     })
        //     .catch(function (error) {
        //         console.log("login fail");
        //         Toast.hide();

        //         Toast.fail('登录失败', 2);

        //         // login(userType, "");
        //         // const history = createHistory();
        //         //     history.push('/Index');
        //     });
        login(userType, token, 0);

        axios.defaults.headers.common['Authorization'] = token;
        // 将token存在本地 应对刷新
        localStorage.setItem('token', token);

        hashHistory.push('/app');

        //window.location.hash = '#/app';
        //props.onLogin();
    }

    return(
        <LoginForm afterLogin={handleAfterLogin}></LoginForm>
    );
}


class LoginForm extends Component {
    state = {
        isLoading: false,
        userName: '',
        password: ''
    };

    onLogin()
    {
        if(!this.state.userName || !this.state.password)
        {
            notification.open({
                message: '信息错误',
                description:
                  '请输入用户名和密码',
                onClick: () => {
                  //console.log('Notification Clicked!');
                },
                duration: 3
              });

              return;
        }

        if(!this.state.password || this.state.password != '000000')
        {
            notification.open({
                message: '密码错误',
                description:
                  '请输入正确的密码',
                onClick: () => {
                  //console.log('Notification Clicked!');
                },
                duration: 3
              });

              return;
        }

        this.setState({
            isLoading: true
        });

        let loginData = {
            loginName:this.state.userName,
        };

        let that = this;
        axios.post(`${Constants.APIBaseUrl}/home/login`, loginData,  {
        // axios.post(`${Constants.APIBaseUrl}/home/login`, loginData,  {
            headers: {'Content-Type':'application/json'}
        })
            .then(res => {
                console.log(res);
                console.log('res=>', res);
                window.localStorage[Constants.UserNameLabel] = res.data.Data.Name;
                window.localStorage[Constants.UserTypeStr] = res.data.Data.UserTypeDesc;

                this.props.afterLogin(res.data.Data.loginToken);             
                that.setState({
                    isLoading: false
                });
            })
            .catch(function (error) {
                console.log("login fail");
                console.log(error);
                that.setState({
                    isLoading: false
                });
            });
    }

    onUserNameChange = (e)=>
    {
        this.setState({
            userName:e.target.value
        })
    }

    onPasswordChange = (e)=>
    {
        this.setState({
            password:e.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    <img src={logo} alt="logo" style={{overflow:'hidden',margin:'auto', display:'block'}}/>
                </div>  
                <div style={{ "textAlign":"center", 'width':'30%', 'margin':'auto' }}>
                    <div>
                        <Input placeholder="用户名"  defaultValue={this.state.userName} onChange={this.onUserNameChange.bind(this)} />
                        <Input.Password placeholder="密码" defaultValue={this.state.password} onChange={this.onPasswordChange.bind(this)} />
                    </div>

                    <div style={{ "backgroundColor": "white", "marginTop": "30px", "marginBottom":"20px", "visibility":"{}" }}>
                    <Button type="primary" block onClick={this.onLogin.bind(this)} loading={this.state.isLoading}>
                        登录
                    </Button>
                    </div>

                    <div style={{ "marginTop": "20px" }}>

                    </div>
                </div>
            </div>

        )
    }

}