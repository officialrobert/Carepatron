import cx from 'classnames';
import { Button } from '@mui/material';
import { isEmpty } from 'lodash';
import { CSSProperties, ReactNode } from 'react';
import { styleCenterElement } from '../../constants';
import { LoadingButton } from '@mui/lab';
import './ConfirmButton.scss';

type ConfirmButtonProps = {
	type?: 'button' | 'submit' | 'reset' | undefined;
	isLoading?: boolean;
	isDisabled?: boolean;
	children?: ReactNode;
	disableRipple?: boolean | undefined;
	text?: string;
	ariaLabel?: string;
	onClick?: <T>(props: T) => any | undefined;
	style?: Partial<CSSProperties>;
	className?: string;
	variant?: 'text' | 'contained' | 'outlined';
};

const btnStyles: Partial<CSSProperties> = {
	height: '46px',
	boxSizing: 'border-box',
	textTransform: 'none',
	borderRadius: '8px',
	background: '#345FFF',
};

const ConfirmButton = (props: ConfirmButtonProps) => {
	const { className, isLoading, type, text, variant, disableRipple, children, onClick, ariaLabel, style } = props;

	if (isLoading) {
		return (
			<LoadingButton
				loading
				style={{
					...btnStyles,
					...styleCenterElement,
					...style,
				}}
				variant='outlined'
				aria-label={ariaLabel}
				className={cx('LoadingButtonSubmit', 'ConfirmButton', { [`${className}`]: !isEmpty(className) })}
			/>
		);
	}

	return (
		<Button
			variant={variant || 'contained'}
			disableRipple={disableRipple}
			type={type}
			style={{
				...btnStyles,
				...styleCenterElement,
				...style,
			}}
			onClick={onClick}
			{...(!isEmpty(ariaLabel) && { 'aria-label': ariaLabel })}
			className={cx('ConfirmButton', { [`${className}`]: !isEmpty(className) })}
		>
			{children}
			{text || ''}
		</Button>
	);
};

export default ConfirmButton;
