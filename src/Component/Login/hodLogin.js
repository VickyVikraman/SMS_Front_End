import { Form, Icon, Input, Button,notification } from 'antd';
import React from 'react'
import login from './../../Service/loginService'
import { ACCESS_TOKEN } from './../../constants'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WrappedHodLogin extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
          login(loginRequest)
          .then(response => {
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              localStorage.setItem("role","hod");
              this.props.onLogin();
          }).catch(error => {
              if(error.status === 401) {
                  notification.error({
                      message: 'Student Management System',
                      description: 'Your username or Password is incorrect. Please try again!'
                  });                    
              } else {
                  notification.error({
                      message: 'Student Management System',
                      description: error.message || 'Sorry! Something went wrong. Please try again!'
                  });                                            
              }
          });
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched  } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your User Name!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="User Name"
            />,
          )}
        </Form.Item>
        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const HodLogin = Form.create({ name: 'horizontal_login' })(WrappedHodLogin);

export default HodLogin;
