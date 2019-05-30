import {
  Form,
  Input,
  Row,
  Col,
} from "antd";
import React from "react";
const FormItem = Form.Item;

class PerosnalDetailsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };


  render() {

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
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Row gutter={40}>
          <Col span={8} style={{ display: "block" }}>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
          </Col>
          <Col span={8} style={{ display: "block" }}>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
          </Col>
          <Col span={8} style={{ display: "block" }}>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
            <FormItem {...formItemLayout} label="Roll No">
              <Input placeholder="placeholder" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const PerosnalDetails = Form.create({ name: "register" })(PerosnalDetailsForm);

export default PerosnalDetails;
