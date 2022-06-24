import axios from 'axios'

const uri = "http://localhost:8000/api";
const headers = {"ContentType" : "application/json"}

const auth = {
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
    logout(at, cb){
        const headersWIthAuth = {"ContentType" : "application/json", "Authorization": `Bearer ${at})}`}
        axios.post(uri + '/logout', {},
                    {headers: headersWIthAuth}).then( function(res){
                        cb(res.data);
        }).catch(function(err){
            cb(err.response);
        });
    }
}

export default auth;