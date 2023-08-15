import { useContext, ChangeEvent, useState } from 'react';
import { ACTIONS, StateContext } from '../../store/DataProvider';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchTwoTone as SearchTwoToneIcon } from '@mui/icons-material';
import CreateNewClient from './CreateNewClient';
import { filter, includes, toLower, toString } from 'lodash';

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

		// Normally we should hit an API endpoint for searching the whole database-
		// and debounce this function on keypress/input

		// At scale, list data must be paginated, possibly I could've just use the 'clients' variable to store our filtered list-
		// but in production you want to provide a snappy user experience.
		// With that note, when user clears the search input they should get back to their present page's list, right?
		// So you want to store the unfilitered list (by page) so they get the same value instantly when clearing the form.

		// Though we could use the same variable 'clients' for the filterd and unfiltered-
		// this means we need to hit our server each time we switch from filtered and unfiltered list, vice versa.
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
