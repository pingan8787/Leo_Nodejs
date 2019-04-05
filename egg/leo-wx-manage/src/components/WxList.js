import React from 'react';
import { Table } from 'antd';
import { URL } from '../config/url';


const columns = [{
    title: '序号',
    dataIndex: '_id',
    width: 200,
  }, {
    title: '标题',
    dataIndex: 'title',
    width: 300,
    render: (text, record) => <a target="_blank" href={record.url ? record.url : 'javascritp:;'} >{record.title}</a>,
  }, {
    title: '公众号名称',
    dataIndex: 'gzhName',
    width: 100,
  }, {
    title: '公众号介绍',
    dataIndex: 'gzhIntroduce',
    width: 300,
  }, {
    title: '封面',
    dataIndex: 'header',
    width: 200,
    align: 'center',
    render: (text, record) => <img className="" src={record.header ? record.header :''} />
  }
];

export default class WxListComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loading : false,
            pagination: {},
        };
        this.getList = this.getList.bind(this);
    }
    
    componentDidMount(){
        this.getList()
    }
    getList (){
        fetch(URL.BASEURL + URL.WX_URL + '/getList', {method:'GET'})
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.data.list,
                    loading: true
                })
                console.log(data.data.list)
            })
            .catch(e => console.log('错误:', e))
    }

    changePage (pagination, filters, sorter) {
        const pager = { ...this.state.pagination }
        this.setState({
            pagination: pager
        })
        console.log(pager)
    }
    
    render (){
        return (
            <div>
                <Table className="wx-list-table"
                    columns={columns} 
                    dataSource={this.state.data} 
                    rowKey='_id'
                    bordered
                />
            </div>
        )
    }
}