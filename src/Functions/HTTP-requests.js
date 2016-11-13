import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';


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
                    //TODO logout user
                    reject(res);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
    });
};

