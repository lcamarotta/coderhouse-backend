// --imports--
import { fileURLToPath } from "url";
import path, { dirname } from "path";

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