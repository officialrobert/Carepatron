import { Box, TextField, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { StyledDialog, StyledDialogActions, StyledDialogContent, StyledDialogTitle } from '../Dialog';
import { ACTIONS, StateContext } from '../../store/DataProvider';
import { includes, isEmpty, map, toLower } from 'lodash';
import { CreateNewClientStep, CreateNewClientStepsLabel, DialogEnum } from '../../types';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '../../services/api';
import { getPhoneNumberMetadata, isCorrectEmailFormat, wait } from '../../utils';
import { DialogProviderActions, DialogStateContext } from '../../store/DialogProvider';
import {
	styleFlexHorizontalSpaceBetween,
	styleFlexStartVerticalElement,
	styleHorizontalFlexEnd,
} from '../../constants';
import { StyledStep, StyledStepLabel, StyledStepper } from '../Stepper';

import ConfirmButton from '../ConfirmButton';
import FormErrorMessage from '../FormErrorMessage';
import CloseIconButton from '../CloseIconButton';
import './CreateNewClientDialog.scss';

const CreateNewClientDialog = () => {
	const { state, dispatch } = useContext(StateContext);

	const { dispatch: dialogProviderDispatch } = useContext(DialogStateContext);
	const { clients = [] } = state;
	const [createNewClientActiveStep, setCreateNewClientActiveStep] = useState(CreateNewClientStep.PersonalDetails);

	const [showSuccess, setShowSuccess] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm();

	// handle dialog close
	const handleCreateNewClientDialogClose = () => {
		if (submitted) {
			return;
		}

		dialogProviderDispatch({ type: DialogProviderActions.SHOW_DIALOG, data: false });
		dialogProviderDispatch({ type: DialogProviderActions.SHOW_DIALOG_TYPE, data: DialogEnum.None });

		setErrorMessage('');
		setCreateNewClientActiveStep(CreateNewClientStep.PersonalDetails);
	};

	/**
	 * Return to first step
	 */
	const returnToPersonalDetails = () => {
		if (submitted) {
			return;
		}

		setCreateNewClientActiveStep(CreateNewClientStep.PersonalDetails);
	};

	/**
	 * Submit new client
	 */
	const proceedSubmit = async (data: any) => {
		try {
			if (submitted) {
				return;
			}

			const { firstName, lastName, email, phoneNumber } = data;
			const phoneNumberMeta = getPhoneNumberMetadata(phoneNumber);
			let canSubmit = createNewClientActiveStep === CreateNewClientStep.ContactDetails;

			if (firstName && lastName && createNewClientActiveStep === CreateNewClientStep.PersonalDetails) {
				setCreateNewClientActiveStep(CreateNewClientStep.ContactDetails);
				return;
			}

			if (!isCorrectEmailFormat(email)) {
				setError('email', { type: 'custom', message: 'Incorrect email format.' });
				canSubmit = false;
			}

			if (!phoneNumberMeta) {
				setError('phoneNumber', { type: 'custom', message: 'Incorrect phone format.' });
				canSubmit = false;
			}

			if (!canSubmit) {
				return;
			}

			setSubmitted(true);
			setErrorMessage('');

			const clientRes = await createClient({ firstName, lastName, phoneNumber, email });

			// simulate load
			await wait(1_500);
			setSubmitted(false);

			if (!isEmpty(clientRes)) {
				// success
				// show recently created client info at top of the list
				dispatch({ type: ACTIONS.FETCH_ALL_CLIENTS, data: [clientRes, ...clients] });

				// close dialog
				handleCreateNewClientDialogClose();

				// toggle toast
				setShowSuccess(true);
				await wait(1_500);
				setShowSuccess(false);
			}
		} catch (err: any) {
			if (includes(toLower(err?.message as string), 'network')) {
				setErrorMessage('Check your network connection.');
			}

			setSubmitted(false);
		}
	};

	return (
		<>
			<StyledDialog open onClose={handleCreateNewClientDialogClose}>
				<StyledDialogTitle>
					{!submitted && (
						<>
							<p style={{ fontWeight: '500', fontSize: '17px', textAlign: 'start' }}>Create new client</p>
							<CloseIconButton ariaLabel={'Close dialog'} onClick={handleCreateNewClientDialogClose} />
						</>
					)}
				</StyledDialogTitle>

				<StyledDialogContent>
					<form onSubmit={handleSubmit(proceedSubmit)}>
						<Box sx={{ width: '100%' }}>
							<StyledStepper activeStep={createNewClientActiveStep}>
								{map(CreateNewClientStepsLabel, (stepInfo) => {
									const { i18n, step } = stepInfo;
									const completed =
										(step !== CreateNewClientStep.ContactDetails &&
											createNewClientActiveStep === CreateNewClientStep.ContactDetails) ||
										(createNewClientActiveStep === CreateNewClientStep.ContactDetails &&
											!isEmpty(watch('email')) &&
											!isEmpty(watch('phoneNumber')));

									return (
										<StyledStep key={i18n} completed={completed}>
											<StyledStepLabel
												active={createNewClientActiveStep === step}
												completed={completed}
											>
												{i18n}
											</StyledStepLabel>
										</StyledStep>
									);
								})}
							</StyledStepper>
						</Box>
						<Box
							sx={{
								padding: '0 4px',
								boxSizing: 'border-box',
								marginTop: '16px',
								...styleFlexStartVerticalElement,
							}}
						>
							<Box
								sx={{
									display:
										CreateNewClientStep.PersonalDetails === createNewClientActiveStep && !submitted
											? 'block'
											: 'none',
									width: '100%',
								}}
							>
								<Box
									sx={{
										width: '100%',
										flexDirection: 'column',
										marginTop: '16px',
									}}
								>
									<p>First name</p>
									<TextField
										error={!isEmpty(errors?.firstName?.message)}
										helperText={errors?.firstName?.message as string}
										fullWidth
										hiddenLabel
										{...register('firstName', { required: 'First name is required.' })}
									/>{' '}
								</Box>

								<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
									<p>Last name</p>

									<TextField
										error={!isEmpty(errors?.lastName?.message)}
										helperText={errors?.lastName?.message as string}
										fullWidth
										hiddenLabel
										{...register('lastName', { required: 'Last name is required.' })}
									/>
								</Box>
							</Box>

							{CreateNewClientStep.ContactDetails === createNewClientActiveStep && !submitted && (
								<Box
									style={{
										width: '100%',
									}}
								>
									<Box sx={{ marginTop: '16px', ...styleFlexStartVerticalElement }}>
										<p>Email</p>
										<TextField
											error={!isEmpty(errors?.email?.message)}
											helperText={errors?.email?.message as string}
											fullWidth
											hiddenLabel
											{...register('email', { required: 'Invalid email address.' })}
										/>
									</Box>
									<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
										<p>Phone number</p>
										<TextField
											type='tel'
											error={!isEmpty(errors?.phoneNumber?.message)}
											helperText={errors?.phoneNumber?.message as string}
											fullWidth
											hiddenLabel
											{...register('phoneNumber', { required: 'Invalid phone number' })}
										/>
									</Box>
								</Box>
							)}
						</Box>

						<FormErrorMessage message={errorMessage} />

						<StyledDialogActions>
							{CreateNewClientStep.PersonalDetails === createNewClientActiveStep && (
								<div style={{ ...styleHorizontalFlexEnd }}>
									<ConfirmButton
										style={{
											width: '120px',
										}}
										type='submit'
										ariaLabel='Click this button and continue to Contact Details'
										text='Continue'
									/>
								</div>
							)}

							{CreateNewClientStep.ContactDetails === createNewClientActiveStep && (
								<div style={{ ...styleFlexHorizontalSpaceBetween }}>
									<ConfirmButton
										variant='text'
										style={{ background: 'transparent', ...(submitted && { opacity: 0 }) }}
										onClick={returnToPersonalDetails}
									>
										<ArrowBack style={{ height: '16px', width: '16px', marginRight: '4px' }} />
										Back
									</ConfirmButton>
									<ConfirmButton
										style={{
											width: '140px',
										}}
										isLoading={submitted}
										ariaLabel={'Click this button to submit client'}
										type='submit'
										text='Create Client'
									/>
								</div>
							)}
						</StyledDialogActions>
					</form>
				</StyledDialogContent>
			</StyledDialog>

			{showSuccess && (
				<Alert className='CreateNewClientSuccessAlert' severity='success' color='info'>
					Successfully Created!
				</Alert>
			)}
		</>
	);
};

export default CreateNewClientDialog;
