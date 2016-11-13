import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import {hashHistory} from 'react-router';


export var sendRequest = function(url, data) {
    data['token'] = cookie.load('token');

    return new Promise((resolve, reject) => {
        request
            .post(url)
            .set('Accept', 'application/json')
            .send(data)
            .end((err, res)=> {
                if (err != null || !res.ok) {
                    console.log(res);  //debug
                    if(res.status == 400) {
                        console.log("Token has expired");
                        hashHistory.push('/');
                    }
                    reject(res);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
    });
};

