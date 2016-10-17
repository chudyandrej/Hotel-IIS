import React from 'react';


export default class FormButtons extends  React.Component {
    render(){
        return (
            <div className='btn-toolbar form-actions'>
                <button type="button" className="btn btn-secondary" onClick={this.props.Cancel}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.props.Submit}>Submit</button>
            </div>
        )
    }
}
