import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { util_fetch } from '../util/fetch';
import { URL } from '../config/url';

class Login extends Component{
    constructor (props){
        super(props);
        this.state = {
        }
    }
    handleSubmit(e){
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('表单数据: ', values);
                const options = util_fetch.headers('POST', values)
                fetch(URL.BASEURL + URL.USER_REGISTER, options)
                    .then(res => res.json())
                    .then(data => {
                        console.log('注册成功',data)
                        Modal.success({
                            title: '成功！',
                            content: `帐号【${data.data.account}】注册成功`,
                            okText: '确定',
                            destroyOnClose: true,
                        });
                        this.props.history.push('/login')
                    })
                    .catch(e => {
                        console.log('错误:', e)
                    })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form onSubmit={e => this.handleSubmit(e)} className="login-form">
                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入管理员帐号！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="管理员帐号" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入管理员密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理员密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('isAdmin', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>是否成为管理员</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码？</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    或者 <a href="">马上去注册</a>
                </Form.Item>
            </Form>
        )
    }
}


const MyLoginForm = Form.create({ name: 'normal_login' })(Login)

export default MyLoginForm