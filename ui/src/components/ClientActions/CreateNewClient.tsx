import { useContext } from 'react';
import { DialogEnum } from '../../types';
import { DialogStateContext } from '../../store/DialogProvider';

import ConfirmButton from '../ConfirmButton';

const CreateNewClient = () => {
	const { openDialog } = useContext(DialogStateContext);

	const showCreateNewClientDialog = () => {
		openDialog(DialogEnum.CreateNewClient);
	};

	return <ConfirmButton onClick={showCreateNewClientDialog} text='Create new client' />;
};

export default CreateNewClient;
