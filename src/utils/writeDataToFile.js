import fs from 'fs';
import customError from './customError.js';

const writeDataToFile = async(path, data) => {
	try {		
		await fs.promises.writeFile(path, data)
			return null
	} catch (e) {
		throw new customError(500, `Internal Error - ${e}`)
	}
}	

export default writeDataToFile