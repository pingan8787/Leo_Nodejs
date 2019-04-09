import React from 'react';
import { Input, Modal, Button, Card, Icon,  Avatar } from 'antd';
import { URL } from '../config/url';

export default class WxAddComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postData:{
                url: ''
            },
            loading: false,
            previewLoading: false,
            previewData: null
        };
        this.save = this.save.bind(this);
        this.preview = this.preview.bind(this);
    }

    init (){
        this.setState({
            postData:{
                url: ''
            },
            loading: false,
            previewLoading: false,
        })
    }
    save (){
        this.setState({loading: true})
        if(!this.state.postData.url){
            Modal.error({
                title: '错误！',
                content: '请输入URL',
            });
            this.init()
            return false
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state.postData),
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch(URL.BASEURL + URL.WX_URL + '/add', options)
            .then(res => res.json())
            .then(data => {
                Modal.success({
                    title: '成功！',
                    content: `文章《${data.data.title}》添加成功`,
                });
                this.init()
            })
            .catch(e => {
                console.log('错误:', e)
                this.init()
            })
    }

    preview (){
        this.setState({previewLoading: true})
        if(!this.state.postData.url){
            Modal.error({
                title: '错误！',
                content: '请输入URL',
            });
            this.init()
            return false
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(this.state.postData),
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch(URL.BASEURL + URL.WX_URL + '/preview', options)
            .then(res => res.json())
            .then(data => {
                this.init()
                this.setState({previewData: data.data})
                console.log(data)
            })
            .catch(e => {
                console.log('错误:', e)
                this.init()
            })

    }

    render (){
        const { url } = this.state.postData
        const { previewData } = this.state
        console.log('2122',previewData)
        return (
            <div className="wx-add-form">
                文章地址：
                
                <Input
                    onChange={e => {this.setState({postData:{url: e.target.value}})}}
                    value={url} style={{ width: 200 }}
                    placeholder="文章地址" 
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button 
                    onClick={this.save} type="primary"
                    loading={this.state.loading}
                >保存</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button 
                    onClick={this.preview}
                    loading={this.state.previewLoading}
                >预览</Button>
                {
                    previewData ?  
                        <Card
                            title={previewData.title}
                            style={{ width: 300 }}
                            cover={<img alt="文章封面图" src={previewData.cover} />}
                            actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                        >
                            <Card.Meta
                                avatar={<Avatar src={previewData.header} />}
                                title={previewData.title}
                                description={`${previewData.gzhName} | ${previewData.gzhId}`}
                            />
                        </Card>
                     : null
                    //  gzhIntroduce  gzhId   gzhName
                }
                {/* <Row className="wx-add-item" gutter={16}>
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
                </Row> */}
            </div>
        )
    }
}