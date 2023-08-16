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
	variant?: 'text' | 'contained' | 'outlined';
};

const ConfirmButton = (props: ConfirmButtonProps) => {
	const { isLoading, type, text, variant, disableRipple, children, onClick, ariaLabel, style } = props;

	if (isLoading) {
		return (
			<LoadingButton
				loading
				style={{
					height: '46px',
					boxSizing: 'border-box',
					textTransform: 'none',
					borderRadius: '8px',
					background: '#345FFF',
					fontSize: '16px',
					...styleCenterElement,
					...style,
				}}
				variant='outlined'
				aria-label={ariaLabel}
				className='LoadingButtonSubmit'
			/>
		);
	}

	return (
		<Button
			variant={variant || 'contained'}
			disableRipple={disableRipple}
			type={type}
			style={{
				height: '46px',
				boxSizing: 'border-box',
				textTransform: 'none',
				borderRadius: '8px',
				background: '#345FFF',
				fontSize: '16px',
				...styleCenterElement,
				...style,
			}}
			onClick={onClick}
			{...(!isEmpty(ariaLabel) && { 'aria-label': ariaLabel })}
		>
			{children}
			{text || ''}
		</Button>
	);
};

export default ConfirmButton;
