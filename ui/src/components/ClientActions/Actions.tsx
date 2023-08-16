import { useContext, ChangeEvent, useState } from 'react';
import { ACTIONS, StateContext } from '../../store/DataProvider';
import { InputAdornment, OutlinedInput } from '@mui/material';
import { SearchTwoTone as SearchTwoToneIcon } from '@mui/icons-material';
import CreateNewClient from './CreateNewClient';
import { toString } from 'lodash';
import { searchClients } from '../../utils';
import { styleFlexHorizontalSpaceBetween } from '../../constants';
import './Actions.scss';

export const SearchClientInputDomId = 'SearchClientInputDomId';

const ClientActions = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients = [] } = state;
	const [searchInput, setSearchInput] = useState('');

	const onSearchClientInput = (e: ChangeEvent<HTMLInputElement>) => {
		const value = toString(e?.target?.value);
		const filteredClients = searchClients(clients, value);
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
				margin: '16px 0',
				...styleFlexHorizontalSpaceBetween,
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
				className='SearchInput'
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
