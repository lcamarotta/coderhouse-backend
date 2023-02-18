import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const __path = (string) => path.join(__dirname, '..',string)

export default __path;