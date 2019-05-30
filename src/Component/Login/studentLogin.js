import { Form, Icon, Input, Button, notification } from 'antd';
import React from 'react'
import { ACCESS_TOKEN } from './../../constants'
import studentLogin from './../../Service/loginService'
// import ForgotPwd from './forgot';
import ForgotPassword from './forgotPwd';
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class WrappedStudentLogin extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  state={
    username:""
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var regex = RegExp('[1-9]{2}[a-zA-Z]{3}[0-9]{3}');
        if(regex.test(values.username)){
          const loginRequest = Object.assign({}, values);
          studentLogin(loginRequest)
          .then(response => {
            
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              localStorage.setItem("role","student")
              this.props.onLogin();
          }).catch(error => {
              if(error.status === 401) {
                  notification.error({
                      message: 'Student Management System',
                      description: 'RollNo and Password is Mismatch. Please try again!'
                  });                    
              } else {
                  notification.error({
                      message: 'Student Management System',
                      description: error.message || 'Sorry! Something went wrong. Please try again!'
                  });                                            
              }
          });
        }
        else{
          debugger
          notification.error({
            message: 'Student Management System',
            description: 'Enter valid Roll No'
          })
        }
      }
    });
  };



  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched  } = this.props.form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <div>
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your Roll No!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="username"
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
          {/* <ForgotPwd/> */}
          <br/>
          <br/>
          <Button type="primary" htmlType="submit" className="login-form-button"  disabled={hasErrors(getFieldsError())}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <ForgotPassword />
      </div>
    );
  }
}

const StudentLogin = Form.create({ name: 'horizontal_login' })(WrappedStudentLogin);

export default StudentLogin;
