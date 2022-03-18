import React, {useContext, useEffect, useReducer} from 'react';
import api from '../helpers';

const ctx = React.createContext(null);

const Reducer = (state, action) => {
	switch(action.name){
		case 'data':
			return {...state, 
				categories: action.payload.categories.data,
			};
		case 'sending':
			return{...state, sending: !state.sending}
		case 'log':
			return {...state, log: []};
		default: 
			return state
	}
}

export function useCategories(){
	const context = useContext(ctx);
	const [state] = context;

	function getAllCategories(){
		return state.categories;
	}

	return {getAllCategories}
}

export function Providers({ children }){
  return (
    <ctx.Provider value={useReducer(Reducer, state)}>
		{children}
	</ctx.Provider>
  )
}