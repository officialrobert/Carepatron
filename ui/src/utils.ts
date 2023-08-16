import { includes, isEmpty, isNumber, isString, size, toLower, trim } from 'lodash';
import parsePhoneNumber, { isPossiblePhoneNumber } from 'libphonenumber-js';

/**
 * Verify if email is correct format, returns true/false
 * @param email
 * @returns
 */
export const isCorrectEmailFormat = (email: string) => {
	const match =
		// eslint-disable-next-line
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return isString(email) && !isEmpty(email) && match.test(email);
};

/**
 * Get phone number metadata, returns null for invalid phone number
 * @param phoneNumber
 * @returns
 */
export const getPhoneNumberMetadata = (phoneNumber: string) => {
	try {
		const phoneNumberParsedInfo = parsePhoneNumber(phoneNumber);

		if (!phoneNumberParsedInfo || !isPossiblePhoneNumber(phoneNumber)) {
			return null;
		}

		return {
			phoneNumberParsedInfo,
			internationalFormat: phoneNumberParsedInfo?.formatInternational(),
		};
	} catch {
		return null;
	}
};

/**
 * Timout for n ms
 * @param ms
 * @returns
 */
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

/**
 * Search clients list by firstName/lastName
 * @param availableClients
 * @param query
 */
export const searchClients = (availableClients: IClient[], query: string) => {
	const filtered = [];
	const sanitizedQuery = toLower(trim(query));

	for (let i = 0; i < size(availableClients); i++) {
		const client = availableClients[i];
		const matchString = toLower(`${client?.firstName} ${client?.lastName}`);

		if (matchString === sanitizedQuery) {
			filtered.push(client);
			break;
		}

		if (includes(matchString, sanitizedQuery)) {
			filtered.push(client);
		}
	}

	return filtered;
};
