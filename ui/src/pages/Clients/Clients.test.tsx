import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../../App';
import { act, render, screen, waitFor } from '@testing-library/react';

const mockApiResponse = [
	{
		id: 'xx-aa-bb',
		firstName: 'Robert',
		lastName: 'Espina',
		email: 'john@gmail.com',
		phoneNumber: '+6192099102',
	},
];
const mock = new MockAdapter(axios);
mock.onGet(`http://localhost:5044/clients`).reply(200, mockApiResponse);

test('Robert Espina should be in clients list', async () => {
	// eslint-disable-next-line
	await act(async () => {
		render(<App />);
	});

	await waitFor(() => {
		expect(screen.getByText('Robert Espina')).toBeInTheDocument();
	});
});

test('Search input should be available', async () => {
	// eslint-disable-next-line
	await act(async () => {
		render(<App />);
	});

	expect(screen.getByPlaceholderText('Search clients...')).toBeInTheDocument();
});
