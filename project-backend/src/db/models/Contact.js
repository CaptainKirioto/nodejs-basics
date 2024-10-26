import { Schema, model } from 'mongoose';

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
    enum: ['f', 'm'],
    required: true,
  },
});

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
