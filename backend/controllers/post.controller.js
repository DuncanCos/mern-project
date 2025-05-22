const Post = require('../models/post.model');

exports.create = async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user.id });
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.getAll = async (_req, res, next) => {
  try { res.json(await Post.find().populate('author', 'username')); }
  catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try { res.json(await Post.findById(req.params.id)); }
  catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};
