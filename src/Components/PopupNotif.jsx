import React from 'react';
import SkyLight from 'react-skylight';


export default class PopupNotif extends React.Component {

    constructor(props){
        super(props);
    }

    _executeBeforeModalOpen(){
        alert('Executed before open');
    }

    _executeAfterModalOpen(){
        alert('Executed after open');
    }

    _executeBeforeModalClose(){
        alert('Executed before close');
    }

    _executeAfterModalClose(){
        alert('Executed after close');
    }

    _executeOnOverlayClicked(){
        alert('Overlay clicked!');
    }

    render() {
        return (
            <div>
                <section>
                    <h1>React SkyLight</h1>
                    <button onClick={() => this.refs.dialogWithCallBacks.show()}>Open Modal</button>
                </section>
                <SkyLight
                    afterClose={this._executeAfterModalClose}
                    afterOpen={this._executeAfterModalOpen}
                    beforeClose={this._executeBeforeModalClose}
                    beforeOpen={this._executeBeforeModalOpen}
                    onOverlayClicked={this._executeOnOverlayClicked}
                    ref="dialogWithCallBacks"
                    title="Hello!, I'm a modal with callbacks!">
                    I have callbacks!
                </SkyLight>
            </div>
        );
    }
}