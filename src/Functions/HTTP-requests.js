import React from 'react';
import request from 'superagent';
import cookie from 'react-cookie';
import {hashHistory} from 'react-router';


export const sendRequest = function(url, data) {
    data['token'] = cookie.load('token');
    
    return new Promise((resolve, reject) => {
        request
            .post(url)
            .set('Accept', 'application/json')
            .send(data)
            .end((err, res)=> {
                if (err != null || !res.ok) {
                    console.log("error in request");
                    console.log(res);  //debug
                    if(res.status == 400) {
                        if(JSON.parse(res.text).errors[0].message === "Access denied. Token expired") {
                            console.log("Token has expired");
                            cookie.remove('token');
                            cookie.remove('permissions');
                            cookie.remove('loggedIn');
                            hashHistory.push('/');
                        }
                    }
                    reject(res);
                } else {
                    console.log("success");
                    console.log(res);
                    resolve(res);
                }
            });
    });
};

/**
 * Function downloads data from server and parses and returns text object
 * @param url - url of api of server
 * @param data -
 * @returns {Promise}
 */
export const downloadData = function(url, data) {

    return new Promise((resolve, reject) => {
        sendRequest('https://young-cliffs-79659.herokuapp.com/' + url, data).then((data)=> {
            data = JSON.parse(data.text);
            resolve(data);
        }, (err)=> {
            reject(err);
        });
    });
};

