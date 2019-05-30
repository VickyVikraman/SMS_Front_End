import React from "react";
import "./login.css";
import HodLogin from "./hodLogin";
import { Card} from "antd";
import { Tabs } from "antd";
import StudentLogin from "./studentLogin";
import ClassAdvisorLogin from "./caLogin";

 
 
const TabPane = Tabs.TabPane;
class Login extends React.Component {
  state = {
    flag: true,
    visible: false,
    currentUser: null
  };

  componentWillMount() {
    this.props.loginCheck();
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ flag: false });
    }, 2000);
  }

  handleLogin = () => {
    this.props.onLogin();
  };

  handleStudentLogin = () => {
    this.props.onStudentLogin();
  };


  render() {
    return (
      <div>
        <div className="mainLogin">
          <Card loading={this.state.flag} title="SMS" className="login">
            <Tabs tabPosition="left">
              <TabPane tab="Student Login" key="1">
                <StudentLogin
                  onLogin={this.handleStudentLogin}
                />
              </TabPane>
              <TabPane tab="CA Login" key="2">
                <ClassAdvisorLogin />
              </TabPane>
              <TabPane tab="Login" key="3">
                <HodLogin onLogin={this.handleLogin} />
              </TabPane>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
