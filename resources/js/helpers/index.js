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
    // Goods
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
    //Product Category
    getProductCategory(cb){
      axios.get( uri + '/product-category').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    // Product Feature
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
    // Inquiry
    insertInquiry(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/inquiry', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getInquiry(cb){
      axios.get( uri + '/inquiry').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAInquiry(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/inquiry' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteInquiry(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/inquiry/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateInquiry(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/inquiry/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    //Request Item
    insertRequestItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/request-item', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getARequestItem(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/request-item' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteRequestItem(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/request-item/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateRequestItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/request-item/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Quote
    insertQuote(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/quote', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getQuote(cb){
      axios.get( uri + '/quote').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAQuote(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/quote' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteQuote(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/quote/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateQuote(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/quote/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    //Request Item
    insertQuoteItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/quote-item', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getAQuoteItem(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/quote-item' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteQuoteItem(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/quote-item/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateQuoteItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/quote-item/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // SalesOrder
    insertSalesOrder(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/sales-order', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getSalesOrder(cb){
      axios.get( uri + '/sales-order').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getASalesOrder(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/sales-order' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteSalesOrder(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/sales-order/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateSalesOrder(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/sales-order/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    //SalesOrder Item
    insertSalesOrderItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/order-item', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getASalesOrderItem(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/order-item' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteSalesOrderItem(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/order-item/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateSalesOrderItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/request-item/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Product Feature
    getProductFeature(cb){
      axios.get( uri + '/product-feature').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    //BOM
    insertBOM(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/bom', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getBOM(cb){
      axios.get( uri + '/bom').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getABOM(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/bom' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteBOM(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/bom/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateBOM(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/bom/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // BOM Item
    getABOMItembyBOMId(bomId, cb){
      axios.get( uri + '/bom-item/' + bomId ).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Work Center 
    insertWorkCenter(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/work-center', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getWorkCenter(cb){
      axios.get( uri + '/work-center').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAWorkCenter(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/work-center' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteWorkCenter(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/work-center/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateWorkCenter(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/work-center/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Work Center 
    insertOpeation(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/operation', { payload:  _data }, {headers} ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getOpeation(cb){
      axios.get( uri + '/operation').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAOpeation(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/operation' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteOpeation(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/operation/' + id, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateOpeation(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/operation/' + id, { payload: _data}, {headers}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
  }
export default main;