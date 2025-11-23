import { error } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import type { RequestHandler } from './$types';
import { randomBytes } from 'crypto';
import type { AuthInformation } from '$lib/types';
import { hash } from '$lib/server/logins/password';

/** Return true if string is valid */
function validateStr(str: String): boolean {
	return typeof str === 'string' || str.trim().length != 0;
}

export const POST: RequestHandler = async ({ request }) => {
	const requestJson: AuthInformation = await request.json();

	if (!Object.hasOwn(request, 'username') || !Object.hasOwn(request, 'password'))
		error(400, 'username and password must be defined');

	if (!validateStr(requestJson.username) || !validateStr(requestJson.password))
		error(400, 'username and password must be non-zero length strings');

	const salt = randomBytes(16);
	let { username, password } = requestJson;

	const toInsert: table.UserInsert = {
		username: username.toString(),
		salt: Buffer.from(salt),
		password: (await hash(Buffer.from(password), Buffer.from(salt))).toString('hex')
	};

	await db.insert(table.user).values(toInsert);

	return new Response();
};
