import React from 'react';


export default class Loading extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            subHeader: "Stays",

            editData: null,
            data: [],
            pending: true,
            sending: false
        };
    }

    render() {

        return (
            <div>
                <h1 className="page-header">{this.state.subHeader}</h1>

            </div>
        );
    }
}
