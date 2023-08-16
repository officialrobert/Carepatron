import { useContext } from 'react';
import { DialogEnum } from '../../types';
import { DialogProviderActions, DialogStateContext } from '../../store/DialogProvider';

import ConfirmButton from '../Confirm-Button';

const CreateNewClient = () => {
	const { dispatch } = useContext(DialogStateContext);

	const showCreateNewClientDialog = () => {
		dispatch({ type: DialogProviderActions.SHOW_DIALOG_TYPE, data: DialogEnum.CreateNewClient });
		dispatch({ type: DialogProviderActions.SHOW_DIALOG, data: true });
	};

	return <ConfirmButton onClick={showCreateNewClientDialog} text='Create new client' />;
};

export default CreateNewClient;
