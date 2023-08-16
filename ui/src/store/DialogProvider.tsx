import { ReactNode, createContext, useReducer } from 'react';
import { DialogEnum } from '../types';
import CreateNewClientDialog from '../components/CreateNewClientDialog';

export const DialogStateContext = createContext<{
	state: IDialogState;
	dispatch: React.Dispatch<Action>;
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

	return (
		<DialogStateContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			<>{children}</>
			{state?.showDialog && (
				<>{state.showDialogType === DialogEnum.CreateNewClient && <CreateNewClientDialog />}</>
			)}
		</DialogStateContext.Provider>
	);
}
