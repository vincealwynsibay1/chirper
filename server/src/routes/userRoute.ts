import { verifyAuth } from "./../utils/jwt";
import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

// authentication routes

router.post("/auth/login", userController.authenticate);
router.post("/auth/register", userController.register);

// user routes
router.get("/users/", userController.getAll);
router.get("/users/:id", userController.getById);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController._delete);

// user profile
router.put("/users/:id/follow", verifyAuth, userController.follow);
router.put("/users/:id/unfollow", verifyAuth, userController.unfollow);
router.get("/users/:id/followers", verifyAuth, userController.getFollowers);
router.get("/users/:id/following", verifyAuth, userController.getFollowing);

export default router;