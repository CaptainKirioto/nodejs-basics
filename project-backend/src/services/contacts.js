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
