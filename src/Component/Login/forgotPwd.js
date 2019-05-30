import React from "react";
import { notification, Modal, Form, Input, Button } from "antd";
import { forgotPassword } from "./../../Service/loginService";
import OtpInput from "react-otp-input";
import "./otp.css";
import verifyOtpByEmail from "./../../Service/loginService";
import ChangePassword from "./confirmPwd";
import ConfirmPwd from "./confirmPwd";
const FormItem = Form.Item;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ForgotPWD extends React.Component {
  state = {
    visible: false,
    openOtp: false,
    otp: 0,
    username: "",
    openConfirmPwd: false,
    newPwd: ""
  };
  showModal = () => {
    this.setState({ visible: true });
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
            debugger
          forgotPassword(values.email)
            .then(response => {
              notification.success({
                message: "Student Management System",
                description: "OTP send to email"
              });

              this.setState({ openOtp: true, username: values.email });
            })
            .catch(error => {
              if (error.status === 401) {
                notification.error({
                  message: "Student Management System",
                  description: error.message
                });
              } else {
                notification.error({
                  message: "Student Management System",
                  description:
                    error.message ||
                    "Sorry! Something went wrong. Please try again!"
                });
              }
            });
        } else {
          debugger;
          notification.error({
            message: "Student Management System",
            description: "Enter valid Mail Id"
          });
        }
      }
    });
  };

  verifyOtp = () => {
    let verifyOtp = {
      email: this.state.username,
      otp: parseInt(this.state.otp)
    };
    verifyOtpByEmail(verifyOtp)
      .then(response => {
        notification.success({
          message: "Student Management System",
          description: response.message
        });
        if (response.success) {
          this.setState({ openConfirmPwd: true, username: verifyOtp.email,openOtp:false });
        }
        else{
            notification.error({
                message: "Student Management System",
                description: "Please input Correct OTP"
              });
        }
      })
      .catch(error => {
        if (error.status === 401) {
          notification.error({
            message: "Student Management System",
            description: error.message
          });
        } else {
          notification.error({
            message: "Student Management System",
            description:
              error.message || "Sorry! Something went wrong. Please try again!"
          });
        }
      });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const emailError = isFieldTouched("email") && getFieldError("email");
    const otpField = (
      <Form layout="vertical">
        <FormItem label="OTP">
          {getFieldDecorator("otp")(
            <OtpInput
              onChange={otp => this.setState({ otp: otp })}
              numInputs={6}
              inputStyle="otpInput"
              separator={<span>-</span>}
            />
          )}
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          disabled={hasErrors(getFieldsError())}
          onClick={this.verifyOtp}
        >
          Confirm
        </Button>
      </Form>
    );

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Forgot Password
        </Button>
        <Modal
          visible={this.state.visible}
          title="Forgot Password"
          //   okText="Create"
          onCancel={this.onCancel}
        >
          <Form layout="vertical">
            <FormItem
              label="Email"
              validateStatus={emailError ? "error" : ""}
              help={emailError || ""}
            >
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                onClick={this.handleSubmit}
              >
                Send OTP
              </Button>
            </FormItem>
          </Form>
          {this.state.openOtp ? otpField : null}
          {this.state.openConfirmPwd ? <ConfirmPwd/> : null}
        </Modal>
      </div>
    );
  }
}

const ForgotPassword = Form.create({ name: "horizontal_login" })(ForgotPWD);
export default ForgotPassword;
