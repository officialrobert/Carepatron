import { useState } from 'react';
import {
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Box,
	IconButton,
	Stepper,
	Step,
	StepLabel,
} from '@mui/material';
import { ChevronLeft, Close as CloseIcon } from '@mui/icons-material';

export enum CreateNewClientStep {
	'PersonalDetails' = 0,
	'ContactDetails' = 1,
}

export const CreateNewClientStepsLabel = ['Personal details', 'Contact details'];

const CreateNewClient = () => {
	const [showNewClientDialog, setShowNewClientDialog] = useState(false);
	const [createNewClientActiveStep, setCreateNewClientActiveStep] = useState(CreateNewClientStep.PersonalDetails);
	const handleCreateNewClientDialogClose = () => {
		setShowNewClientDialog(false);
	};

	const [newClientInputForm, setNewClientInputForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});

	/**
	 * Navigate to 2nd & final step
	 */
	const proceedToContactDetails = () => {
		if (newClientInputForm?.firstName && newClientInputForm?.lastName) {
			setCreateNewClientActiveStep(CreateNewClientStep.ContactDetails);
		}
	};

	/**
	 * Return to first step
	 */
	const returnToPersonalDetails = () => {
		setCreateNewClientActiveStep(CreateNewClientStep.PersonalDetails);
	};

	/**
	 * Submit new client
	 */
	const proceedSubmit = () => {};

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
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 0, p: 4 }}
				>
					<Typography variant='h4' sx={{ fontWeight: '500', fontSize: '18px', textAlign: 'start' }}>
						Create new client
					</Typography>
					<IconButton
						aria-label='close'
						onClick={handleCreateNewClientDialogClose}
						sx={{
							position: 'relative',
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent style={{ width: '90vw', maxWidth: '460px' }}>
					<Box sx={{ width: '100%' }}>
						<Stepper activeStep={createNewClientActiveStep}>
							{CreateNewClientStepsLabel.map((label, index) => {
								return (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					</Box>

					<Box sx={{ width: '100%' }}>{}</Box>

					<DialogActions style={{ position: 'relative', marginTop: '16px', boxSizing: 'border-box' }}>
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
									}}
									onClick={returnToPersonalDetails}
								>
									<ChevronLeft />
									Back
								</Button>

								<Button
									variant='contained'
									disableRipple
									style={{
										height: '50px',
										textTransform: 'none',
										borderRadius: '8px',
										background: '#345FFF',
										width: '120px',
									}}
									aria-label='Click this button and continue to Contact Details'
									onClick={proceedSubmit}
								>
									Create Client
								</Button>
							</div>
						)}
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CreateNewClient;
