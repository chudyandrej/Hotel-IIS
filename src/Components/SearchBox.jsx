import React from 'react';


export default class SearchBox extends React.Component {
    render() {
        return (
            <div className="col-xs-2">
                <input
                    className="form-control"
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}/>
            </div>
        )
    }
}