import userModel from "./models/users.js";

export default class MongoUserDao {
	constructor() {};

	exists = async (email) => {
        return await userModel.findOne({ email }) ? true : false;
    };

	get = async (email) => {
        return await userModel.findOne({ email });
    };

	findById = async (id) => {
        return await userModel.findById(id);
    };

    create = async (user) => {
        if(user.email.startsWith('admin')) user['role'] = 'admin';
        const result = await userModel.create(user);
        return result;
    };
    
    update = async (user) => {
		const result = await userModel.updateOne({_id: user._id}, user);
		return result;
    };
}