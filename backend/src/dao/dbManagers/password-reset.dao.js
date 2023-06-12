import { logger } from "../../utils/logger.js";
import { passwordResetModel } from "./models/password-reset.js";

export default class MongoPw_ResetDao {
	constructor() {};

	validateToken = async (email, token) => {
    const result = await passwordResetModel.findOne({ token });
    logger.debug(`validateToken result, ${result}`);
    if(!result) return false
    if(result.email != email) return false
    return true;
  };

	create = async (email, token) => {
    const result = await passwordResetModel.create({ email, token });
    logger.debug(`create token result, ${result}`);
    return result;
  };
    
}