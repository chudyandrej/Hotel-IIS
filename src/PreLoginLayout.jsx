import React from 'react';


export default class PreLoginLayout extends React.Component {

    static childContextTypes = {
        user: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.handlerChange = this.handlerChange.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            user: {
                loggedIn: false,
                userName: "Default",
                token: null,
                changeHandler: this.handlerChange,
                logout: this.logout
            }
        };
    }

    getChildContext() {
        return {
            user: this.state.user
        }
    }

    handlerChange(user) {
        console.log("user's changed");
        this.setState({
            user: {
                loggedIn: user.loggedIn,
                userName: user.userName,
                token: user.token,
                changeHandler: this.handlerChange,
                logout: this.logout
            }
        });
    }

    logout() {
        this.setState({
            user: {
                loggedIn: false,
                userName: "Default",
                token: null,
                changeHandler: this.handlerChange,
                logout: this.logout
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
