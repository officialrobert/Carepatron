import { render, screen } from '@testing-library/react';
import App from './App';

test('Show Clients page', () => {
	render(<App />);
	const linkElement = screen.getByText(/Clients/i);
	expect(linkElement).toBeInTheDocument();
});
