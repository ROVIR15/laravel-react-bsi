import { isEmpty } from 'lodash';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import API from '../helpers';

export const state = {
  usd: 0,
  idr: 0
};

export const CurrencyContext = createContext(state);

export const CurrencyProvider = ({ children }) => {
  // This exchanger is by default to do work to convert
  // IDR to USD, so the default value always be on 1 USD = XX.XXX IDR
  // state to store currency data
  const [currencyData, setCurrencyData] = useState({
    usd: 1,
    idr: 1
  });
  const userStorage = JSON.parse(localStorage.getItem('user'));

  // store loading state
  const [loading, setLoading] = useState(false);

  // check initial loading whether the data is being loaded
  // with currencyData is empty and loading state is true
  let initialLoading = isEmpty(currencyData) || loading;

  // API to get currency data
  useEffect(() => {
    if (!isEmpty(userStorage)) getCurrency();
  }, []);

  function getCurrency(){
    try {
      API.getCurrencyData(function (res) {
        if (!res) return;
        if (!res.data) throw new Error('No Data');
        else {
          setCurrencyData(res.data);
        }
      });
    } catch (error) {
      alert('error');
    }
  }

  function exchanger(value, initialCurrencyType, requestedCurrencyType) {
    //check if initial currency_type is not equal requested_currency_type
    // if same should be returned value;
    const doSameCurrencyExchange = initialCurrencyType === requestedCurrencyType;

    if (doSameCurrencyExchange) return value;

    switch (requestedCurrencyType) {
      // case exchange usd to idr
      // the calculation must be value divided by idr_currency;
      case 'idr':
        return (parseFloat(value) * currencyData[requestedCurrencyType]).toFixed(2);
      // case exchange idr to usd
      // the calculation must be value divided by usd_currency;
      case 'usd':
        return (parseFloat(value) / currencyData[initialCurrencyType]).toFixed(2);
      default:
        alert(`Requested currency type isn't supported yet`);
        return 0;
    }
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      currencyData,
      initialLoading,
      exchanger
    }),
    [currencyData, loading]
  );

  return <CurrencyContext.Provider value={memoedValue}>{children}</CurrencyContext.Provider>;
};

export default function useCurrencyExchange() {
  return useContext(CurrencyContext);
}
