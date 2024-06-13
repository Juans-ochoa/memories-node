import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postsMessages = await PostMessage.find();
    res.status(200).send(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;

  const newPost = new PostMessage(body);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {}
};

export const updatePost = async (req, res) => {
  const {
    params: { id: _id },
  } = req;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Not post with that id");
  }

  try {
    const updatedPost = await PostMessage.findByIdAnUpdate(
      _id,
      { ...post },
      { new: true }
    );
    console.log(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Not post with that id");
  }

  try {
    await PostMessage.findByIdAndRemove(_id);
    res.status(201);
  } catch (error) {
    console.log(error);
  }
};
