import React, { Component } from 'react';
import { CONFIG } from '../config/config.js';

import WxAddComponent from '../components/WxAdd';

export default class Home extends Component{
    constructor (props){
        super(props);
        this.state = {
        }
        this.addData = this.addData.bind(this);
    }

    addData () {
        console.log(this.state.artical)
    }

    render(){
        return(
            <div>
                <WxAddComponent />
            </div>
        );
    }
}
