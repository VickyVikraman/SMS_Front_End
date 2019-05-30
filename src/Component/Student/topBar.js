import { Layout, Menu } from "antd";
import React from "react";
import { Icon, Dropdown } from "antd";
import { NavLink } from "react-router-dom";
const { Header} = Layout;

export default class TopBar extends React.Component {
  state = {
    collapsed: true,
    currentUser: {}
  };

  componentWillMount() {
   
  }

  handleMenuClick = ({ key }) => {
    if (key === "2") {
      this.props.onLogout();
    }
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0">
          <NavLink to="/profile">
            Profile ()
          </NavLink>
        </Menu.Item>
        <Menu.Item key="1">
          <NavLink to="/changePwd">Change Password</NavLink>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">Logout</Menu.Item>
      </Menu>
    );
    return (
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px", float: "right" }}
        >
          <Menu.Item key="1" style={{ backgroundColor: "#001529" }}>
            <Icon type="bell" />
          </Menu.Item>
          <Menu.Item key="2" style={{ backgroundColor: "#001529" }}>
            <Dropdown overlay={menu} trigger={["click"]}>
            
              <a className="ant-dropdown-link" href="">
                <Icon type="user" />
                <Icon type="down" />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
