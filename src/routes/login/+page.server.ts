import type { Actions } from "./$types";
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

export const actions = {
	default: async (event) => {
		let info: AuthInformation = verifyAuthInformation(await event.request.formData());

		const response = await db.select({
			id: table.user.id,
			salt: table.user.salt,
			password: table.user.password
		})
			.from(table.user)
			.limit(1)
		.where(eq(table.user.username, info.username.toString()));

		if (response.length !== 1)
			authenticationFailure()

		const {id: userId, salt, password} = response[0];

		if (await hash(Buffer.from(info.password), salt) !== Buffer.from(password))
			authenticationFailure();

		const token = auth.generateSessionToken();
		const session = await auth.createSession(token, userId);
		auth.setSessionTokenCookie(event, token, session.expiresAt);

		return new Response();
	}
} satisfies Actions;
