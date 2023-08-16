import DataProvider from './store/DataProvider';
import Clients from './pages/Clients';
import DialogProvider from './store/DialogProvider';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Clients />,
	},
	{
		path: '/Clients',
		element: <Clients />,
	},
]);

export default function App() {
	return (
		<div className='App'>
			<DataProvider>
				<DialogProvider>
					<RouterProvider router={router} />
				</DialogProvider>
			</DataProvider>
		</div>
	);
}
