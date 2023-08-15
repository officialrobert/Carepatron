import { useContext, ChangeEvent, useState } from 'react';
import { ACTIONS, StateContext } from '../store/DataProvider';
import Button from '@mui/material/Button';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const Actions = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients = [] } = state;
	const [searchInput, setSearchInput] = useState('');

	const onSearchClientInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e?.target?.value;
		const filteredClients = clients.filter((client) =>
			`${client?.firstName || ''} ${client?.lastName || ''}`.toLowerCase()?.includes(value)
		);

		setSearchInput(value);

		if (value) {
			dispatch({ type: ACTIONS.SHOW_FILTERED, data: true });
		} else {
			dispatch({ type: ACTIONS.SHOW_FILTERED, data: false });
		}

		// Normally we should hit an API endpoint for searching the whole database
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
					borderRadius: '4px',
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

			<Button
				variant='contained'
				disableRipple
				style={{ height: '50px', textTransform: 'none', borderRadius: '8px', background: '#345FFF' }}
			>
				<p style={{ color: '#fff', fontSize: '16px' }}>Create new client</p>
			</Button>
		</div>
	);
};

export default Actions;
