import type { RequestHandler } from './$types';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { randomBytes } from 'crypto';
import { verifyAuthInformation, type AuthInformation } from '$lib/types';
import { hash } from '$lib/server/logins/password';

export const POST: RequestHandler = async (event) => {
	const requestJson: AuthInformation = await event.request.json();

	verifyAuthInformation(requestJson);

	const salt = randomBytes(16);
	let { username, password } = requestJson;

	const toInsert: table.UserInsert = {
		username: username.trim().toString(),
		salt: salt.toString('hex'),
		password: await hash(Buffer.from(password), salt)
	};

	await db.insert(table.user).values(toInsert);

	return new Response();
};
