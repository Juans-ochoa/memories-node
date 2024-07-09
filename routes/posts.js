import { Router } from "express";
import PostController from "../controllers/posts.js";

const router = Router();

router.get("/", PostController.getPosts);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.patch("/:id", PostController.likePost);
router.delete("/:id", PostController.deletePost);

export default router;
