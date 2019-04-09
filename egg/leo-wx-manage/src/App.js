import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

import './App.css';

import Home from './page/Home';
import Login from './page/Login';
import WxAdd from './page/Wx/WxAdd';
import WxList from './page/Wx/WxList';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout className="leo">
        <Router>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="leo-nav-title">
                  <Link to="/login">登录</Link>
                </span>
              </Menu.Item>
              <SubMenu key="2" title={<span><Icon type="mail" /><span>公众号文章管理</span></span>}>
                <Menu.Item key="21"><Link to="/wx_add">添加文章</Link></Menu.Item>
                <Menu.Item key="24"><Link to="/wx_list">文章列表</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="leo-nav-title">
                  <Link to="/home">首页</Link>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header className="leo-header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content className="leo-content">
              <Route exact path="/" component={WxAdd} />
              <Route path="/login" component={Login} />
              <Route path="/wx_add" component={WxAdd} />
              <Route path="/wx_list" component={WxList} />
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;