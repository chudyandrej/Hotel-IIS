import React from 'react';
import ImageLoader from 'react-imageloader';


export default class Loading extends React.Component {

    render() {

        var style = {
            clear: "both",
            margin: "auto"
        };

        return (
            <div className="table-responsive" style={style}>
                <p style={{textAlign: "center", marginTop: 100}}><ImageLoader src="../../public/img/loading.gif" /></p>
            </div>
        );
    }
}
