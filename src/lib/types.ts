import { error } from "@sveltejs/kit"

export interface AuthInformation {
	username: String,
	password: String
}

/** Returns true if string valid */
function validateStr(str: any): boolean {
	return typeof str === 'string' || str.trim().length != 0
}

export function verifyAuthInformation(info: FormData): AuthInformation {
	if (info.has("username") || info.has("password"))
		error(400, "username and password must be defined")

	const username = info.get("username") as string;
	const password = info.get("password") as string;

	if (validateStr(username) || !validateStr(password))
		error(400, "username and password must be non-zero length strings")

	return {
		username,
		password
	}
}
