import React, { createContext, useState, useMemo, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import AUTHAPI from '../helpers/api/auth';

export const state = {
	user: {
	  email: '',
	  password: ''
	},
	loading: false,
	error: null,
	login: ({
	  email,
	  password
	}) => {},
	signUp: ({
	  email,
	  password
	}) => {},
	logout: () => {},
}

export const AuthContext = createContext(state);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    {"id":3,"name":"Alex","email":"alex@gmail.com","email_verified_at":null,"created_at":"2022-06-23 07:13:36","updated_at":"2022-06-23 07:13:36","pages":[{"id":7,"users_id":3,"page_name":"sales","insert":1,"delete":1,"edit":1},{"id":8,"users_id":3,"page_name":"human_resources","insert":1,"delete":1,"edit":1},{"id":9,"users_id":3,"page_name":"production","insert":1,"delete":1,"edit":1},{"id":10,"users_id":3,"page_name":"inventory","insert":1,"delete":1,"edit":1},{"id":11,"users_id":3,"page_name":"industrial_engineering","insert":1,"delete":1,"edit":1},{"id":12,"users_id":3,"page_name":"material","insert":1,"delete":1,"edit":1}]}
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();  
  
  // If we change page, reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    if( !userStorage || !access_token ) {
      localStorage.clear();
      navigate('/auth/login');
    } else {
      const { name, email } = userStorage;
      setUser({name, email, access_token});  
    }

    // usersApi.getCurrentUser()
    //   .then((user) => setUser(user))
    //   .catch((_error) => {})
    //   .finally(() => setLoadingInitial(false));
  }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  function login(email, password) {
    setLoading(true);
    
    AUTHAPI.login(email, password, function(res){
      const { success, access_token, user } = res.data;
      if(success) {
        setUser({...user, user, access_token})
        localStorage.setItem('_token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard')
      }
      else setError(res.error);
    });

    setLoading(false);

    console.log('logged in' )
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function signUp(email, name, password) {
    setLoading(true);

    // usersApi.signUp({ email, name, password })
    //   .then((user) => {
    //     setUser(user);
    //     history.push("/");
    //   })
    //   .catch((error) => setError(error))
    //   .finally(() => setLoading(false));
	  console.log('signUp')
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {

    const at = localStorage.getItem('_token');

    AUTHAPI.logout(at, function(res){
      if(res.success){
        localStorage.clear();
        navigate('/auth/login');
      };
    });
    // sessionsApi.logout().then(() => setUser(undefined));
	  console.log('log out');
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
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth(){
  return useContext(AuthContext);
}
