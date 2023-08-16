import { ReactNode, createContext, useReducer } from 'react';
import { DialogEnum } from '../types';
import CreateNewClientDialog from '../components/CreateNewClientDialog';

export const DialogStateContext = createContext<{
	state: IDialogState;
	dispatch: React.Dispatch<Action>;
	openDialog: (type: DialogEnum) => void;
	closeDialog: () => void;
}>(
	// @ts-ignore
	null
);

export enum DialogProviderActions {
	SHOW_DIALOG = 'SHOW_DIALOG',
	SHOW_DIALOG_TYPE = 'SHOW_DIALOG_TYPE',
}

const initialState: IDialogState = {
	showDialog: false,
	showDialogType: DialogEnum.None,
};

type Action = {
	type: keyof typeof DialogProviderActions;
	data: any;
};

const reducer = (state: IDialogState, action: Action) => {
	switch (action.type) {
		case DialogProviderActions.SHOW_DIALOG:
			return { ...state, showDialog: Boolean(action.data) };
		case DialogProviderActions.SHOW_DIALOG_TYPE:
			return { ...state, showDialogType: action.data || DialogEnum.None };
		default:
			return state;
	}
};

/**
 * Show active dialog
 * To add more dialog types, see 'DialogEnum'
 */
export default function DialogProvider({ children }: { children?: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	/**
	 * Show modal/dialog type
	 * @param type
	 * @returns
	 */
	const openDialog = (type: DialogEnum) => {
		if (!type) {
			return;
		}

		dispatch({ type: DialogProviderActions.SHOW_DIALOG, data: true });
		dispatch({ type: DialogProviderActions.SHOW_DIALOG_TYPE, data: type });
	};

	/**
	 * Close modal/dialog
	 */
	const closeDialog = () => {
		dispatch({ type: DialogProviderActions.SHOW_DIALOG, data: false });
		dispatch({ type: DialogProviderActions.SHOW_DIALOG_TYPE, data: DialogEnum.None });
	};

	return (
		<DialogStateContext.Provider
			value={{
				state,
				dispatch,
				openDialog,
				closeDialog,
			}}
		>
			<>{children}</>
			{state?.showDialog && (
				<>{state.showDialogType === DialogEnum.CreateNewClient && <CreateNewClientDialog />}</>
			)}
		</DialogStateContext.Provider>
	);
}
