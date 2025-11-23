import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import  * as table  from "$lib/server/db/schema";
import { verifyAuthInformation, type AuthInformation } from "$lib/types";
import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";
import { hash } from "$lib/server/logins/password";
import * as auth from "$lib/server/auth";

function authenticationFailure() {
	error(401, "authentication failed");
}

export const POST: RequestHandler = async (event) => {
		let info: AuthInformation = await event.request.json();

	verifyAuthInformation(info);

		const response = await db.select({
			id: table.user.id,
			salt: table.user.salt,
			password: table.user.password
		})
			.from(table.user)
			.limit(1)
		.where(eq(table.user.username, info.username.trim().toString()));

		if (response.length !== 1) {
			authenticationFailure()
	}

		const {id: userId, salt, password} = response[0];

		if ((await hash(Buffer.from(info.password), Buffer.from(salt, "hex"))).compare(Buffer.from(password)) === 0)
			authenticationFailure();

		const token = auth.generateSessionToken();
		const session = await auth.createSession(token, userId);
		auth.setSessionTokenCookie(event, token, session.expiresAt);

		return new Response();
}
