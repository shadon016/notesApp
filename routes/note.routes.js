// routes/note.routes.js
import { Router } from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createNoteSchema,
  updateNoteSchema,
} from "../validations/note.validation.js";

const router = Router();

// সব route protected
router.use(authMiddleware);

router.post("/", validate(createNoteSchema), createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.patch("/:id", validate(updateNoteSchema), updateNote);
router.delete("/:id", deleteNote);

export default router;
