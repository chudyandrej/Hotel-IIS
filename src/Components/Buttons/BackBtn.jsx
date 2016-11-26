import React from 'react';


export default class BackBtn extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    clickHandler() {
        this.props.onClick()
    }

    render() {
        return (
            <div className='btn-toolbar'>
                <button type="button"
                        className="btn btn-info"
                        onClick={this.clickHandler.bind(this)}>
                    Back
                </button>
            </div>
        );
    }
}
