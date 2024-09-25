const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const Post = require("../models/post");
const User = require("../models/user");
const io = require('../socket');
exports.getposts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perpage = 2;
  // to return that mongoose function should return a real promise , we should have to chain exec().
  try{
      const TotalItems = await Post.find().countDocuments();
      const posts = await Post.find()
            .populate('creator')
            .sort({createdAt:-1})
            .skip((currentPage - 1) * perpage)
            .limit(perpage);
          if (!posts) {
            const error = new Error("Could not Find Posts");
            error.statusCode = 404;
            throw error;
          }
          res
            .status(200)
            .json({
              message: "All Posts Fetched",
              posts: posts,
              totalItems: TotalItems,
            });
  }
    catch(err){
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.createposts = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  let creator;
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed,Entered data is incorrect");
    error.statusCode = 422;
    throw error; // automatically exit function execution and try to reach the next error handling middleware
  }
  if (!req.file) {
    const error = new Error("Image not provided");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  // create a post and save it  to database;
  const newpost = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: req.userId,
  });
  try {
    await newpost.save();
     const user = await User.findById(req.userId);
      user.posts.push(post);
     await user.save();
       io.getIO().emit('posts',{action:'create',post:{...post._doc , creator:{_id:req.userId,name:user.name}}});
      res.status(201).json({
        message: "post save successfully",
        newpost: newpost,
        creator: { _id: user._id, name: user.name },
      });
  } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
};
exports.getpost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not Find Post");
        error.statusCode = 404;
        throw error; // if we throw an error inside then block then the control  is reached to the catch block with the same error that was inside then block;
      }
      res.status(200).json({ message: "Post fetched", post: post });
    })
    .catch((err) => {
      if (!err) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed,Entered data is incorrect");
    error.statusCode = 422;
    throw error; // automatically exit function execution and try to reach the next error handling middleware
  }
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No File Picked");
    error.statusCode = 422;
    throw error;
  }
  Post.findById(postId).populate('creator')
    .then((post) => {
      if (!post) {
        const error = new Error("No post found!");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator._id.toString() !== req.userId) {
        const error = new Error("Not Authorized!");
        error.statusCode = 403;
        throw error;
      }
      if (imageUrl !== post.imageUrl) {
        ClearImage(post.imageUrl);
      }
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      io.getIO().emit('posts',{action:'update',post:result});
      res
        .status(200)
        .json({ message: "Post Updated Successfully!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("No post found!");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not Authorized!");
        error.statusCode = 403;
        throw error;
      }
      // Check current LoggedIn User;
      ClearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then((res) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      return user.save();
    })
    .then((res) => {
      io.getIO().emit('posts',{action:'delete', post:postId});
      console.log(res + " " + "Post Removed");
      res.status(200).json({ message: "post Deleted!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const ClearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};
