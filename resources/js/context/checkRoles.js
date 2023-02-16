import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { isEmpty, isNull, filter } from 'lodash';

import { getRefinedPathname } from '../utils/getPathname';
import { isEqual } from 'date-fns';

export const state = {
  user: null
};

export const APIRolesContext = createContext(state);

export const APIRolesProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isAllowedToInsert, setIsAllowedToInsert] = useState(false);
  const [isAllowedToEdit, setIsAllowedToEdit] = useState(false);
  const [isAllowedToDelete, setIsAllowedToDelete] = useState(false);
  const [pageRoles, setPageRoles] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  
  let pages = useLocation();

  const _userDataStoredOnBrowser = localStorage.getItem('user');

  useEffect(() => {
    const _userPageRoles = JSON.parse(_userDataStoredOnBrowser);

    try {
      if(isEmpty(_userPageRoles)) throw new Error('empty user data roles');
      let _d = checkAuthorities();
      setData(_d);
      setIsAllowedToInsert(Boolean(_d?.insert));
      setIsAllowedToEdit(Boolean(_d?.edit));
      setIsAllowedToDelete(Boolean(_d?.delete));
    } catch (error) {
      alert(error)
    }

  }, [pages]);

  useEffect(() => {
    if(isEmpty(data)) return;

    if(isNull(data.feature)) return;

    console.log(data.feature === "add", isEqual(data.feature, 'add'), isAllowedToInsert)
    if(data.feature === "add" && !isAllowedToInsert) navigate('/dashboard');

  }, [data])

  const checkAuthorities = () => {
    const _userPageRoles = JSON.parse(_userDataStoredOnBrowser);

    try {
      if(isEmpty(_userPageRoles)) throw new Error('failed to get user roles data');

      return getRefinedPathname(pages, _userPageRoles);
    } catch (error) {
      alert(error);
    }
  }

  const isUserAllowedToInsertion = () => {
    try {
      if(isEmpty(data)) throw new Error('Data not ready');
      return data?.insert
    } catch (error) {
      return false
    }
  }

  const memoedValue = useMemo(
    () => ({
      isNotReady: isEmpty(data),
      data,
      check: checkAuthorities,
      isAllowedToInsert,
      isAllowedToEdit,
      isAllowedToDelete,
      isUserAllowedToDeletion: isAllowedToDelete,
      isUserAllowedToEdit: isAllowedToEdit
    }),
    [data, loading]
  );

  return (
    <APIRolesContext.Provider value={memoedValue}>
      {children}
    </APIRolesContext.Provider>
  )
};

export default function useAPIRoles() {
  return useContext(APIRolesContext);
}
