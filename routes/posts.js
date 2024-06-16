import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.patch("/:id", likePost);
router.delete("/:id", deletePost);

export default router;
