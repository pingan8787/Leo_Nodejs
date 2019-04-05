import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { URL } from '../config/url';

export default class WxAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            url: ''
        };
        this.save = this.save.bind(this);
    }

    save (){
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

    render (){
        const { title, url } = this.state;
        return (
            <div className="wx-add-form">
                {/* <Row className="wx-add-item" gutter={16}>
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
                </Row> */}
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
                    </Col>
                </Row>
            </div>
        )
    }
}