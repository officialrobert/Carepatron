import React from 'react';
import './Page.scss';

export default function Page({ children }: { children?: React.ReactNode }) {
	return (
		<div className='PageComponent' style={{ margin: 'auto', marginTop: 24 }}>
			{children}
		</div>
	);
}
