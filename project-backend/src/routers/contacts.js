import { Router } from 'express';
import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

// ---- Creating Routes ---- //

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:id',
  ctrlWrapper(contactsControllers.getContactByIdController),
);

//contactsRouter.get('/:id', async(req, res, next => {
// try {
// await contactsControllers.getContactByIdController(req, res, next);
// } catch (error) {
// next(error)}
// });

export default contactsRouter;
