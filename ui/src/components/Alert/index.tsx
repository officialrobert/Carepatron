import cx from 'classnames';
import { Alert, AlertProps } from '@mui/material';
import { ReactNode } from 'react';
import { isEmpty, omit } from 'lodash';
import './Alert.scss';

const StyledAlert = (props: AlertProps & { className?: string; children?: ReactNode; message?: string }) => {
	const { message, children, className } = props;

	return (
		<Alert
			{...omit(props, ['message', 'children', 'className'])}
			className={cx({
				[`${className}`]: !isEmpty(className),
				CreateNewClientSuccessAlert: props?.severity === 'success',
			})}
		>
			{message || ''}
			{children || null}
		</Alert>
	);
};

export default StyledAlert;
