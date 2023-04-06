// --imports--
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import bcrypt from 'bcrypt';

// --absolute path to files--
const filename = fileURLToPath(import.meta.url);
const filename_dir = dirname(filename);
export const rootDir = (string) => path.join(filename_dir, '..',string);

// --error handler--
export class errorHandler {
	constructor(httpStatusCode, msg) {
			this.httpStatusCode = httpStatusCode;
			this.msg = msg;
	}
}

// --pwd hash
export const createHash = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
export const checkPwd = (user, pwd) => bcrypt.compareSync(pwd, user.password);