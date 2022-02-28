import React from 'react'
import axios from 'axios';

const uri = process.env.MIX_API_URL;
const headers = {"ContentType" : "application/json"};
const headersWIthAuth = {"ContentType" : "application/json", };

const main = {
    login(_u, _p, cb){
        if(!_u || !_p) {
            console.error('user not found');
        }
        axios.post( uri + '/login', 
                    {email: _u, password: _p}, 
                    {headers}).then( function(res){
                        cb(res.data);
        }).catch(function(err){
            cb(err.response)
        })
    },
    logout(cb){
        axios.post(uri + '/logout', 
                    {headersWIthAuth}).then( function(res){
                        cb(res.data);
        }).catch(function(err){
            cb(err.response);
        });
    }
}

export default main;