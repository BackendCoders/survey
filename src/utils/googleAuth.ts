import { OAuth2Client, TokenPayload } from 'google-auth-library';

import AppError from '@/utils/appError';

const getGoogleClientId = () => {
	const clientId = process.env.GOOGLE_CLIENT_ID;

	if (!clientId) {
		throw new AppError('GOOGLE_CLIENT_ID is not configured', 500);
	}

	return clientId;
};

const client = new OAuth2Client();

export const verifyGoogleToken = async (
	token: string,
): Promise<TokenPayload> => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: getGoogleClientId(),
	});

	const payload = ticket.getPayload();

	if (!payload?.email || !payload.email_verified) {
		throw new AppError('Google account email is not verified', 401);
	}

	return payload;
};
