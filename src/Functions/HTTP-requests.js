import cookie from 'react-cookie'
import React from 'react';
import request from 'superagent';
import PopupNotif from '../Components/PopupNotif.jsx';


export const sendRequest = function (url, data) {
    data['token'] = cookie.load('token');

    return new Promise((resolve, reject) => {
        request
            .post(url)
            .set('Accept', 'application/json')
            .send(data)
            .end((err, res) => {
                if (err != null || !res.ok) {
                    console.log("error in request");
                    console.log(res);  //debug
                    if (res.status == 401) {
                        let body = "Token has expired. You're going to be redirected to the login page.";
                        let response = {
                            msg: body,
                            popup: <PopupNotif title="Token has expired"
                                               body={body}
                                               logout={true}/>
                        };
                        reject(response);
                    } else {
                        let msg = JSON.parse(res.text).message;
                        let response = {
                            msg: msg,
                            popup: <PopupNotif title="Something went wrong" body={msg}/>
                        };
                        console.log(response);
                        reject(response);
                    }

                } else {
                    console.log("success");
                    console.log(res);
                    resolve(res);
                }
            });
    });
};

/**
 * Function downloads data from server, parses and returns object in text attribute
 * @param url - url of api of server
 * @param data -
 * @returns {Promise}
 */
export const downloadData = function (url, data) {

    return new Promise((resolve, reject) => {
        sendRequest('https://hotel-iis.herokuapp.com/' + url, data).then((data) => {
            data = JSON.parse(data.text);
            resolve(data);
        }, (err) => {
            reject(err);
        });
    });
};

