import { memo, useContext, useEffect, useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
import { ACTIONS, StateContext } from '../../store/DataProvider';
import { getClients } from '../../services/api';

import Page from '../../components/Page';
import ClientTable from './ClientTable';
import ClientActions from '../../components/ClientActions/Actions';

function Clients() {
	const { state, dispatch } = useContext(StateContext);
	const { clients, filteredClients, showFiltered } = state;

	const clientsToDisplay = useMemo(
		() => (showFiltered ? filteredClients : clients),
		[clients, filteredClients, showFiltered]
	);

	/**
	 * Fetch initial clients
	 */
	useEffect(() => {
		getClients().then((clients) => {
			dispatch({ type: ACTIONS.FETCH_ALL_CLIENTS, data: clients });
		});
	}, [dispatch]);

	return (
		<Page>
			<Typography variant='h4' sx={{ fontWeight: '600', textAlign: 'start' }}>
				Clients
			</Typography>
			<ClientActions />

			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				<ClientTable clients={clientsToDisplay} />
			</Paper>
		</Page>
	);
}

export default memo(Clients);
