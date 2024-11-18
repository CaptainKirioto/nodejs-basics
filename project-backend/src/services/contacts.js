import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  if (filter.minBirthYear) {
    query.where('birthYear').gte(filter.minBirthYear);
  }
  if (filter.maxBirthYear) {
    query.where('birthYear').lte(filter.maxBirthYear);
  }
  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }

  const data = await query;

  // const totalItems = (await ContactCollection.find()).length;
  const totalItems = await ContactCollection.find()
    .merge(query)
    .countDocuments();
  const paginationData = calculatePaginationData({ totalItems, page, perPage });
  return {
    data,
    ...paginationData,
  };
};

// export const getContactById = (id) => ContactCollection.findById(id);

export const getContactById = async (id) => {
  try {
    return await ContactCollection.findById(id);
  } catch (error) {
    console.log(error);
  }
};

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async ({ _id, payload, options = {} }) => {
  const rawResult = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

// Мы пишем _id в фигурных скобках в строке "ContactCollection.findOneAndUpdate({ _id }, payload, {...options, new: true});" потому, что мы передаём объёкт и когда мы это пишем, это говорит программе, чтоб она нашла объект с таким id; эту строку полностью можно записать как {_id: _id};

export const deleteContact = (filter) => {
  return ContactCollection.findOneAndDelete(filter);
};
