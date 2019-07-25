import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

class Step4 extends React.Component {
    render() {
        let height = window.innerHeight - 250;
        console.log(window.innerHeight);
        return (      
            <div style={{overflow:"auto",height:`${height}px`}}>
              <span>您的IT-DEV-Project模板已创建成功</span>
              <div>您可进入<Link to="/app/template/list" >模板列表</Link>查看更多模板。或通过此模板去<Link to="/app/project/create" >创建项目</Link></div>
            </div>      
           
        );
    }
}

export default Step4;