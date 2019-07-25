import React, { Component } from 'react';
import { Button, Card, Col, Row, Layout, Menu, Breadcrumb, Icon, Dropdown, Avatar, Badge, Modal } from 'antd';

import { Router, Route, Switch, Link } from 'react-router-dom';
import history from './history';

import { LoginHOC } from './Login';

import DashBoard from './Forms/DashBoard/Index';

import { CreateTemplateHOC } from './Forms/Template/CreateTemplate';
import TemplateList from './Forms/Template/TemplateList';

import ViewTemplate from './Forms/Template/ViewTemplate';
import ApproveTemplate from './Forms/Template/ApproveTemplate';

// import CreateProjectForm from './Forms/Project/CreateProject';
import { CreateProjectHOC } from './Forms/Project/CreateProject';
import ProjectList from './Forms/Project/ProjectList';
import ViewProject from './Forms/Project/ViewProject';
import ApproveProject from './Forms/Project/ApproveProject';

import FlowSetting from './Forms/Flow/Setting';
import FlowList from './Forms/Flow/List';

import FormList from './Forms/Form/List';
import FormLib from './Forms/Form/formLib'

import logo from '../src/asset/images/logo.png';

// BY
import DepartmentList from './Forms/Department/List';
import UserList from './Forms/User/UserList';
// import UserDetailList from './Forms/User/UserDetailList';
import MenuManage from './Forms/Jurisdiction/menuManage';
import RoleManage from './Forms/Jurisdiction/roleManage';
import LogList from './Forms/Log/List';

import { backMenu_getBackMenuList } from './api/index';

// import template from './asset/images/template.svg';
// import templateList from './asset/images/template_list.svg';
// import project from './asset/images/project.png';
// import projectList from './asset/images/project_list.svg';

import './App.css';
import { Constants } from './Common/Constants';

