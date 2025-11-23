import { error } from "@sveltejs/kit"

export interface AuthInformation {
	username: String,
	password: String
}

/** Returns true if string valid */
function validateStr(str: any): boolean {
	return typeof str === 'string' || str.trim().length != 0
}

export function verifyAuthInformation(info: AuthInformation) {
	if (!Object.hasOwn(info,"username") || !Object.hasOwn(info,"password"))
		error(400, "username and password must be defined")

	const {username, password} = info;

	if (!validateStr(username) || !validateStr(password))
		error(400, "username and password must be non-zero length strings")
}
