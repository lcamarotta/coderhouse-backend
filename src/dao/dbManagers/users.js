import { checkPwd, errorHandler } from "../../utils.js";
import userModel from "../models/users.js";

export default class User {
	constructor() {
		console.log('DB Manager - USERS')
	};

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

    login = async (email, password) => {
        const result = await userModel.findOne({ email });
        if (!result) throw new errorHandler(401, 'User not found');
        if (!checkPwd(result, password)) throw new errorHandler(401, 'Incorrect password');
        const user = {
            name: `${result.first_name} ${result.last_name}`,
            email: result.email,
            age: result.age,
            role: result.role
        }
        return user;
    };
}