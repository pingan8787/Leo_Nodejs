import React, { Component } from 'react';

import WxListComponent from '../../components/WxList';

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <WxListComponent />
            </div>
        );
    }
}
