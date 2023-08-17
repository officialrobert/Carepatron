import { Box, FormHelperText } from '@mui/material';
import { isEmpty } from 'lodash';
import './FormErrorMessage.scss';

const FormErrorMessage = (props: { message?: string }) => {
	const { message } = props;

	if (isEmpty(message) || !message) {
		return <></>;
	}

	return (
		<Box className='FormErrorMessage'>
			<FormHelperText style={{ color: 'red', boxSizing: 'border-box' }}>{message}</FormHelperText>
		</Box>
	);
};

export default FormErrorMessage;
