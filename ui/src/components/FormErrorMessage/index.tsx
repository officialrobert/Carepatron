import { Box, FormHelperText } from '@mui/material';
import { isEmpty } from 'lodash';

const FormErrorMessage = (props: { message?: string }) => {
	const { message } = props;

	if (isEmpty(message) || !message) {
		return <></>;
	}

	return (
		<Box
			sx={{
				width: '100%',
				margin: '16px 0',
				padding: '0 8px',
				boxSizing: 'border-box',
			}}
		>
			<FormHelperText style={{ color: 'red', boxSizing: 'border-box' }}>{message}</FormHelperText>
		</Box>
	);
};

export default FormErrorMessage;
