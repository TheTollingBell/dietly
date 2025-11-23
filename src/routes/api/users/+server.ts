import type { RequestHandler } from "./$types";
import  * as table  from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { randomBytes } from "crypto";
import { verifyAuthInformation, type AuthInformation } from "$lib/types";
import { hash } from "$lib/server/logins/password";
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
		const requestJson: AuthInformation = await event.request.json();

		verifyAuthInformation(requestJson)

		const salt = randomBytes(16);
		let {username, password} = requestJson;

		const toInsert: table.UserInsert = {
				username: username.toString(),
				salt: Buffer.from(salt),
				password: (await hash(Buffer.from(password), Buffer.from(salt))).toString('hex')
		};

		await db.insert(table.user).values(toInsert);

		return new Response();
}
