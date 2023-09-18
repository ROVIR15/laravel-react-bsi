import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import useAuth from '.';
import API from '../helpers';

export const state = [];

export const NotificationContext = createContext(state);

export const NotificationProvider = ({ children }) => {
  // This exchanger is by default to do work to convert
  // IDR to USD, so the default value always be on 1 USD = XX.XXX IDR
  // state to store currency data
  const [NotificationData, setNotificationData] = useState([]);

  // store loading state
  const [loading, setLoading] = useState(false);

  // check initial loading whether the data is being loaded
  // with NotificationData is empty and loading state is true
  let initialLoading = isEmpty(NotificationData) || loading;

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const id = isEmpty(userStorage) ? null : userStorage?.id;

  // API to get currency data
  useEffect(() => {
    getNewNotification();
  }, []);

  function getNewNotification(){
    try {
      if(!isEmpty(id)){
        API.getNotificationLimit(id, function(res) {
          if(!res) throw new Error("Something wrong!");
          if(!res.data) throw new Error("Something wrong!");
          else {
            setNotificationData(res.data);
          }
        })
      } else {
        setNotificationData([])
      }
    } catch (error) {
      alert(error);
    }
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.

  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      data: NotificationData,
      initialLoading,
      getNewNotification
    }),
    [NotificationData, loading]
  );

  return <NotificationContext.Provider value={memoedValue}>{children}</NotificationContext.Provider>;
};

export default function useNotification() {
  return useContext(NotificationContext);
}
