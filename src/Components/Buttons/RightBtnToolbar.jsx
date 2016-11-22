import React from 'react';


export default class RightBtnToolbar extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            removeState: false
        }
    }

    handlerClick(name) {
        if(name === "add"){
            this.setState({removeState: false});
            this.props.Add();
        }
        else{
            //if on add page (Add btn is active)
            //remove is not allowed
            if(!this.props.AddState){
                this.setState({
                    removeState: !this.state.removeState
                });
                this.props.Remove();
            }
        }
    }

    render() {
        let AddBtn = (
            <button type="button"
                    className={this.props.AddState ? "btn btn-info active" : "btn btn-info"}
                    onClick={this.handlerClick.bind(this, "add")}>
                Add
            </button>
        );

        let RemoveBtn = (
            <button type="button"
                    className={this.state.removeState ? "btn btn-info active" : "btn btn-info"}
                    onClick={this.handlerClick.bind(this, "remove")}>
                Remove
            </button>
        );

        return (
            <div className='btn-toolbar pull-right'>
                {this.props.Remove == null ? null : RemoveBtn}
                {this.props.Add == null ? null : AddBtn}
            </div>
        )
    }
}