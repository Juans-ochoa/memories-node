import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";
import { validatePartialPost, validatePost } from "../schemas/post.js";

class PostController {
  static async getPosts(req, res) {
    try {
      const postsMessages = await PostMessage.find();
      res.status(200).send(postsMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async createPost(req, res) {
    const result = validatePost(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const newPost = new PostMessage(result.data);
      await newPost.save();

      res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePost(req, res) {
    const result = validatePartialPost(req.body);

    if (result.error) {
      return res.status(400).json(result.error.message);
    }

    const {
      params: { id: _id },
    } = req;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Not post with that id");
    }

    try {
      const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...result.data },
        { new: true }
      );

      res.status(201).json(updatedPost);
    } catch (error) {
      console.log(error);
    }
  }

  static async likePost(req, res) {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Not post with that id");
    }

    try {
      const post = await PostMessage.findById(_id);
      const updatePost = await PostMessage.findByIdAndUpdate(
        _id,
        { likeCount: post.likeCount + 1 },
        { new: true }
      );

      res.json(updatePost);
    } catch (error) {
      console.log(error);
    }
  }

  static async deletePost(req, res) {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Not post with that id");
    }

    try {
      await PostMessage.findByIdAndDelete(_id);

      res.json({ message: "Post deleted!" });
    } catch (error) {
      console.log(error);
    }
  }
}

export default PostController;
