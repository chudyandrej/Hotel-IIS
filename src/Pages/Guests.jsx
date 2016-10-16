import React from 'react';

export default class Guests extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            current: "active",
            all: "default",
            subHeader: "Active guests"
        };
        this.handlerCurrentBtn = this.handlerCurrentBtn.bind(this);
        this.handlerAllBtn = this.handlerAllBtn.bind(this);
        this.handlerAddBtn = this.handlerAddBtn.bind(this);
        this.handlerEditBtn = this.handlerEditBtn.bind(this);
    }

    handlerCurrentBtn() {
        this.setState ({
            current: "active",
            all: "default",
            subHeader: "Active guests"
        });
    }


    handlerAllBtn() {
        this.setState ({
            current: "default",
            all: "active",
            subHeader: "All guests"
        });
    }

    handlerAddBtn() {

    }

    handlerEditBtn() {

    }


    render() {

        var clsBtn = "btn btn-info ";

        return (
            <div>
                <h1 className="page-header">Guests</h1>

                <div className='btn-toolbar pull-left'>
                    <button type="button"
                            className={clsBtn + this.state.current}
                            onClick={this.handlerCurrentBtn}>
                        Available
                    </button>
                    <button type="button"
                            className={clsBtn + this.state.all}
                            onClick={this.handlerAllBtn}>
                        All
                    </button>
                </div>

            </div>
        );
    }
}