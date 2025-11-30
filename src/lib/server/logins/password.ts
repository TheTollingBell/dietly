import * as argon2 from 'argon2';

// Using OWASP recommendations for argon2id
const ARGON2ID_OPTIONS: argon2.Options = {
	memoryCost: 7168,
	timeCost: 5,
	parallelism: 1,
	hashLength: 32,
	type: argon2.argon2id
};

export async function hash(password: Buffer, salt: Buffer): Promise<string> {
	return argon2.hash(password, {
		...ARGON2ID_OPTIONS,
		salt
	});
}

export async function verify(storedHash: string, password: Buffer): Promise<boolean> {
	return argon2.verify(storedHash, password);
}
