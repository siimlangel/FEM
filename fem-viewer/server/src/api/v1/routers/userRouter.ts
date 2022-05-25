import { Request, Router } from "express";
import { checkAuth, authorize } from "./shared";
import db from "../../../db";
import ShowService from "../services/user/show";
import ListService from "../services/user/created/list";
import DeleteService from "../services/user/created/delete";
import UnauthorizedError from "../../../error/UnauthorizedError";
import ChangePasswordService from "../services/user/changePassword";

const router = Router();

router.get(
	"/user/created/:createdById",
	[authorize(["ADMIN", "DEVELOPER"])],
	async (req, res) => {
		try {
			const service = new ListService(req, db);
			const users = await service.execute();
			res.json({ users });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
);

router.delete(
	"/user/created/:toDeleteId",
	[authorize(["ADMIN", "DEVELOPER"])],
	async (req, res) => {
		try {
			const service = new DeleteService(req, db);
			const user = await service.execute();
			res.json({ user });
		} catch (err) {
			if (err instanceof UnauthorizedError) {
				return res.status(err.code).json({ message: err.message });
			} else {
				return res.status(500).json({ message: err.message });
			}
		}
	}
);

router.get("/user/:id", [checkAuth], async (req, res) => {
	try {
		const service = new ShowService(req, db);
		const user = await service.execute();

		res.json({ user });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

router.patch(
	"/user/changepassword/",
	[checkAuth],
	async (req: Request, res) => {
		try {
			const service = new ChangePasswordService(req, db);

			await service.execute();

			res.status(200).json({ message: "successfully changed password" });
		} catch (err) {
			return res.status();
		}
	}
);

export default router;
