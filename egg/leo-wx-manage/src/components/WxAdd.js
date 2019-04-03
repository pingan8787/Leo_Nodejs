import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { CONFIG } from '../config/config';
import { URL } from '../config/url';

export default class WxAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            url: ''
        };
        this.save = this.save.bind(this);
        this.getList = this.getList.bind(this);
        this.getDetail = this.getDetail.bind(this);
    }

    save (){
        console.log(this.state)
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch(URL.BASEURL + URL.WX_URL + '/add', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log('错误:', e))
    }

    getList (){
        fetch(URL.BASEURL + URL.WX_URL + '/getList', {method:'GET'})
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log('错误:', e))
    }

    getDetail (){
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch(URL.BASEURL + URL.WX_URL + '/getDetail', options)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log('错误:', e))

    }

    render (){
        const { title, url } = this.state;
        this.getList()
        return (
            <div className="wx-add-form">
                <Row className="wx-add-item" gutter={16}>
                    <Col span={4}>
                        <div className="wx-add-label">文章标题</div>
                    </Col>
                    <Col span={8}>
                        <Input
                            onChange={e => {this.setState({title: e.target.value})}}
                            value={title}
                            placeholder="文章标题" 
                        />
                    </Col>
                </Row>
                <Row className="wx-add-item" gutter={16}>
                    <Col span={4}>
                        <div className="wx-add-label">文章地址</div>
                    </Col>
                    <Col span={8}>
                        <Input
                            onChange={e => {this.setState({url: e.target.value})}}
                            value={url}
                            placeholder="文章地址" 
                        />
                    </Col>
                </Row>
                <Row className="wx-add-item" gutter={16}>
                    <Col className="wx-add-button" span={12}>
                        <Button onClick={this.save} type="primary">保存</Button>
                        <Button onClick={this.getDetail} type="primary">添加</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}