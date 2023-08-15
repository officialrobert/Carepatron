import React, { createContext, useReducer } from 'react';

const initialState: IApplicationState = {
	showFiltered: false,
	clients: [],
	filteredClients: [],
};

export const StateContext = createContext<{
	state: IApplicationState;
	dispatch: React.Dispatch<Action>;
}>(
	// @ts-ignore
	null
);

export enum ACTIONS {
	FETCH_ALL_CLIENTS = 'FETCH_ALL_CLIENTS',
	SEARCH_ALL_CLIENTS = 'SEARCH_ALL_CLIENTS',
	SHOW_FILTERED = 'SHOW_FILTERED',
}

type Action = {
	type: keyof typeof ACTIONS;
	data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
	switch (action.type) {
		case ACTIONS.FETCH_ALL_CLIENTS:
			return { ...state, clients: action.data };
		case ACTIONS.SEARCH_ALL_CLIENTS:
			return { ...state, filteredClients: action.data };
		case ACTIONS.SHOW_FILTERED:
			return { ...state, showFiltered: Boolean(action.data) };
		default:
			return state;
	}
};

export default function DataProvider({ children }: { children?: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</StateContext.Provider>
	);
}
