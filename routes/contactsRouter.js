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

contactsRouter.get("/", getContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactsSchema), createContact);


contactsRouter.patch(
  "/:id/read",
  isValidId,
  validateBody(updateContactsStatusSchema),
  updateContactsStatus
);

export default contactsRouter;
