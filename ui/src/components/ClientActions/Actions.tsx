import { useContext, ChangeEvent, useState } from 'react';
import { ACTIONS, StateContext } from '../../store/DataProvider';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchTwoTone as SearchTwoToneIcon } from '@mui/icons-material';
import CreateNewClient from './CreateNewClient';
import { filter, includes, toLower, toString } from 'lodash';

export const SearchClientInputDomId = 'SearchClientInputDomId';

const ClientActions = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients = [] } = state;
	const [searchInput, setSearchInput] = useState('');

	const onSearchClientInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = toString(e?.target?.value);
		const filteredClients = filter(clients, (client) =>
			includes(toLower(`${client?.firstName || ''} ${client?.lastName || ''}`), toLower(value))
		);

		setSearchInput(value);

		if (value) {
			dispatch({ type: ACTIONS.SHOW_FILTERED, data: true });
		} else {
			dispatch({ type: ACTIONS.SHOW_FILTERED, data: false });
		}

		// See ui/README.md on notes about search
		dispatch({ type: ACTIONS.SEARCH_ALL_CLIENTS, data: !value ? [] : filteredClients });
	};

	return (
		<div
			style={{
				width: '100%',
				margin: '16px 0',
				position: 'relative',
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<OutlinedInput
				id={SearchClientInputDomId}
				data-testid={SearchClientInputDomId}
				style={{
					height: '48px',
					background: '#fff',
					borderRadius: '6px',
				}}
				type={'text'}
				endAdornment={
					<InputAdornment position='end'>
						<SearchTwoToneIcon />
					</InputAdornment>
				}
				value={searchInput}
				onChange={onSearchClientInput}
				placeholder='Search clients...'
			/>

			<CreateNewClient />
		</div>
	);
};

export default ClientActions;
