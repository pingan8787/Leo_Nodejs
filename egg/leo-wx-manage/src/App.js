import React, { Component } from 'react';
import logo from './logo.svg';
import { Layout, Menu, Icon } from 'antd';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

import './App.css';

import Home from './page/Home';
import Login from './page/Login';
import Wx from './page/Wx';

const { Header, Sider, Content } = Layout;

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
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="leo-nav-title">
                  <Link to="/wx">公众号文章管理</Link>
                </span>
              </Menu.Item>
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
              <Route exact path="/" component={Wx} />
              <Route path="/login" component={Login} />
              <Route path="/wx" component={Wx} />
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;

{/* <Router>
</Router> */}

{/* <Link to="/home">首页</Link>
<Link to="/wx">公众号文章管理</Link> */}
