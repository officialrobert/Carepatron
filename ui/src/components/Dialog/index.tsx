import {
	DialogTitle,
	DialogActions,
	DialogActionsProps,
	DialogTitleProps,
	DialogContent,
	DialogContentProps,
	DialogProps,
	Dialog,
} from '@mui/material';
import { ReactNode } from 'react';
import { omit } from 'lodash';
import './CustomDialog.scss';

export const StyledDialog = (props: DialogProps & { children: ReactNode }) => {
	const { children } = props;

	return (
		<Dialog className='Dialog' {...omit(props, ['children'])}>
			{children}
		</Dialog>
	);
};

export const StyledDialogContent = (props: DialogContentProps & { children: ReactNode }) => {
	const { children } = props;

	return (
		<DialogContent className='DialogContent' {...omit(props, ['children'])}>
			{children}
		</DialogContent>
	);
};

export const StyledDialogTitle = (props: DialogTitleProps & { children: ReactNode }) => {
	const { children } = props;

	return (
		<DialogTitle className='DialogTitle' {...omit(props, ['children'])}>
			{children}
		</DialogTitle>
	);
};

export const StyledDialogActions = (props: DialogActionsProps & { children: ReactNode }) => {
	const { children } = props;

	return (
		<DialogActions className='DialogActions' {...omit(props, ['children'])}>
			{children}
		</DialogActions>
	);
};
