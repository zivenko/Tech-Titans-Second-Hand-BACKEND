import * as contactsService from "../services/contactsService.js";
import HttpError from "../helpers/HttpError.js";


export const getContacts = async (req, res, next) => {
  try {
    const result = await contactsService.getContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactsByFilter({ _id: id });

    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await contactsService.createContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContactsStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const result = await contactsService.updateContactsStatus({_id: id}, body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const  deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.deleteContact({_id: id});
    res.json(result);
  } catch (error) {
    next(error);
  }
};


