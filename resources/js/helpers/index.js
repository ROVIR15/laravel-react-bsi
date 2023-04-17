import React from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

// API URL
const uri = process.env.MIX_API_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';

const main = {
  getCheckAuth(cb) {
    axios
      .get(uri + '/facility')
      .then(function (res) {
        cb(res);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getUsers(cb) {
    axios
      .get(uri + '/user')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getUser(id, cb) {
    axios
      .get(uri + '/user' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getASubmission(param = null, cb) {
    let _url = uri + '/submission' + `${param}`;
    axios
      .get(_url)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertSubmission(data, cb) {
    axios
      .post(uri + '/submission', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSubmission(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/submission' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteSubmission(id, cb) {
    if (!id) {
      console.error('data not found');
    }
    axios
      .delete(uri + '/submission' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPages(cb) {
    axios
      .get(uri + '/pages')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertPages(_data, cb) {
    if (!_data) throw new Error('data empty');
    axios
      .post(uri + '/pages', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPagesAccess(cb) {
    axios
      .get(uri + '/pages-access')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAPagesAccess(param = null, cb) {
    let _url = uri + '/pages-access' + `${param}`;
    axios
      .get(_url)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertPagesAccess(data, cb) {
    axios
      .post(uri + '/pages-access', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updatePagesAccess(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/pages-access' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deletePagesAccess(id, cb) {
    if (!id) {
      console.error('data not found');
    }
    axios
      .delete(uri + '/pages-access' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  resetPassword(id, _p, cb) {
    if (!_p) {
      console.error('user not found');
    }
    axios
      .put(uri + '/reset-password/' + id, { password: _p })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  login(_u, _p, cb) {
    if (!_u || !_p) {
      console.error('user not found');
    }
    axios
      .post(uri + '/login', { email: _u, password: _p })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  register(data, cb) {
    if (!data) {
      console.error('user not found');
    }
    axios
      .post(uri + '/register', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getParty(cb) {
    axios
      .get(uri + '/party')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBuyers(cb) {
    axios
      .get(uri + '/buyer')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBuyer(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/buyer' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  setBuyer(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/buyer', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteBuyer(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/buyer/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  editBuyer(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/buyer/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Update Order Completion Status
  insertOrderCompletionStatus(_data, cb) {
    if (!_data) throw new Error('data is required');
    axios
      .post(uri + '/order-completion-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Goods
  insertGoods(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/goods', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getGoods(cb) {
    axios
      .get(uri + '/goods')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAGoods(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/goods' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateGoods(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/goods' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteGoods(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/goods/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  // Goods
  insertService(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/service', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getService(cb) {
    axios
      .get(uri + '/service')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAService(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/service' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateService(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/service' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteService(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/service/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  // Machine
  insertMachine(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/machine', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMachine(cb) {
    axios
      .get(uri + '/machine')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAMachine(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/machine' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateMachine(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/machine' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteMachine(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/machine/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Product Category
  getProductCategory(cb) {
    axios
      .get(uri + '/product-category')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getFabric(cb) {
    axios
      .get(uri + '/fabric')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getFinishedGoods(cb) {
    axios
      .get(uri + '/finished-goods')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Product Feature
  newProductFeature(_data, cb) {
    axios
      .post(uri + '/product-feature', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateProductFeature(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/product-feature/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteProductFeature(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/product-feature/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Inquiry
  insertInquiry(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/inquiry', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getInquiry(cb) {
    axios
      .get(uri + '/inquiry')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAInquiry(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/inquiry' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteInquiry(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/inquiry/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateInquiry(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/inquiry/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Request Status
  insertRequestStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/request-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getRequestStatus(cb) {
    axios
      .get(uri + '/request-status')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getARequestStatus(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/request-status' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteRequestStatus(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/request-status/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateRequestStatus(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/request-status/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Quote Status
  insertQuoteStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/quote-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getQuoteStatus(cb) {
    axios
      .get(uri + '/quote-status')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAQuoteStatus(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/quote-status' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteQuoteStatus(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/quote-status/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateQuoteStatus(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/quote-status/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // BOM Status
  insertBOMStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/costing-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBOMStatus(cb) {
    axios
      .get(uri + '/costing-status')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getABOMStatus(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/costing-status' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteBOMStatus(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/costing-status/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateBOMStatus(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/costing-status/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Request Item
  insertRequestItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/request-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getARequestItem(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/request-item' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteRequestItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/request-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateRequestItem(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/request-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Quote
  insertQuote(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/quote', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getQuote(cb) {
    axios
      .get(uri + '/quote')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getQuoteBySO(params = null, cb) {
    axios
      .get(uri + '/quote?type=SO' + `&${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getQuoteByPO(cb) {
    axios
      .get(uri + '/quote?type=PO')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAQuote(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/quote' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteQuote(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/quote/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateQuote(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/quote/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Request Item
  insertQuoteItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/quote-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAQuoteItem(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/quote-item' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteQuoteItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/quote-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateQuoteItem(id, _data, cb) {
    if (!_data) throw new Error('Data is required');
    axios
      .put(uri + '/quote-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Order Status
  insertOrderStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/order-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getOrderStatus(cb) {
    axios
      .get(uri + '/order-status')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAOrderStatus(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/order-status' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteOrderStatus(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/order-status/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateOrderStatus(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/order-status/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Order Status
  insertInvoiceSubmission(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/invoice-submission', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getInvoiceSubmission(cb) {
    axios
      .get(uri + '/invoice-submission')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAInvoiceSubmission(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/invoice-submission' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteInvoiceSubmission(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/invoice-submission/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateInvoiceSubmission(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/invoice-submission/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // SalesOrder
  insertSalesOrder(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/sales-order', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getSalesOrder(params = null, cb) {
    axios
      .get(uri + '/sales-order' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getSalesOrderList(cb) {
    axios
      .get(uri + '/sales-order-list')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getASalesOrder(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/sales-order' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteSalesOrder(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/sales-order/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSalesOrder(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/sales-order/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getOrder(cb) {
    axios
      .get(uri + '/order')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAOrder(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/order/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateOrder(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('Data is required');
    axios
      .put(uri + '/order/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //SalesOrder Item
  insertSalesOrderItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/order-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getASalesOrderItem(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/order-item' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteSalesOrderItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/order-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSalesOrderItem(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/order-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Product
  getProduct(cb) {
    axios
      .get(uri + '/product')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Product Feature
  getProductFeature(cb) {
    axios
      .get(uri + '/product-feature')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //BOM_alt
  insertBOM_alt(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/bom-alt-v2', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getBOM_alt(params = '', cb) {
    axios
      .get(uri + '/bom-alt-v2' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getABOM_alt(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/bom-alt-v2' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteBOM_alt(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/bom-alt-v2/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateBOM_alt(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/bom-alt-v2/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //BOMITem alt
  insertBOMItem_alt(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/bom-item-alt-v2', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateABOMItem_alt(bom_altId, _data, cb) {
    axios
      .put(uri + '/bom-item-alt-v2/' + bom_altId, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteABOMItem_alt(bom_altId, cb) {
    axios
      .delete(uri + '/bom-item-alt-v2/' + bom_altId)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBOMMaterial_altToDuplicate(cb) {
    axios
      .get(uri + '/bom-item-v2-alt')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  //BOM
  insertBOM(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/costing', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getBOMMaterialToDuplicate(cb) {
    axios
      .get(uri + '/bom-items-v1')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBOMList(cb) {
    axios
      .get(uri + '/costing-listv1')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getBOM(params = '', cb) {
    axios
      .get(uri + '/costing' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getABOM(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/costing' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteBOM(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/costing/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateBOM(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/costing/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // BOM Item
  insertBOMItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/costing-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getABOMItembyBOMId(bomId, cb) {
    axios
      .get(uri + '/costing-item/' + bomId)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateABOMItem(bomId, _data, cb) {
    axios
      .put(uri + '/costing-item/' + bomId, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteABOMItem(id, cb) {
    axios
      .delete(uri + '/costing-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // BOM Service
  insertBOMService(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/costing-service', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getABOMServicebyBOMId(bomId, cb) {
    axios
      .get(uri + '/costing-service/' + bomId)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateABOMService(bomId, _data, cb) {
    axios
      .put(uri + '/costing-service/' + bomId, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteABOMService(id, cb) {
    axios
      .delete(uri + '/costing-service/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Manufacture
  insertManufactureOrder(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/manufacture', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getManufactureOrder(cb) {
    axios
      .get(uri + '/manufacture')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAManufactureOrder(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/manufacture' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteManufactureOrder(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/manufacture' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateManufactureOrder(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/manufacture' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Manufacture Operation
  insertManufactureOperation(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/manufacture-operation', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getManufactureOperation(cb) {
    axios
      .get(uri + '/manufacture-operation')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAManufactureOperation(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/manufacture-operation' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteManufactureOperation(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/manufacture-operation' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateManufactureOperation(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/manufacture-operation' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Manufacture Component
  insertManufactureComponent(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/manufacture-component', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getManufactureComponent(cb) {
    axios
      .get(uri + '/manufacture-component')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAManufactureComponent(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/manufacture-component' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteManufactureComponent(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/manufacture-component' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateManufactureComponent(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/manufacture-component/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Manufacture Observation Result
  insertMOResult(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/operation-result', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getMOResult(cb) {
    axios
      .get(uri + '/operation-result')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAMOResult(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/operation-result' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  //Manufacture Recorder
  insertProductionRecord(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/production-record', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },

  // Production Log
  insertProductionLog(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/production-log', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getProductionLog(params, cb) {
    axios
      .get(uri + '/production-log' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAProductionLog(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/production-log' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteProductionLog(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/production-log/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateProductionLog(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/production-log/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  // Work Center
  insertWorkCenter(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/work-center', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getWorkCenter(cb) {
    axios
      .get(uri + '/work-center')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAWorkCenter(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/work-center' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteWorkCenter(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/work-center/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateWorkCenter(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/work-center/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Work Center
  insertOperation(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/operation', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getOperation(cb) {
    axios
      .get(uri + '/operation')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAOperation(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/operation' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteOperation(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/operation/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateOperation(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/operation/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Process
  insertProcess(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/process', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getProcess(cb) {
    axios
      .get(uri + '/process')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAProcess(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/process' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteProcess(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/process/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateProcess(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/process/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Process
  insertSampleProcess(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/sample-process', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  deleteSampleProcess(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/sample-process/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSampleProcess(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/sample-process/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Production Study
  insertProductionStudy(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/production-study', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getProductionStudy(cb) {
    axios
      .get(uri + '/production-study')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAProductionStudy(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/production-study' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteProductionStudy(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/production-study/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateProductionStudy(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/production-study/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Production Study
  insertSamplingStudy(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/sample-study', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getSamplingStudy(cb) {
    axios
      .get(uri + '/sample-study')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getASamplingStudy(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/sample-study' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteSamplingStudy(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/sample-study/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSamplingStudy(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/sample-study/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Process Study
  insertProcessStudy(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/process-study', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getProcessStudy(cb) {
    axios
      .get(uri + '/process-study')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getProcessStudyByProductionStudy(id, cb) {
    axios
      .get(uri + `/process-study?prod_study=${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAProcessStudy(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/process-study' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteProcessStudy(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/process-study/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateProcessStudy(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/process-study/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Industrial Engineering Study - Observation Study
  insertObservationStudy(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/observation-result', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getObservationStudy(cb) {
    axios
      .get(uri + '/observation-result')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getObservationStudyByProductionStudy(id, cb) {
    axios
      .get(uri + `/observation-result?prod_study=${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAObservationStudy(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/observation-result' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteObservationStudy(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/observation-result/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateObservationStudy(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/observation-result/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Contact Mechanism
  insertContactMechanism(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/contact-mechanism', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getContactMechanism(params = null, cb) {
    axios
      .get(uri + '/contact-mechanism' + `&${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAContactMechanism(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/contact-mechanism' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteContactMechanism(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/contact-mechanism/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateContactMechanism(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/contact-mechanism/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateContactMechanismPostalAddress(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/update-postal-address/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateContactMechanismEmail(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/update-email/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateContactMechanismTelecommunicationNumber(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/update-telecommunication-number/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Party
  getRoleType(param, cb) {
    if (!cb) return;
    const paramUri = '/role' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  // Human Resources - Labor
  insertLabor(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/labor', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getLabor(cb) {
    axios
      .get(uri + '/labor')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getALabor(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/labor' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteLabor(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/labor/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateLabor(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/labor/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Purchasing - Inquiry
  insertInquiry(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/inquiry', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getInquiry(cb) {
    axios
      .get(uri + '/inquiry')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAInquiry(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/inquiry' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteInquiry(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/inquiry/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateInquiry(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/inquiry/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Purchasing - purchase-order
  insertPurchaseOrder(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/purchase-order', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPurchaseOrder(params = null, cb) {
    axios
      .get(uri + '/purchase-order' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPurchaseOrderList(cb) {
    axios
      .get(uri + '/purchase-order-list')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAPurchaseOrder(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/purchase-order' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deletePurchaseOrder(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/purchase-order/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updatePurchaseOrder(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/purchase-order/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Purchasing - purchase-requisition
  insertPurchaseRequisiton(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/purchase-requisition', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPurchaseRequisiton(cb) {
    axios
      .get(uri + '/purchase-requisition')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAPurchaseRequisiton(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/purchase-requisition' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deletePurchaseRequisiton(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/purchase-requisition/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updatePurchaseRequisiton(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/purchase-requisition/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Purchasing - purchase-requisition
  insertRFQ(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/request-for-quotation', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getRFQ(params = null, cb) {
    axios
      .get(uri + '/quote?type=PO' + `&${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getARFQ(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/request-for-quotation' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteRFQ(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/request-for-quotation/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateRFQ(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/request-for-quotation/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Purchasing - Supplier/Vendor
  getVendors(cb) {
    axios
      .get(uri + '/vendor')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getVendor(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/vendor' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  setVendor(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/vendor', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteVendor(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/vendor/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  editVendor(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/vendor/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //PurchaseOrder Item
  insertPurchaseOrderItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/order-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getAPurchaseOrderItem(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/order-item' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deletePurchaseOrderItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/order-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updatePurchaseOrderItem(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/order-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Goods Receipt
  insertGoodsReceipt(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/goods-receipt', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getGoodsReceipt(cb) {
    axios
      .get(uri + '/goods-receipt')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAGoodsReceipt(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/goods-receipt' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateGoodsReceipt(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/goods-receipt' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteGoodsReceipt(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/goods-receipt/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Goods Receipt Items
  insertGoodsReceiptItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/goods-receipt-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getGoodsReceiptItem(cb) {
    axios
      .get(uri + '/goods-receipt-item')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAGoodsReceiptItem(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/goods-receipt-item' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateGoodsReceiptItem(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/goods-receipt-item' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteGoodsReceiptItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/goods-receipt-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },

  // Goods Receipt Items
  postIncomingGoods(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }

    axios
      .post(uri + '/post-incoming-goods', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertShipment(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/shipment', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getShipment(params = '', cb) {
    axios
      .get(uri + '/shipment' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getShipmentForInvoicing(params = '', cb) {
    axios
      .get(uri + '/shipment-invoicing' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAShipment(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/shipment' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateShipment(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/shipment' + `/${id}`, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteShipment(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/goods-receipt-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Shipment Status
  insertShipmentStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/shipment-status', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getShipmentStatus(cb) {
    axios
      .get(uri + '/shipment-status')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAShipmentStatus(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/shipment-status' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteShipmentStatus(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/shipment-status/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateShipmentStatus(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/shipment-status/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateShipmentItem(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/shipment-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Material Transfer
  getMaterialTransfer(params, cb) {
    axios
      .get(uri + '/material-transfer' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMaterialTransfer(_data, cb) {
    if (isEmpty(_data)) throw new Error('data is required');
    axios
      .post(uri + '/material-transfer', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateMaterialTransfer(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/material-transfer/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteMaterialTransfer(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/material-transfer/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAMaterialTransfer(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .get(uri + '/material-transfer/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Inventory
  getInventoryItem(cb) {
    axios
      .get(uri + '/inventory')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getProductNotYetInInventoryItem(cb) {
    axios
      .get(uri + '/goods-option')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertInventoryItem(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/inventory', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Item Issuance
  insertItemIssuance(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/item-issuance', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Factory
  getFactory(params = null, cb) {
    axios
      .get(uri + '/factory' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAFactory(id, cb) {
    axios
      .get(uri + '/factory/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertFactory(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/factory', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateFactory(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/factory' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertFacilityToFactory(_data, cb) {
    if (!_data) throw new Error('error gan');
    axios
      .post(uri + '/factory-has-facility', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Facility
  getFacility(params = null, cb) {
    axios
      .get(uri + '/facility' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getFacilityType(params = null, cb) {
    axios
      .get(uri + '/facility-type' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getFacilityTarget(params = null, cb) {
    axios
      .get(uri + '/facility-target' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAFacilityTarget(id, cb) {
    axios
      .get(uri + '/facility-target/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertFacilityTarget(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/facility-target', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateFacilityTarget(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/facility-target/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAFacility(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/facility' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // get invoice based on payment
  getInvoiceHasPayment(params = null, cb) {
    axios
      .get(uri + '/invoice-payment' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Invoice Term
  getInvoiceTermByInvoice(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/invoice-term-invoice' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertInvoiceTerm(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/invoice-term', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateInvoiceTerm(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/invoice-term/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Sales Invoice
  getReport(params = null, cb) {
    axios
      .get(uri + '/invoice-report' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getInvoicedParty(params = null, cb) {
    axios
      .get(uri + '/invoice-party' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertSalesInvoice(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/invoice', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertVendorBills(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/store-vendor-bills', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  postVendorBills(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/post-vendor-bills', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getSalesInvoice(params = null, cb) {
    axios
      .get(uri + '/invoice' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getASalesInvoice(id, params = null, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/invoice' + `/${id}${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteSalesInvoice(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/invoice/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateSalesInvoice(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/invoice/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Action on Invoice Status
  insertInvoiceStatus(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/invoice-status', { payload: _data })
      .then(function (res) {
        cb(res);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Action on Manufacture Order
  insertAction(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/action', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAnAction(manufacture_operation, cb) {
    if (!manufacture_operation) {
      console.error('data not found');
    }
    axios
      .get(uri + `/action?manufacture_operation=${manufacture_operation}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Consume
  getAStock(id, cb) {
    if (!id) return undefined;
    axios
      .get(uri + `/consume/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getStock(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/consume', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  uploadImage(_formData, cb) {
    if (!_formData) return undefined;
    axios
      .post(uri + '/upload', _formData)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  uploadShipmentReceiptProof(_formData, cb) {
    if (!_formData) return undefined;
    axios
      .post(uri + '/upload-shipment-receipt', _formData)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  uploadPaymentImage(_formData, cb) {
    if (!_formData) return undefined;
    axios
      .post(uri + '/upload-payment-receipt', _formData)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringCutting(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-cutting' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringCutting(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-cutting', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringSpreading(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-spreading' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringSpreading(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-spreading', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringNumbering(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-numbering' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringNumbering(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-numbering', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringSupermarket(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-supermarket' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringSupermarket(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-supermarket', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getSewingLineDetail(param, cb) {
    if (!cb) return;
    const paramUri = '/sewing-line-detail' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringSewing(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-sewing' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringSewing(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-sewing', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringQC(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-qc' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringQC(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-qc', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getMonitoringFG(param, cb) {
    if (!cb) return;
    const paramUri = '/monitoring-fg' + `${param}`;
    axios
      .get(uri + paramUri)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertMonitoringFG(data, cb) {
    if (!data) return;
    axios
      .post(uri + '/monitoring-fg', { payload: data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Graph
  getWorkDetail(params, cb) {
    axios
      .get(uri + '/new-api-test' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPerOrder(params, cb) {
    axios
      .get(uri + '/new-api-test-2' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPerRecordOrderGraph(id, params, cb) {
    axios
      .get(uri + `/new-api-test-3/${id}` + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getGraphData(params, cb) {
    axios
      .get(uri + '/graph-api' + params)
      .then(function (res) {
        cb(res);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAmountMoneySewing(params, cb) {
    axios
      .get(uri + '/sewing-monetary' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //Manufacture Planning
  getManufacturePlanning(cb) {
    axios
      .get(uri + '/manufacture-planning')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAManufacturePlanning(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/manufacture-planning' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  setManufacturePlanning(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/manufacture-planning', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteManufacturePlanning(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/manufacture-planning/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  //
  setManufacturePlanningItems(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/manufacture-planning-item', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateManufacturePlanningItems(id, _data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .put(uri + '/manufacture-planning-item/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  deleteManufacturePlanningItem(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/manufacture-planning-item/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getCostingList(cb) {
    axios
      .get(uri + '/costing-list')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getACostingList(id, cb) {
    if (!id) throw new Error('No ID');
    axios
      .get(uri + '/costing-list/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Financial Transaction
  getCurrencyData(cb) {
    axios
      .get(uri + '/currency-exchange')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateNewCurrency(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/currency-exchange', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  insertFinanceTransaction(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/financial-transaction', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getFinanceTransaction(params = null, cb) {
    axios
      .get(uri + '/financial-transaction' + `${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAFinanceTransaction(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/financial-transaction' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  deleteFinanceTransaction(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/financial-transaction' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateAFinanceTransaction(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/financial-transaction/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertFinanceTransactions(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/financial-transactions', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  // Finance account
  insertFinanceAccount(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/financial-account', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getFinanceAccount(params = null, cb) {
    axios
      .get(uri + '/financial-account' + `${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAFinanceAccount(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/financial-account' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  deleteFinanceAccount(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/financial-account' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateAFinanceAccount(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/financial-account/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getFinanceAccountType(cb) {
    axios
      .get(uri + '/finance-account-type')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  // Payment
  insertPayment(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/payment', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  insertManyPayment(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/insert-payment', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getPaymentCollection(params = null, cb) {
    axios
      .get(uri + '/payment-collection' + `${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPayment(params = null, cb) {
    axios
      .get(uri + '/payment' + `${params}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAPayment(id, cb) {
    if (!id) console.error('ID not found');
    axios
      .get(uri + '/payment' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  deletePayment(id, cb) {
    if (!id) throw new Error('ID is required');
    axios
      .delete(uri + '/payment' + `/${id}`)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  updateAPayment(id, _data, cb) {
    if (!id) throw new Error('ID is required');
    if (!_data) throw new Error('data is required');
    axios
      .put(uri + '/payment/' + id, { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getPaymentMethodType(cb) {
    axios
      .get(uri + '/payment-method-type')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getReconcile(cb) {
    axios
      .get(uri + '/reconcile')
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getAReconcile(id, cb) {
    axios
      .get(uri + '/reconcile/' + id)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  insertReconcile(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/reconcile', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  insertReconcilePurchaseOrder(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/reconcile-post-po', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  insertReconcileSalesOrder(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/reconcile-post-so', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  insertReconcileCosting(_data, cb) {
    if (!_data) {
      console.error('data not found');
    }
    axios
      .post(uri + '/reconcile-post-costing', { payload: _data })
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err);
      });
  },
  getAnalysisCapacity(params = null, cb) {
    axios
      .get(uri + '/capacity-sewing/' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getReadyMadeGarmentValuation(params = null, cb) {
    axios
      .get(uri + '/finished-garment-valuation' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getNewAPIOfNewFeature(params = null, cb) {
    axios
      .get(uri + '/running-buyer-order' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  },
  getUninvoicedPurchaseOrder(params = null, cb) {
    axios
      .get(uri + '/uninvoiced-purchase-order' + params)
      .then(function (res) {
        cb(res.data);
      })
      .catch(function (err) {
        cb(err.response);
      });
  }
};
export default main;