const { Meta } = Card;
const { SubMenu } = Menu;
const { Sider, Header, Content, Footer } = Layout

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      collapsed: false,
      menuList: [],
    }

    this.onLoginSucceed.bind(this);
    this.toggle.bind(this);
    this.getBackMenuList = this.getBackMenuList.bind(this);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onLoginSucceed = () => {
    this.setState({
      loggedIn: true
    });
    this.getBackMenuList();
  }

  logout = () => {
    this.setState({
      loggedIn: false
    });
  }

  getBackMenuList() {
    backMenu_getBackMenuList()
      .then(res => {
        console.log('--> 获取菜单列表');
        console.log(res);
        if(!res.Data){ return };
        this.setState({ menuList: res.Data });
      })
  }

  createMenuList(menuList) {
    const menu = menuList.map(supMenu => (
      <SubMenu
        key={supMenu.Id}
        title={
          <span>
            <Icon type={supMenu.MenuIcon} />
            <span>{supMenu.Name}</span>
          </span>
        }
      >
        {
          supMenu.SubMenuList.map(subMenu => (
            <Menu.Item key={subMenu.Id}>
              <Icon type={subMenu.MenuIcon} />
              {subMenu.Name}
              <Link to={subMenu.AccessUrl} />
            </Menu.Item>
          ))
        }
      </SubMenu>
    ));
    return menu;    
  }

  render() {
    console.log(this.state.loggedIn);
    if(!this.state.loggedIn)
    {
      return(
        <LoginHOC onLogin={this.onLoginSucceed}></LoginHOC>
      );
    }

    const menuList = this.createMenuList(this.state.menuList);

    const menu = (
      <Menu className='menu'>
        <Menu.ItemGroup title='用户中心' className='menu-group'>
          <Menu.Item disabled>你好 - {window.localStorage[Constants.UserNameLabel]}</Menu.Item>
          <Menu.Item disabled>职务 - {window.localStorage[Constants.UserTypeStr]}</Menu.Item>
          {/* <Menu.Item>个人信息</Menu.Item> */}
          <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
        </Menu.ItemGroup>
        {/* <Menu.ItemGroup title='设置中心' className='menu-group'>
          <Menu.Item>个人设置</Menu.Item>
          <Menu.Item>系统设置</Menu.Item>
        </Menu.ItemGroup> */}
      </Menu>
    )

    const login = (
      <Dropdown overlay={menu}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
        {/* <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/> */}
      </Dropdown>
    )

    const { visible } = this.state;

    return (
      <Router history={history}>
        <Layout>
          <Sider collapsible
            trigger={null}
            collapsed={this.state.collapsed}

          >
            <div style={{ height: '100vh', overflowY: 'scroll', backgroundColor: '#4e73df' }}>
              <div className="logo"></div>  
              <Menu
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
              <Menu.Item key="0">
                  <Icon type="home" />
                  <span>首页</span>
                  <Link to="/" />
                </Menu.Item>
                {
                  menuList
                }    
              </Menu>

              {/* <Menu
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="0">
                  <Icon type="home" />
                  <span>首页</span>
                  <Link to="/" />
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="profile" />
                      <span>模板管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="1">创建模板<Link to="/template/create" /></Menu.Item>
                  <Menu.Item key="2">模板列表<Link to="/template/list" /></Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="project" />
                      <span>项目管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="5">新建项目<Link to="/project/create" /></Menu.Item>
                  <Menu.Item key="6">项目列表<Link to="/project/list" /></Menu.Item>
                </SubMenu>
                <Menu.Item key="11">
                  <Icon type="form" />
                  表单库<Link to="/form/list" />
                </Menu.Item>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="apartment" />
                      <span>流程管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="9">权限配置<Link to="/flow/setting" /></Menu.Item>
                  <Menu.Item key="10">流程处理<Link to="/flow/list" /></Menu.Item>
                </SubMenu>
                  
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <Icon type="bank" />
                      <span>部门管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="41">部门列表<Link to="/department/list" /></Menu.Item>
                  <Menu.Item key="52">表单库<Link to="/formLib/index" /></Menu.Item>
                </SubMenu>

                <SubMenu
                  key="sub6"
                  title={
                    <span>
                      <Icon type="team" />
                      <span>权限管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="61">菜单管理<Link to="/jurisdictionManage/menuManage" /></Menu.Item>
                  <Menu.Item key="62">角色管理<Link to="/jurisdictionManage/roleManage" /></Menu.Item>
                  <Menu.Item key="63">用户管理<Link to="/jurisdictionManage/userManage" /></Menu.Item>
                </SubMenu>
              </Menu> */}
            </div>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <div id='headerbar'>
                {/* <div style={{width:'20%', float:'left'}}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </div> */}
                <div style={{ width: '70%', float: 'left', textAlign: 'left' }}>
                  <img src={logo} alt="logo" height="50"></img>
                </div>
                <div style={{ lineHeight: '64px', float: 'right', width: '30%' }}>
                  <ul className='header-ul'>
                    {/* <li onClick={() => this.setState({ count: 0 })}>
                      <Badge count={99} overflowCount={99} style={{ marginRight: -17 }}>
                        <Icon type="notification" />
                      </Badge>
                    </li> */}
                    <li>
                      {login}
                    </li>
                  </ul>
                </div>
                <div style={{ clear: 'both' }}></div>
                {/* <Modal
                  footer={null} closable={false}
                  visible={visible}
                  wrapClassName="vertical-center-modal"
                  onCancel={() => this.setState({ visible: false })}>
                  <img src={avatar} alt="" width='100%'/>
                </Modal> */}
              </div>
            </Header>
            <Content style={{ padding: "20px 50px 0px 70px", marginTop:"15px", backgroundColor: "white" }}>
              <Switch>
                <Route exact path="/" component={DashBoard} />
                <Route path="/template/create" component={CreateTemplateHOC} />
                <Route path="/template/list" component={TemplateList} />
                <Route path="/template/view/:templateId?" component={ViewTemplate} />
                <Route path="/app/template/approve/:templateId?" component={ApproveTemplate} />
                <Route path="/project/create" component={CreateProjectHOC} />
                <Route path="/project/list" component={ProjectList} />
                <Route path="/project/view/:projId?" component={ViewProject} />
                <Route path="/project/approve/:projId?" component={ApproveProject} />
                <Route path="/flow/setting" component={FlowSetting} />
                <Route path="/flow/list" component={FlowList} />
                {/*BY*/}
                <Route path="/department/list" component={DepartmentList} />
                <Route path="/jurisdictionManage/menuManage" component={MenuManage} />
                <Route path="/jurisdictionManage/roleManage" component={RoleManage} />
                <Route path="/jurisdictionManage/userManage" component={UserList} />
                <Route path="/log/list" component={LogList} />

                <Route path="/formLib/index" component={FormLib} />
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center' }}>万国数据</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }

}

export default App;
