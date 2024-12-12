import Contacts from "../models/Contacts.js";


export const getContacts = () =>Contacts.find();

export const getContactsByFilter = (filter) =>Contacts.find(filter);
export const addContacts = (data) => Contacts.create(data);
export const removeContacts = (filter) => Contacts.findOneAndDelete(filter);
export const updateStatusContacts = (filter, data) =>
  Contacts.findOneAndUpdate(filter, data);