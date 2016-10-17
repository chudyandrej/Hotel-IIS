import React from 'react';


export default class RightBtnToolbar extends React.Component {
    render() {
        return (
            <div className='btn-toolbar pull-right'>
                <button type="button"
                        className="btn btn-info"
                        onClick={this.props.Add}>
                    Add
                </button>

                <button type="button"
                        className="btn btn-info"
                        onClick={this.props.Edit}>
                    Edit
                </button>
            </div>
        )
    }
}