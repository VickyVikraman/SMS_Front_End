import React from "react";
import { Form, Input } from "antd";
const FormItem = Form.Item;
class ChangePassword extends React.Component {
  state = {
    confirmDirty: false
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      this.setState({ newPwd: value });
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Form layout="vertical">
        <FormItem label="Password" {...formItemLayout}>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your new password!"
              },
              {
                validator: this.checkConfirm
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="Confirm Password" {...formItemLayout}>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your new password!"
              },
              {
                validator: this.checkPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
      </Form>
    );
  }
}
const ConfirmPwd = Form.create({ name: "vertical" })(ChangePassword);
export default ConfirmPwd;
