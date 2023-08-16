import cx from 'classnames';
import { Stepper, StepperProps, Step, StepProps, StepLabel, StepLabelProps } from '@mui/material';
import { isEmpty, isString, omit } from 'lodash';
import { ReactNode } from 'react';
import './CustomStepper.scss';

const omitProperties = ['children', 'className'];

export const StyledStepper = (props: StepperProps & { className?: string; children: ReactNode }) => {
	const { children, className } = props;

	return (
		<Stepper
			className={cx('StyledStepper', { [`${className}`]: isString(className) && !isEmpty(className) })}
			{...omit(props, omitProperties)}
		>
			{children}
		</Stepper>
	);
};

export const StyledStep = (props: StepProps & { className?: string; children: ReactNode }) => {
	const { children, className } = props;

	return (
		<Step
			className={cx('StyledStep', { [`${className}`]: isString(className) && !isEmpty(className) })}
			{...omit(props, omitProperties)}
		>
			{children}
		</Step>
	);
};

export const StyledStepLabel = (
	props: StepLabelProps & { className?: string; completed?: boolean; active?: boolean; children: ReactNode }
) => {
	const { children, active, completed, className } = props;

	return (
		<StepLabel
			className={cx('StyledStepLabel', {
				StyledStepLabelCompleted: completed,
				StyledStepLabelActive: active,
				[`${className}`]: isString(className) && !isEmpty(className),
			})}
			{...omit(props, [...omitProperties, 'active', 'completed'])}
		>
			{children}
		</StepLabel>
	);
};
