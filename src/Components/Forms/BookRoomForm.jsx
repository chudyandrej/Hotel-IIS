import React from 'react';
import moment from 'moment';

import FormButtons from '../Buttons/FormButtons.jsx';
import Guests from '../../Pages/Guests.jsx';
import Rooms from '../../Pages/Rooms.jsx';


export default class BookOrderForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            startDate: moment(),
            endDate: moment(),
            pending: false,

            newOrder: false,
            ordered: null
        }
    }

    handlerSubmitBtn() {

    }

    render() {
        let tableStyle = {
            clear: "both",
            marginTop: 20
        };

        let guest = null;
        let room = null;

        if (this.props.guestInfo != null) {
            guest = (
                <div>
                    <h3>Guest info:</h3>
                    {this.props.guestInfo}
                </div>
            )
        }
        else {
            guest = (
                <div>
                   <Guests isChild={true}/>
                </div>
            )
        }

        if (this.props.roomInfo != null) {
            room = (
                <div>
                    <h3>Room info:</h3>
                    {this.props.roomInfo}
                </div>
            )
        }
        else {
            room = (
                <div>
                    <Rooms isChild={true}/>
                </div>
            )
        }

        return (
            <div style={tableStyle}>
                {guest}
                {room}

                <FormButtons Submit={this.handlerSubmitBtn.bind(this)}
                             Cancel={this.props.Cancel}
                             pending={this.props.pending}/>
            </div>
        );
    }
}
