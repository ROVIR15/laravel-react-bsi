import React from 'react'
import axios from 'axios';

const at = localStorage.getItem('_token');

axios.defaults.headers.common['Authorization'] = `Bearer ${at}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const uri = process.env.MIX_API_URL;

const main = {
    login(_u, _p, cb){
        if(!_u || !_p) {
            console.error('user not found');
        }
        axios.post( uri + '/login', 
                    {email: _u, password: _p}
                ).then( function(res){
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
      axios.post( uri + '/buyer', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteBuyer(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/buyer/' + id).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
    },
    editBuyer(id, _data, cb){
        if(!id) throw new Error('ID is required');
        if(!_data) throw new Error('data is required');
        axios.put( uri + '/buyer/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/goods', { payload:  _data } ).then( function(res) {
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
    updateGoods(id, _data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.put(uri + '/goods'+ `/${id}`, { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteGoods(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/goods/' + id).then(function(res){
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
      axios.put( uri + '/product-feature/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteProductFeature(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/product-feature/' + id).then(function(res){
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
      axios.post( uri + '/inquiry', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/inquiry/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateInquiry(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/inquiry/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/request-item', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/request-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateRequestItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/request-item/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/quote', { payload:  _data } ).then( function(res) {
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
    getQuoteBySO(cb){
      axios.get( uri + '/quote?type=SO').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getQuoteByPO(cb){
      axios.get( uri + '/quote?type=PO').then(function(res){
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
      axios.delete( uri + '/quote/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateQuote(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/quote/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/quote-item', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/quote-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateQuoteItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/quote-item/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/sales-order', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/sales-order/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateSalesOrder(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/sales-order/' + id, { payload: _data}).then(function(res){
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
      axios.post( uri + '/order-item', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/order-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateSalesOrderItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/order-item/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Product
    getProduct(cb){
      axios.get( uri + '/product').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
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
      axios.post( uri + '/bom', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/bom/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateBOM(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/bom/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // BOM Item
    insertBOMItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/bom-item', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getABOMItembyBOMId(bomId, cb){
      axios.get( uri + '/bom-item/' + bomId ).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateABOMItem(bomId, _data, cb){
      axios.put( uri + '/bom-item/' + bomId, {payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteABOMItem(id, cb){
      axios.delete( uri + '/bom-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Manufacture
    insertManufactureOrder(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/manufacture', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getManufactureOrder(cb){
      axios.get( uri + '/manufacture').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAManufactureOrder(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/manufacture' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteManufactureOrder(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/manufacture' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateManufactureOrder(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/manufacture' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Manufacture Operation
    insertManufactureOperation(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/manufacture-operation', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getManufactureOperation(cb){
      axios.get( uri + '/manufacture-operation').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAManufactureOperation(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/manufacture-operation' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteManufactureOperation(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/manufacture-operation' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateManufactureOperation(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/manufacture-operation' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Manufacture Component
    insertManufactureComponent(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/manufacture-component', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getManufactureComponent(cb){
      axios.get( uri + '/manufacture-component').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAManufactureComponent(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/manufacture-component' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteManufactureComponent(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/manufacture-component' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateManufactureComponent(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/manufacture-component/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },    
    // Manufacture Observation Result
    insertMOResult(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/operation-result', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getMOResult(cb){
      axios.get( uri + '/operation-result').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAMOResult(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/operation-result' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },

    //Manufacture Recorder
    insertProductionRecord(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/production-record', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },

    // Work Center 
    insertWorkCenter(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/work-center', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/work-center/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateWorkCenter(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/work-center/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Work Center 
    insertOperation(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/operation', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getOperation(cb){
      axios.get( uri + '/operation').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAOperation(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/operation' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteOperation(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/operation/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateOperation(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/operation/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Industrial Engineering Study - Process
    insertProcess(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/process', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getProcess(cb){
      axios.get( uri + '/process').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAProcess(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/process' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteProcess(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/process/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateProcess(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/process/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Industrial Engineering Study - Production Study
    insertProductionStudy(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/production-study', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getProductionStudy(cb){
      axios.get( uri + '/production-study').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getAProductionStudy(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/production-study' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteProductionStudy(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/production-study/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateProductionStudy(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/production-study/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Industrial Engineering Study - Process Study
    insertProcessStudy(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/process-study', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getProcessStudy(cb){
      axios.get( uri + '/process-study').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getProcessStudyByProductionStudy(id, cb){
      axios.get( uri + `/process-study?prod_study=${id}`).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAProcessStudy(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/process-study' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteProcessStudy(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/process-study/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateProcessStudy(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/process-study/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Industrial Engineering Study - Observation Study
    insertObservationStudy(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/observation-result', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getObservationStudy(cb){
      axios.get( uri + '/observation-result').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getObservationStudyByProductionStudy(id, cb){
      axios.get( uri + `/observation-result?prod_study=${id}`).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAObservationStudy(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/observation-result' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteObservationStudy(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/observation-result/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateObservationStudy(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/observation-result/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Human Resources - Labor
    insertLabor(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/labor', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getLabor(cb){
      axios.get( uri + '/labor').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      })
    },
    getALabor(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/labor' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteLabor(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/labor/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateLabor(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/labor/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Purchasing - Inquiry
    insertInquiry(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/inquiry', { payload:  _data } ).then( function(res) {
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
      axios.delete( uri + '/inquiry/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateInquiry(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/inquiry/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Purchasing - purchase-order
    insertPurchaseOrder(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/purchase-order', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getPurchaseOrder(cb){
      axios.get( uri + '/purchase-order').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAPurchaseOrder(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/purchase-order' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deletePurchaseOrder(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/purchase-order/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updatePurchaseOrder(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/purchase-order/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Purchasing - purchase-requisition
    insertPurchaseRequisiton(_data, cb){
        if(!_data) {
            console.error('data not found');
        }
        axios.post( uri + '/purchase-requisition', { payload:  _data } ).then( function(res) {
          cb(res.data)
        }).catch(function(err){
            cb(err.response);
        });
      },
      getPurchaseRequisiton(cb){
        axios.get( uri + '/purchase-requisition').then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response)
        })
      },
      getAPurchaseRequisiton(id, cb){
        if(!id) console.error('ID not found')
        axios.get( uri + '/purchase-requisition' + `/${id}`).then( function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      deletePurchaseRequisiton(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/purchase-requisition/' + id).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      updatePurchaseRequisiton(id, _data, cb){
        if(!id) throw new Error('ID is required');
        if(!_data) throw new Error('data is required');
        axios.put( uri + '/purchase-requisition/' + id, { payload: _data}).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      // Purchasing - purchase-requisition
      insertRFQ(_data, cb){
        if(!_data) {
            console.error('data not found');
        }
        axios.post( uri + '/request-for-quotation', { payload:  _data } ).then( function(res) {
          cb(res.data)
        }).catch(function(err){
          cb(err);
        });
      },
      getRFQ(cb){
        axios.get( uri + '/request-for-quotation').then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
      },
      getARFQ(id, cb){
        if(!id) console.error('ID not found')
        axios.get( uri + '/request-for-quotation' + `/${id}`).then( function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      deleteRFQ(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/request-for-quotation/' + id).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      updateRFQ(id, _data, cb){
        if(!id) throw new Error('ID is required');
        if(!_data) throw new Error('data is required');
        axios.put( uri + '/request-for-quotation/' + id, { payload: _data}).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      // Purchasing - Supplier/Vendor
      getVendors(cb){
        axios.get( uri + '/vendor').then( function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      getVendor(id, cb){
        if(!id) console.error('ID not found')
        axios.get( uri + '/vendor' + `/${id}`).then( function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      setVendor(_data, cb){
        if(!_data) {
            console.error('data not found');
        }
        axios.post( uri + '/vendor', { payload:  _data } ).then( function(res) {
          cb(res.data)
        }).catch(function(err){
            cb(err.response);
        });
      },
      deleteVendor(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/vendor/' + id).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
      },
      editVendor(id, _data, cb){
        if(!id) throw new Error('ID is required');
        if(!_data) throw new Error('data is required');
        axios.put( uri + '/vendor/' + id, { payload: _data}).then(function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        })
      },
    //PurchaseOrder Item
    insertPurchaseOrderItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/order-item', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err);
      });
    },
    getAPurchaseOrderItem(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/order-item' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deletePurchaseOrderItem(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/order-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updatePurchaseOrderItem(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/order-item/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Goods Receipt
    insertGoodsReceipt(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/goods-receipt', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getGoodsReceipt(cb){
      axios.get( uri + '/goods-receipt').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAGoodsReceipt(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/goods-receipt' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateGoodsReceipt(id, _data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.put(uri + '/goods-receipt'+ `/${id}`, { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteGoodsReceipt(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/goods-receipt/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Goods Receipt Items
    insertGoodsReceiptItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/goods-receipt-item', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getGoodsReceiptItem(cb){
      axios.get( uri + '/goods-receipt-item').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAGoodsReceiptItem(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/goods-receipt-item' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateGoodsReceiptItem(id, _data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.put(uri + '/goods-receipt-item'+ `/${id}`, { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteGoodsReceiptItem(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/goods-receipt-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },

    // Goods Receipt Items
    insertShipment(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/shipment', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getShipment(cb){
      axios.get( uri + '/shipment').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAShipment(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/shipment' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateShipment(id, _data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.put(uri + '/shipment'+ `/${id}`, { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    deleteShipment(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/goods-receipt-item/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },

    //Inventory
    getInventoryItem(cb){
      axios.get( uri + '/inventory').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getProductNotYetInInventoryItem(cb){
      axios.get( uri + '/goods-option').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    insertInventoryItem(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/inventory', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    // Item Issuance
    insertItemIssuance(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/item-issuance', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err.response);
      });
    },
    //Facility
    getFacility(cb){
      axios.get( uri + '/facility').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getAFacility(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/facility' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Sales Invoice
    insertSalesInvoice(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/sales-invoice', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getSalesInvoice(cb){
      axios.get( uri + '/sales-invoice').then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response)
      })
    },
    getASalesInvoice(id, cb){
      if(!id) console.error('ID not found')
      axios.get( uri + '/sales-invoice' + `/${id}`).then( function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    deleteSalesInvoice(id, cb){
      if(!id) throw new Error('ID is required');
      axios.delete( uri + '/sales-invoice/' + id).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    updateSalesInvoice(id, _data, cb){
      if(!id) throw new Error('ID is required');
      if(!_data) throw new Error('data is required');
      axios.put( uri + '/sales-invoice/' + id, { payload: _data}).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Action on Manufacture Order
    insertAction(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/action', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getAnAction(manufacture_operation, cb){
      if(!manufacture_operation) {
          console.error('data not found');
      }
      axios.get( uri + `/action?manufacture_operation=${manufacture_operation}` ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
        cb(err.response);
      });
    },
    // Consume
    getAStock(id, cb){
      if(!id) return undefined;
      axios.get( uri + `/consume/${id}` ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    getStock(_data, cb){
      if(!_data) {
          console.error('data not found');
      }
      axios.post( uri + '/consume', { payload:  _data } ).then( function(res) {
        cb(res.data)
      }).catch(function(err){
          cb(err.response);
      });
    },
    uploadImage(_formData, cb){
      if(!_formData) return undefined;
      axios.post(uri + '/upload', _formData).then(function(res){
        cb(res.data);
      }).catch(function(err){
        cb(err.response);
      });
    }
    //
  }
export default main;