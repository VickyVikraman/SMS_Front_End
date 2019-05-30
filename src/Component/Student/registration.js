import { Steps, Button, message, Layout } from "antd";
import React from "react";
import getCurrentStudent from "./../../Service/loginService";
import "./assets/css/registration.css";
import TopBar from "./topBar";
import PerosnalDetails from "./Register/personalDetails";
const Step = Steps.Step;

const steps = [
  {
    title: "Personal Details",
    content: <PerosnalDetails/>
  },
  {
    title: "Qualifying Exams",
    content: "Second-content"
  },
  {
    title: "Address",
    content: "Last-content"
  },
  {
    title: "Contact Details",
    content: "Last-content"
  }
];

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentWillMount() {
    this.props.checkLogin();
    getCurrentStudent()
      .then(response => {
        console.log(response);
        this.setState({
          currentUser: response
        });
      })
      .catch(error => {});
  }

  handleMenuClick = () => {
    this.props.onLogout();
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <TopBar
            currentUser={this.state.currentUser}
            onLogout={this.handleMenuClick}
          />
          <div className="registration">
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              {steps[this.state.current].content}
            </div>
            <div className="steps-action">
              {this.state.current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {this.state.current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success("Processing complete!")}
                >
                  Save
                </Button>
              )}
              {this.state.current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}
