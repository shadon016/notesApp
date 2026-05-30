// controllers/note.controller.js
import Note from "../models/note.model.js";

// ========================
// CREATE
// ========================
export const createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Note created",
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

// ========================
// GET ALL
// ========================
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    next(err);
  }
};

// ========================
// GET ONE
// ========================
export const getNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

// ========================
// UPDATE
// ========================
export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated",
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

// ========================
// DELETE
// ========================
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (err) {
    next(err);
  }
};
