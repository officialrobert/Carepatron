import React, { createContext, useReducer } from 'react';
import StyledAlert from '../components/Alert';
import { createClient } from '../services/api';
import { isEmpty } from 'lodash';
import { wait } from '../utils';

const initialState: IApplicationState = {
	showSuccessToast: false,
	toastMessage: '',
	showFiltered: false,
	clients: [],
	filteredClients: [],
};

export const StateContext = createContext<{
	state: IApplicationState;
	dispatch: React.Dispatch<Action>;
	createNewClient: <T>(client: IClient) => Promise<T | any>;
}>(
	// @ts-ignore
	null
);

export enum ACTIONS {
	FETCH_ALL_CLIENTS = 'FETCH_ALL_CLIENTS',
	SEARCH_ALL_CLIENTS = 'SEARCH_ALL_CLIENTS',
	SHOW_FILTERED = 'SHOW_FILTERED',
	SHOW_SUCCESS_TOAST = 'SHOW_SUCCESS_TOAST',
	SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE',
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
		case ACTIONS.SHOW_SUCCESS_TOAST:
			return { ...state, showSuccessToast: Boolean(action.data), ...(!action.data && { toastMessage: '' }) };
		case ACTIONS.SET_TOAST_MESSAGE:
			return { ...state, toastMessage: action.data };
		default:
			return state;
	}
};

export default function DataProvider({ children }: { children?: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { toastMessage, showSuccessToast } = state;

	const createNewClient = async (client: IClient) => {
		const { firstName, lastName, phoneNumber, email } = client;
		const clientRes = await createClient({ firstName, lastName, phoneNumber, email });

		if (!isEmpty(clientRes)) {
			// success
			// show recently created client info at top of the list
			dispatch({ type: ACTIONS.FETCH_ALL_CLIENTS, data: [clientRes, ...state?.clients] });
			dispatch({
				type: ACTIONS.SHOW_SUCCESS_TOAST,
				data: true,
			});
			dispatch({
				type: ACTIONS.SET_TOAST_MESSAGE,
				data: true,
			});

			await wait(1_500);

			dispatch({
				type: ACTIONS.SHOW_SUCCESS_TOAST,
				data: false,
			});

			return clientRes;
		}

		return null;
	};

	return (
		<StateContext.Provider
			value={{
				state,
				dispatch,
				createNewClient,
			}}
		>
			{children}
			{showSuccessToast && !isEmpty(toastMessage) && (
				<StyledAlert severity='success' color='info' message={state?.toastMessage} />
			)}
		</StateContext.Provider>
	);
}
