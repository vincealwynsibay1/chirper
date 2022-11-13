import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import gravatar from "gravatar";
import { IGetUserAuthInfoRequest } from "src/types";

const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;

	try {
		const user = await userService.authenticate(email, password);

		if (user) {
			return res.json({ ...user });
		} else {
			return res
				.status(400)
				.json({ message: "Email or Password is incorrect" });
		}
	} catch (err) {
		next(err);
	}
};

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, email, birthDate } = req.body;

		const userObject = {
			username,
			password,
			email,
			birthDate,
			displayName: username,
			bio: "",
			avatar: gravatar.url(email, { s: "100", r: "x", d: "retro" }),
			followers: [],
			following: [],
		};

		await userService.create(userObject);

		return res.json({ registered: true });
	} catch (err) {
		next(err);
	}
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getAll();

		return res.json(users);
	} catch (err) {
		next(err);
	}
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await userService.getById(req.params.id);

		if (user) {
			return res.json(user);
		} else {
			return res.status(400).json({ message: "User not found" });
		}
	} catch (err) {
		next(err);
	}
};

const update = (req: Request, res: Response, next: NextFunction) => {
	try {
		userService.update(req.params.id, req.body);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const _delete = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await userService._delete(req.params.id);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const follow = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		await userService.follow(req.params.id, req.user.id);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const unfollow = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		await userService.unfollow(req.params.id, req.user.id);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const getFollowers = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const followers = await userService.getFollowers(req.params.id);
		return res.json({ followers });
	} catch (err) {
		next(err);
	}
};
const getFollowing = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const followedUsers = await userService.getFollowing(req.params.id);
		return res.json({ followedUsers });
	} catch (err) {
		next(err);
	}
};

export default {
	authenticate,
	register,
	update,
	_delete,
	getAll,
	getById,
	follow,
	unfollow,
	getFollowers,
	getFollowing,
};
