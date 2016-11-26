import React from 'react';


export default class AddBtn extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handlerClick() {
        this.props.Add();
    }

    render() {
        return (
            <div className='btn-toolbar pull-right'>
                <button type="button"
                        className="btn btn-info"
                        onClick={this.handlerClick.bind(this)}>
                    Add
                </button>
            </div>
        )
    }
}