const express = require("express");
const postRouter = express.Router();
const Post = require("../models/Post");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const uploadMiddleware = multer({ dest: "uploads/" });
const secret = "df0qu8nvou8dq2";

// Create Post from post request
postRouter.post("/", uploadMiddleware.single("file"), async (req, res) => {
  // received image of file request
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extention = parts[parts.length - 1];
  const newPath = path + "." + extention;
  fs.renameSync(path, newPath);
  // received text requests
  const { title, summary, content } = req.body;  
  // for author info, we can use the verified cookies
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

// Get Post from
postRouter.get("/", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

// get singel post info
postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

// Edit & update post
postRouter.put("/", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    })
    // delete upload file
    .then(() => {fs.unlinkSync(postDoc.cover)})
    .then(() => {res.json(postDoc)}) 
  });
});

postRouter.delete("/:id", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id } = req.params;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await Post.findByIdAndDelete(id)
    // delete upload file
    .then(() => {fs.unlinkSync(postDoc.cover)})
    .then(() => {res.json("Delete success")}) 
    
     
  });
});

module.exports = postRouter;

