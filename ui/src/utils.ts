import { isEmpty, isNumber, isString } from 'lodash';

import parsePhoneNumber, { isPossiblePhoneNumber } from 'libphonenumber-js';

export const isCorrectEmailFormat = (email: string) => {
	const match =
		// eslint-disable-next-line
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return isString(email) && !isEmpty(email) && match.test(email);
};

export const getPhoneNumberMetadata = (phoneNumber: string) => {
	try {
		const phoneNumberParsedInfo = parsePhoneNumber(phoneNumber);

		if (!phoneNumberParsedInfo || !isPossiblePhoneNumber(phoneNumber)) {
			return false;
		}

		return {
			phoneNumberParsedInfo,
			internationalFormat: phoneNumberParsedInfo?.formatInternational(),
		};
	} catch {
		return false;
	}
};

export function wait(ms: number) {
	return new Promise((resolve) => {
		const _timeout = setTimeout(
			() => {
				clearTimeout(_timeout);
				return resolve(0);
			},
			isNumber(ms) ? ms : 50
		);
	});
}
