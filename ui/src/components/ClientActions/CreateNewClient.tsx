import cx from 'classnames';
import { useState, useContext } from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Box,
	IconButton,
	Stepper,
	Step,
	StepLabel,
	TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ChevronLeft, Close as CloseIcon } from '@mui/icons-material';
import { isEmpty, map, size } from 'lodash';
import { isCorrectEmailFormat, isCorrectPhoneNumberFormat, wait } from '../../utils';
import { createClient } from '../../services/api';
import { CreateNewClientStep, CreateNewClientStepsLabel } from '../../types';
import './CreateNewClient.scss';
import { ACTIONS, StateContext } from '../../store/DataProvider';

const CreateNewClient = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients = [] } = state;

	const [showNewClientDialog, setShowNewClientDialog] = useState(false);
	const [createNewClientActiveStep, setCreateNewClientActiveStep] = useState(CreateNewClientStep.PersonalDetails);

	const [submitted, setSubmitted] = useState(false);

	const [newClientInputForm, setNewClientInputForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});

	const [inputError, setInputError] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});

	// handle dialog close
	const handleCreateNewClientDialogClose = () => {
		if (submitted) {
			return;
		}

		setShowNewClientDialog(false);
		setNewClientInputForm({
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
		});
		setInputError({
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
		});
		setCreateNewClientActiveStep(CreateNewClientStep.PersonalDetails);
	};

	/**
	 * Navigate to 2nd & final step
	 */
	const proceedToContactDetails = () => {
		if (!newClientInputForm?.firstName) {
			setInputError({ ...inputError, firstName: 'First name is required.' });
		}

		if (!newClientInputForm?.lastName) {
			setInputError({ ...inputError, firstName: 'Last name is required.' });
		}

		if (newClientInputForm?.firstName && newClientInputForm?.lastName) {
			setCreateNewClientActiveStep(CreateNewClientStep.ContactDetails);
		}
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
	const proceedSubmit = async () => {
		if (submitted) {
			return;
		}

		setSubmitted(true);

		try {
			const { firstName, lastName, phoneNumber, email } = newClientInputForm;
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
			}
		} catch (err) {
			setSubmitted(false);
		}
	};

	const onFormInputChange = (property: string, val: string) => {
		if (property) {
			setNewClientInputForm({ ...newClientInputForm, [property]: val });
		}
	};

	return (
		<>
			<Button
				variant='contained'
				disableRipple
				style={{ height: '50px', textTransform: 'none', borderRadius: '8px', background: '#345FFF' }}
				onClick={() => setShowNewClientDialog(true)}
			>
				<p style={{ color: '#fff', fontSize: '16px' }}>Create new client</p>
			</Button>

			<Dialog open={showNewClientDialog} onClose={handleCreateNewClientDialogClose}>
				<DialogTitle
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						m: 0,
						p: 4,
					}}
				>
					{!submitted && (
						<>
							<p style={{ fontWeight: '500', fontSize: '17px', textAlign: 'start' }}>
								{' '}
								Create new client{' '}
							</p>
							<IconButton
								aria-label='Close dialog'
								onClick={handleCreateNewClientDialogClose}
								size='medium'
								sx={{
									position: 'relative',
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
						</>
					)}
				</DialogTitle>

				<DialogContent style={{ width: '90vw', maxWidth: '460px' }}>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={createNewClientActiveStep}>
							{map(CreateNewClientStepsLabel, (stepInfo) => {
								const { i18n, step } = stepInfo;
								const completed =
									(step !== CreateNewClientStep.ContactDetails &&
										createNewClientActiveStep === CreateNewClientStep.ContactDetails) ||
									(createNewClientActiveStep === CreateNewClientStep.ContactDetails &&
										isCorrectEmailFormat(newClientInputForm?.email) &&
										isCorrectPhoneNumberFormat(newClientInputForm?.phoneNumber) &&
										size(newClientInputForm?.phoneNumber) > 1);

								return (
									<Step key={i18n} completed={completed}>
										<StepLabel
											className={cx('CreateNewClientStepLabel', {
												CreateNewClientStepLabelCompleted: completed,
												CreateNewClientStepLabelActive: createNewClientActiveStep === step,
											})}
										>
											{i18n}
										</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Box>
					<Box
						sx={{
							width: '100%',
							flexDirection: 'column',
							padding: '0 4px',
							boxSizing: 'border-box',
							justifyContent: 'flex-start',
							marginTop: '16px',
						}}
					>
						{CreateNewClientStep.PersonalDetails === createNewClientActiveStep && !submitted && (
							<>
								<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
									<p>First name</p>
									<TextField
										fullWidth
										hiddenLabel
										value={newClientInputForm.firstName}
										onChange={(e) => onFormInputChange('firstName', e?.target?.value)}
									/>{' '}
								</Box>

								<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
									<p>Last name</p>
									<TextField
										fullWidth
										hiddenLabel
										value={newClientInputForm.lastName}
										onChange={(e) => onFormInputChange('lastName', e?.target?.value)}
									/>
								</Box>
							</>
						)}

						{CreateNewClientStep.ContactDetails === createNewClientActiveStep && !submitted && (
							<>
								<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
									<p>Email</p>
									<TextField
										fullWidth
										hiddenLabel
										disabled={submitted}
										value={newClientInputForm.email}
										onChange={(e) => onFormInputChange('email', e?.target?.value)}
									/>{' '}
								</Box>
								<Box sx={{ width: '100%', flexDirection: 'column', marginTop: '16px' }}>
									<p>Phone number</p>
									<TextField
										fullWidth
										hiddenLabel
										disabled={submitted}
										value={newClientInputForm.phoneNumber}
										onChange={(e) => onFormInputChange('phoneNumber', e?.target?.value)}
									/>
								</Box>
							</>
						)}
					</Box>

					<DialogActions
						style={{
							position: 'relative',
							marginTop: '16px',
							boxSizing: 'border-box',
							...(submitted && { marginTop: '36px' }),
						}}
					>
						{CreateNewClientStep.PersonalDetails === createNewClientActiveStep && (
							<div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
								<Button
									variant='contained'
									disableRipple
									style={{
										height: '50px',
										textTransform: 'none',
										borderRadius: '8px',
										background: '#345FFF',
										width: '120px',
										color: '#fff',
									}}
									aria-label='Click this button and continue to Contact Details'
									onClick={proceedToContactDetails}
								>
									Continue
								</Button>
							</div>
						)}

						{CreateNewClientStep.ContactDetails === createNewClientActiveStep && (
							<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
								<Button
									variant='text'
									style={{
										height: '50px',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										textTransform: 'none',
										paddingLeft: '0',
										margin: '0',
										fontWeight: '500',
										...(submitted && { opacity: 0 }),
									}}
									onClick={returnToPersonalDetails}
								>
									<ChevronLeft />
									Back
								</Button>

								<LoadingButton
									style={{
										height: '50px',
										textTransform: 'none',
										borderRadius: '8px',
										background: '#345FFF',
										width: '120px',
										color: '#fff',
									}}
									variant='outlined'
									loading={submitted}
									aria-label={'Click this button to submit client'}
									onClick={proceedSubmit}
									className='LoadingButtonSubmit'
								>
									{submitted ? '' : 'Create Client'}
								</LoadingButton>
							</div>
						)}
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateNewClient;