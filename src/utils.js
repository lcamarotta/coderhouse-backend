// --imports--
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bcrypt from 'bcrypt';

// --absolute path to files--
const filename = fileURLToPath(import.meta.url);
const filename_dir = dirname(filename);
export const rootDir = (string) => path.join(filename_dir, '..',string);

// --pwd hash
export const createHash = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
export const checkPwd = (user, pwd) => bcrypt.compareSync(pwd, user.password);

// --custom error handler--
export class errorWithStatusCode extends Error {
	constructor(message, httpStatusCode) {
			super(message);
			this.httpStatusCode = httpStatusCode;
	}
}