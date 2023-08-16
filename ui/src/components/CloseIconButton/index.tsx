import cx from 'classnames';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CSSProperties } from 'react';
import { isEmpty, isString } from 'lodash';

type CloseIconButtonProps = {
	type?: 'button' | 'submit' | 'reset' | undefined;
	ariaLabel?: string;
	onClick?: <T>(props: T) => any | undefined;
	style?: Partial<CSSProperties>;
	size?: 'small' | 'medium' | 'large';
	className?: string;
};

const CloseIconButton = (props: CloseIconButtonProps) => {
	const { onClick, className, type, ariaLabel, size, style } = props;

	return (
		<IconButton
			type={type}
			aria-label={ariaLabel}
			onClick={onClick}
			size={size || 'medium'}
			className={cx({ [`${className}`]: isString(className) && !isEmpty(className) })}
			sx={{
				position: 'relative',
				color: (theme) => theme.palette.grey[500],
				...style,
			}}
		>
			<CloseIcon />
		</IconButton>
	);
};

export default CloseIconButton;
