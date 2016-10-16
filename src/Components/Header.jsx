import React from 'react';

export default class Header extends React.Component {

    onClickLogout() {
        //TODO logout call
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Hotel-ISS</a>
                    </div>

                    <div className='btn-toolbar pull-right'>
                        <div className='btn-group'>
                            <button type='button' className='btn btn-primary' onClick={this.onClickLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}