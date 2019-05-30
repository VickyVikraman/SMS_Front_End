import { Layout, Menu } from 'antd';
import React from 'react'
import { Icon, Dropdown } from 'antd';
import {NavLink} from 'react-router-dom'
import { getCurrentUser } from "./../../Service/loginService";
import StudentRegistration from  './studentRegistration';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default class Home extends React.Component{
    state = {
        collapsed: true,
        user:"",
        currentUser: {}
      };

      componentWillMount(){
        
        this.props.checkLogin();
        getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
          });
        })
        .catch(error => {

        });
        
      }
      
      handleMenuClick = ({ key }) =>{

        if(key === "2") {
          this.props.onLogout();
        }
      }
      
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      render(){
        const menu = (
          <Menu onClick={this.handleMenuClick} >
            <Menu.Item key="0">
              <NavLink to="/profile">Profile ({this.state.currentUser.name})</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
              <NavLink to="/changePwd">Change Password</NavLink>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2" >Logout</Menu.Item>
          </Menu>
      );
        return(
          <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px',float:"right" }}
                    >
                        <Menu.Item key="1" style={{backgroundColor:"#001529"}}> {/* set backgroundColor because of overriding inbuild css */}
                            <Icon type="bell" /> 
                        </Menu.Item>
                        <Menu.Item key="2" style={{backgroundColor:"#001529"}}>  {/* set backgroundColor because of overriding inbuild css */}
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    <Icon type="user" /> 
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Menu.Item>
                    </Menu>
                </Header>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{background: '#fff' }}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: "100%" ,marginTop:"1%"}}>
                    <StudentRegistration/>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}> ©2019 Created by Alumni</Footer>
            </Layout>
          </Layout>

        )
    }
}


