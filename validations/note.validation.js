// validations/note.validation.js
import Joi from "joi";

export const createNoteSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).required(),
});

export const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  content: Joi.string().min(1),
});
