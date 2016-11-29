import cookie from 'react-cookie';
import React from 'react';
import SkyLight from 'react-skylight';

import {hashHistory} from 'react-router';


export default class PopupNotif extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.refs.dialogWithCallBacks.show();
    }

    _executeAfterModalClose(){
        //alert('Executed after close');
        console.log("Token has expired");
        cookie.remove('token');
        cookie.remove('permissions');
        cookie.remove('loggedIn');
        hashHistory.push('/');
    }

    render() {
        return (
            <div>
                <SkyLight
                    afterClose={this.props.logout == null ? null : this._executeAfterModalClose}
                    ref="dialogWithCallBacks"
                    title={this.props.title}>
                    {this.props.body}
                </SkyLight>
            </div>
        );
    }
}