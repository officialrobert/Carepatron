import { useContext } from 'react';
import { StateContext } from '../store/DataProvider';
import Button from '@mui/material/Button';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const Actions = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

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
