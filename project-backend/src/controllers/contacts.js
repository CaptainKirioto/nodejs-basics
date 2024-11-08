import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import { contactsAddSchema } from '../validation/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);

  const filter = parseContactFilterParams(req.query);
  console.log(filter);

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Contacts successfully found',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);

    //   const error = new Error(`Contact with id=${id} not found`);
    //   error.status = 404; // "error" is object, that don't have "status" field, but here we add it
    //     throw error;

    //   return res.status(404).json({
    //     status: 404,
    //     message: `Contact with id=${id} not found`,
    //   });
  }

  res.json({
    status: 200,
    message: 'Contact successfully found',
    data,
  });
};

export const addContactController = async (req, res) => {
  const { error } = contactsAddSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw createHttpError(400, error.message);
  }
  const data = await contactServices.addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact successfully added',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params;
  const data = await contactServices.updateContact({
    _id,
    payload: req.body,
    options: { upsert: true },
  });

  const status = data.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upserted successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;

  const data = await contactServices.updateContact({ _id, payload: req.body });

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    message: 'Movie patched successfully',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;

  const data = await contactServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, `Contact with id=${_id} not found`);
  }

  res.status(204).send();
};
