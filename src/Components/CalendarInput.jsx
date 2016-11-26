import React from 'react';
import DatePicker from 'react-datepicker';

//TODO import of datepicker css file here instead of index.html
//import '../../node_modules/react-datepicker/dist/react-datepicker.css';


export default class CalendarInput extends React.Component {
    render() {

        var style = {
          marginLeft: 20
        };

        return (
            <div className="btn-toolbar pull-left" style={style}>
                <DatePicker
                    selected={this.props.startDate}
                    dateFormat="DD/MM/YYYY"
                    todayButton={'Today'}
                    locale='en-gb'
                    onChange={this.props.onChangeStart} />

                <DatePicker
                    selected={this.props.endDate}
                    selectsEnd   startDate={this.props.startDate}
                    dateFormat="DD/MM/YYYY"
                    todayButton={'Today'}
                    locale='en-gb'
                    onChange={this.props.onChangeEnd} />
            </div>
        )
    }
}