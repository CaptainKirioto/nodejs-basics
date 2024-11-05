import { Schema, model } from 'mongoose';
import { genderList } from '../../constants/contacts.js';
import { handleSaveError } from './hooks.js';
import { setUpdateSettings } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      // mongoose validation
      // minLength: 8,
      // maxLength: 16,
    },
    email: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: genderList,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleSaveError);

contactSchema.pre('findOneAndUpdate', setUpdateSettings);

contactSchema.post('findOneAndUpdate', handleSaveError);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
