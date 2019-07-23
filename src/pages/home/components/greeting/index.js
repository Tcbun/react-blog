import React from 'react';
import NormalLoginForm from '../login';
import { connect } from 'react-redux';
import { Button } from 'antd';
import './index.scss';

function Greeting(props) {
    const { isLogged, loginOut,userName } = props;
    if (isLogged) {
        return (
            <div className="logged">
                <div>你好！</div>
                <div>{userName}</div>
                <Button type="primary" onClick={loginOut}>退出</Button>
            </div>
        )
    }
    return (
        <NormalLoginForm />
    )
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.home.isLogged,
        userName:state.home.userName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginOut: function () {
            const action = {
                type: 'loginOut',
                payload: false
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);