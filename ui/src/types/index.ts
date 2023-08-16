export enum CreateNewClientStep {
	'PersonalDetails' = 0,
	'ContactDetails' = 1,
}

export const CreateNewClientStepsLabel = [
	{ step: 0, i18n: 'Personal details' },
	{ step: 1, i18n: 'Contact details' },
];

export enum DialogEnum {
	'None' = 'None',
	'CreateNewClient' = 'CreateNewClient',
}

export enum ToastEnum {
	'none' = 'none',
	'success' = 'success',
	'error' = 'error',
	'info' = 'info',
	'warning' = 'warning',
}
