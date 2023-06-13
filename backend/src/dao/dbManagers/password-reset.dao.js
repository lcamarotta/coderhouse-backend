import { logger } from "../../utils/logger.js";
import { passwordResetModel } from "./models/password-reset.js";

export default class MongoPw_ResetDao {
	constructor() {};

	validateToken = async (email, token) => {
    const result = await passwordResetModel.findOne({ token });
    logger.debug(`validate token DAO result, ${result}`);
    if(!result) return false
    if(result.email != email) return false
    return true;
  };

	create = async (email, token) => {
    const expireAfterSeconds = Date.now() + (1000 * 60 * 60);
    const result = await passwordResetModel.create({ email, token, expireAfterSeconds });
    logger.debug(`create token DAO result, ${result}`);
    return result;
  };

	delete = async (email) => {
		const result = await passwordResetModel.deleteOne({email});
		return result;
	}
    
}