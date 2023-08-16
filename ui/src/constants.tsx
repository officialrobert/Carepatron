import { CSSProperties } from 'react';

export const styleCenterElement: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

export const styleFlexStartHorizontalElement: CSSProperties = {
	display: 'flex',
	justifyContent: 'flex-start',
	alignItems: 'flex-start',
};

export const styleFlexStartVerticalElement: CSSProperties = {
	...styleFlexStartHorizontalElement,
	flexDirection: 'column',
	width: '100%',
};

export const styleCenterColumnElement: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

export const styleHorizontalFlexEnd: CSSProperties = {
	display: 'flex',
	justifyContent: 'flex-end',
	alignItems: 'center',
	width: '100%',
};

export const styleVerticalFlexEnd: CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	alignItems: 'flex-end',
	width: '100%',
};

export const styleFlexHorizontalSpaceBetween: CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',
};
