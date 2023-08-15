import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientRow from './ClientRow';

export default function BasicTable({ clients }: { clients: IClient[] }) {
	return (
		<TableContainer
			component={Paper}
			sx={{
				maxWidth: '100%',
				borderRadius: '4px',
				boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.05)',
			}}
		>
			<Table
				sx={{
					minWidth: 400,
					border: 'none',
					boxShadow: 'none',
				}}
				aria-label='simple table'
			>
				<TableHead>
					<TableRow>
						<TableCell style={{ fontWeight: '600' }}>Name</TableCell>
						<TableCell style={{ fontWeight: '600' }}>Phone number</TableCell>
						<TableCell style={{ fontWeight: '600' }}>Email</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{clients.map((client) => (
						<ClientRow key={client.id} client={client} />
					))}
					{!clients ||
						(!clients.length && (
							<TableRow sx={{ padding: 3 }}>
								<TableCell component='th' scope='row'>
									No clients
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
