import React from 'react'
import axios from 'axios';

const uri = "http://localhost:8000/api";
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
    getBuyers(cb){
      axios.get( uri + '/buyer').then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    getBuyer(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/buyer' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    setBuyer(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/buyer', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    insertGoods(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/goods', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteBuyer(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/buyer/' + id, {headers}).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
    },
    editBuyer(id, _data, cb){
        if(!id) throw new Error('ID is required');
        if(!_data) throw new Error('data is required');
        axios.put( uri + '/buyer/' + id, { payload: _data}, {headers}).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
    },
    getGoods(cb){
      axios.get( uri + '/goods').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAGoods(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/goods' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteGoods(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/goods/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    getProductCategory(cb){
      axios.get( uri + '/product-category').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    newProductFeature(_data, cb){
      axios.post( uri + '/product-feature', {payload: _data}).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateProductFeature(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/product-feature/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteProductFeature(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/product-feature/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
}

export default main;