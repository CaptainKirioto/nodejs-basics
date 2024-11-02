import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

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
    new: true,
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
