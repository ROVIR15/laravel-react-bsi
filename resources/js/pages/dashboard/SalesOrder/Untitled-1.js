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
      //Request Item
      insertSalesOrderItem(_data, cb){
        if(!_data) {
            console.error('data not found');
        }
        axios.post( uri + '/sales-order-item', { payload:  _data }, {headers} ).then( function(res) {
          cb(res.data)
        }).catch(function(err){
            cb(err.response);
        });
      },
      getASalesOrderItem(id, cb){
        if(!id) console.error('ID not found')
        axios.get( uri + '/sales-order-item' + `/${id}`).then( function(res){
          cb(res.data);
        }).catch(function(err){
          cb(err.response);
        });
      },
      deleteSalesOrderItem(id, cb){
        if(!id) throw new Error('ID is required');
        axios.delete( uri + '/sales-order-item/' + id, {headers}).then(function(res){
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
      }
  }