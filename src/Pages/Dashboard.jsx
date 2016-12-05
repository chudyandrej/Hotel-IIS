import cookie from 'react-cookie';
import React from 'react';
import BarChart from 'react-bar-chart';
import Loading from '../Components/Loading.jsx';
import {downloadData} from '../Functions/HTTP-requests.js';


export default class Dashboard extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pending: false,
            root: cookie.load('permissions') === "root",
            data: [],
            errorNotification: null
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({pending: true});
        downloadData('staysStatistics', {}).then((data) => {
            this.setState({pending: false, data: data});
        }, (err) => {
            console.log(err);
            this.setState({errorNotification: err.popup, pending: false});
        });
    }

    render() {
        let content = null;
        if (this.state.root) {
            const margin = {top: 50, right: 20, bottom: 30, left: 100};

            let chart = (
                <div>
                    <br/>
                    <h2>Stays per month:</h2>
                    <div>
                        <BarChart width={800}
                                  height={300}
                                  margin={margin}
                                  data={this.state.data}/>
                    </div>
                </div>
            );

            content = this.state.pending ? <Loading /> : chart;
        }

        return (
            <div>
                <h1 className="page-header">Dashboard</h1>
                <iframe type='text/html'
                        height={245}
                        width={'100%'}
                        frameBorder='0'
                        src={'https://forecast.io/embed/#lat=49.19&lon=16.61&name=Brno&units=ca'}/>

                {content}

            </div>
        );
    }
}