import React from 'react';


export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1 className="page-header">Dashboard</h1>
                <iframe type='text/html'
                        height={245}
                        width={'100%'}
                        frameBorder='0'
                        src={'https://forecast.io/embed/#lat=49.19&lon=16.61&name=Brno&units=ca'}/>
            </div>
        );
    }
}