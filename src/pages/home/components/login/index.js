import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Axios from 'axios';
import './index.scss';
import { connect } from 'react-redux';
import { message } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    const { changelogin,toggleMessage } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        Axios.post('http://localhost:8889/login', {
          userName: values.username,
          password: values.password
        })
          .then(function (res) {
            console.log(res);
            const data = res.data;
            changelogin(data);
            toggleMessage(data);
          })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          {/* <a className="login-form-forgot" href="">
            忘记密码？
          </a> */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Link to="/register">立即注册!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleMessage(data) {
      switch (data.code) {
        case 0:
            message.error('用户不存在！');
          break;
        case 1:
            message.success('登陆成功！');
          break;
        case 2:
            message.error('密码错误！');
          break;
          default:
      }
    },
    changelogin: function (data) {
      const action = {
        type: 'changeLogin',
        payload: {
          code:data.code,
          userName:data.userName
        }
      };
      dispatch(action);
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);