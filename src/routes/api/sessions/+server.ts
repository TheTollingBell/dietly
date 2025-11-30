import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { verifyAuthInformation, type AuthInformation } from '$lib/types';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { verify } from '$lib/server/logins/password';
import * as auth from '$lib/server/auth';

function authenticationFailure() {
	error(401, 'authentication failed');
}

export const POST: RequestHandler = async (event) => {
	let info: AuthInformation = await event.request.json();

	verifyAuthInformation(info);

	const response = await db
		.select({
			id: table.user.id,
			password: table.user.password
		})
		.from(table.user)
		.limit(1)
		.where(eq(table.user.username, info.username.trim().toString()));

	if (response.length !== 1) {
		authenticationFailure();
	}

	const { id: userId, password } = response[0];

	const isValid = await verify(password, Buffer.from(info.password));
	if (!isValid) {
		authenticationFailure();
	}

	const token = auth.generateSessionToken();
	const session = await auth.createSession(token, userId);
	auth.setSessionTokenCookie(event, token, session.expiresAt);

	return new Response();
};

export const DELETE: RequestHandler = async (event) => {
	const session_id = event.cookies.get(auth.sessionCookieName);

	if (typeof session_id !== 'string')
		error(400, "session cookie doesn't exist or is incorrectly formatted");

	auth.deleteSessionTokenCookie(event);
	await auth.invalidateSession(session_id);

	return new Response();
};
