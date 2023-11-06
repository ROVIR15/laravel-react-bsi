import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty, isNull } from 'lodash';
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

  const [totalPage, setTotalPage] = useState(0);
  const [totalUnread, setTotalUnread] = useState(0);

  // check initial loading whether the data is being loaded
  // with NotificationData is empty and loading state is true
  let initialLoading = isEmpty(NotificationData) || loading;

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const id = isEmpty(userStorage) ? null : userStorage?.id;

  // API to get currency data
  useEffect(() => {
    getNewNotification();
  }, []);

  function getNewNotification(param='?page=1'){
    try {
      if(!isNull(id)){
        API.getNotificationLimit(id, param, function(res) {
          if(!res) return;
          if(!res.data) throw new Error("Something wrong!");
          else {
            setTotalUnread(res.total_unread)
            setTotalPage(res.data.last_page);
            setNotificationData(res.data.data);
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
      totalPage,
      totalUnread,
      getNewNotification
    }),
    [NotificationData, loading]
  );

  return <NotificationContext.Provider value={memoedValue}>{children}</NotificationContext.Provider>;
};

export default function useNotification() {
  return useContext(NotificationContext);
}
