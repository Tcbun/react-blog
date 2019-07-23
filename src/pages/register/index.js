import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Icon
} from 'antd';

import './index.scss';

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    ifAgree: false
  };

  handleSubmit = (e, props) => {
    const { form } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err && form.getFieldValue('agreement')) {
        console.log('Received values of form: ', values);
        this.setState({
          ifAgree: false
        })
      } else {
        this.setState({
          ifAgree: true
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码必须一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div className="registerFrom">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label={
              <span>
                账号
              </span>
            }
          >
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入您的用户名！',
                  whitespace: true
                },
                {
                  min: 6,
                  message: '用户名不能少于6位'
                },
                {
                  max: 18,
                  message: '用户名不能多于12位'
                },
                {
                  pattern: /^[a-zA-Z0-9]+$/,
                  message: '不能有特殊字符'
                },
                {
                  validator: this.validateUser,
                },
              ],
            })(<Input placeholder="用户名" />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '您必须输入密码!',
                },
                {
                  min: 6,
                  message: '密码不能少于6位'
                },
                {
                  max: 18,
                  message: '密码不能多于12位'
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password placeholder="密码" />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '您必须确认密码!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="确认密码" />)}
          </Form.Item>
          <Form.Item label="验证码" extra="我需要确保您不是机器人">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: false, message: '您必须输入验证码!' }],
                })(<Input placeholder="验证码" />)}
              </Col>
              <Col span={12}>
                <Button>暂时无需填写验证码</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                我同意在这里注册！
              </Checkbox>
            )}
            <span className={this.state.ifAgree ? 'eleShow' : 'eleHidden'}><Icon type="warning" className="warningAgree"/>您必须同意才可以注册</span>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;