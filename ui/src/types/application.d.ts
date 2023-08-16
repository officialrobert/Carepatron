interface IClient {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}

interface IApplicationState {
	clients: IClient[];
	filteredClients: IClient[];
	showFiltered: boolean;
	showToast: ToastEnum;
	toastMessage: string;
}

interface IDialogState {
	showDialog: boolean;
	showDialogType: string;
}
