import express from "express";
import {
  getContacts,
  getOneContact,
  createContact,
  updateContactsStatus,
  deleteContact
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactsSchema,
  updateContactsStatusSchema,
} from "../schemas/contactsSchemas.js";

import isValidId from "../midlewares/isValidId.js";

const contactsRouter = express.Router();

// GET /api/contacts/ 
contactsRouter.get("/", getContacts);

// GET /api/contacts/:id
contactsRouter.get("/:id", isValidId, getOneContact);

// DELETE /api/contacts/:id
contactsRouter.delete("/:id", isValidId, deleteContact);

// POST /api/contacts/
contactsRouter.post("/", validateBody(createContactsSchema), createContact);

// PATCH /api/contacts/:id/read
contactsRouter.patch(
  "/:id/read",
  isValidId,
  validateBody(updateContactsStatusSchema),
  updateContactsStatus
);

export default contactsRouter;
