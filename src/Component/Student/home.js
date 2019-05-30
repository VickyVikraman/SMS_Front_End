import { Layout, Menu } from 'antd';
import React from 'react'
import { getCurrentStudent } from '../../Service/loginService';
import TopBar from './topBar';
const { Header, Content, Footer, Sider } = Layout;

export default class StudentHome extends React.Component{
    state = {
        collapsed: true,
        currentUser:{}
      };

      componentWillMount(){

        this.props.checkLogin();
        getCurrentStudent()
        .then(response => {
          console.log(response)
          this.setState({
            currentUser: response,
          });
        })
        .catch(error => {

        });
      }
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };

    handleMenuClick = () =>{

        this.props.onLogout();
    }

    render(){
        return(
          <Layout style={{ minHeight: '100vh' }}>

            <TopBar currentUser={this.state.currentUser} onLogout={this.handleMenuClick} />
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: "100%" ,marginTop:"1%"}}>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}> ©2019 Created by Alumni</Footer>
            </Layout>
          </Layout>

        )
    }
}


