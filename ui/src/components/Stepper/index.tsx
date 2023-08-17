import cx from 'classnames';
import { Stepper as MaterialUIStepper, StepperProps, Step, StepProps, StepLabel, StepLabelProps } from '@mui/material';
import { isEmpty, isNumber, isString, map, omit, toString } from 'lodash';
import { ReactNode } from 'react';
import './CustomStepper.scss';

const omitProperties = ['children', 'className'];

export type StepperStepProps = {
	i18n: string;
	step: number | undefined;
	completed?: boolean;
};

export type StepperStepsProps = StepperStepProps[];

export const StyledStepper = (props: StepperProps & { className?: string; children: ReactNode }) => {
	const { children, className } = props;

	return (
		<MaterialUIStepper
			className={cx('StyledStepper', { [`${className}`]: isString(className) && !isEmpty(className) })}
			{...omit(props, omitProperties)}
		>
			{children}
		</MaterialUIStepper>
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

const Stepper = (props: StepperProps & { steps: StepperStepsProps; className?: string }) => {
	const { activeStep, steps, className } = props;

	return (
		<StyledStepper
			activeStep={activeStep}
			className={cx({ [`${className}`]: isString(className) && !isEmpty(className) })}
		>
			{map(steps, (stepInfo) => {
				const { i18n, step, completed } = stepInfo;
				const isActive = activeStep === step;
				const isCompleted = completed || (isNumber(activeStep) && isNumber(step) && activeStep > step);

				return (
					<StyledStep key={i18n} completed={isCompleted}>
						<StyledStepLabel active={isActive} completed={isCompleted}>
							{toString(i18n || '')}
						</StyledStepLabel>
					</StyledStep>
				);
			})}
		</StyledStepper>
	);
};

export default Stepper;
