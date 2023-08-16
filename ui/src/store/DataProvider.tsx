import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { createClient } from '../services/api';
import { isEmpty } from 'lodash';
import { wait } from '../utils';
import { ToastEnum } from '../types';

import StyledAlert from '../components/Alert';

const initialState: IApplicationState = {
	showToast: ToastEnum.none,
	toastMessage: '',
	showFiltered: false,
	clients: [],
	filteredClients: [],
};

export const StateContext = createContext<{
	state: IApplicationState;
	dispatch: Dispatch<Action>;
	createNewClient: <T>(client: IClient) => Promise<T | any>;
	openToast: (type: ToastEnum, message: string) => void;
	hideToast: () => void;
}>(
	// @ts-ignore
	null
);

export enum ACTIONS {
	FETCH_ALL_CLIENTS = 'FETCH_ALL_CLIENTS',
	SEARCH_ALL_CLIENTS = 'SEARCH_ALL_CLIENTS',
	SHOW_FILTERED = 'SHOW_FILTERED',
	SHOW_TOAST = 'SHOW_TOAST',
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
		case ACTIONS.SHOW_TOAST:
			return { ...state, showToast: action.data };
		case ACTIONS.SET_TOAST_MESSAGE:
			return { ...state, toastMessage: action.data };
		default:
			return state;
	}
};

export default function DataProvider({ children }: { children?: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { toastMessage, showToast } = state;

	const openToast = (type: ToastEnum, message: string) => {
		dispatch({
			type: ACTIONS.SHOW_TOAST,
			data: type,
		});
		dispatch({
			type: ACTIONS.SET_TOAST_MESSAGE,
			data: message,
		});
	};

	const hideToast = () => {
		dispatch({
			type: ACTIONS.SHOW_TOAST,
			data: ToastEnum.none,
		});
		dispatch({
			type: ACTIONS.SET_TOAST_MESSAGE,
			data: '',
		});
	};

	const createNewClient = async (client: IClient) => {
		const { firstName, lastName, phoneNumber, email } = client;
		const clientRes = await createClient({ firstName, lastName, phoneNumber, email });

		if (!isEmpty(clientRes)) {
			// success
			// show recently created client info at top of the list
			dispatch({ type: ACTIONS.FETCH_ALL_CLIENTS, data: [clientRes, ...state?.clients] });

			openToast(ToastEnum.success, 'Successfully Created!');
			wait(1_500).then(() => hideToast());

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
				openToast,
				hideToast,
			}}
		>
			{children}
			{!isEmpty(showToast) && showToast !== ToastEnum.none && !isEmpty(toastMessage) && (
				<StyledAlert severity={showToast} color={showToast} message={toastMessage} />
			)}
		</StateContext.Provider>
	);
}
