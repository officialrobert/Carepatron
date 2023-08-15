import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, render, screen, waitFor } from '@testing-library/react';

const mockApiResponse = [
	{
		id: 'xx-aa-bb',
		firstName: 'John',
		lastName: 'Smitherin',
		email: 'john@gmail.com',
		phoneNumber: '+6192099102',
	},
];

const mock = new MockAdapter(axios);

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
}));

mock.onGet(`http://localhost:5044/clients`).reply(200, mockApiResponse);

test('Show Clients page', async () => {
	// eslint-disable-next-line
	await act(async () => {
		render(<App />);
	});

	await waitFor(() => {
		expect(screen.getByText('Clients')).toBeInTheDocument();
	});
});
