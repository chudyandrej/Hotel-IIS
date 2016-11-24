import React from 'react';


export default class RightBtnToolbar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    handlerClick() {
        this.props.Add();
    }

    render() {
        let AddBtn = (
            <button type="button"
                    className="btn btn-info"
                    onClick={this.handlerClick.bind(this)}>
                Add
            </button>
        );

        return (
            <div className='btn-toolbar pull-right'>
                {AddBtn}
            </div>
        )
    }
}