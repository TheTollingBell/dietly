import { argon2 } from 'crypto';

// Using OWASP recommendations
const ARGON2ID_PARAMETERS = {
	memory: 7168,
	passes: 5,
	parallelism: 1,
	tagLength: 32
};

export function hash(password: Buffer, salt: Buffer): Promise<Buffer> {
	return new Promise((resolve) => {
		argon2(
			'argon2id',
			{
				...ARGON2ID_PARAMETERS,
				message: password,
				nonce: salt
			},
			(err, hash) => {
				if (err) throw err;
				resolve(hash);
			}
		);
	});
}
