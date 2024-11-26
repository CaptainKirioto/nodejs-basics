import { Router } from 'express';
import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { contactsAddSchema } from '../validation/contacts.js';
import { contactsUpdateSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();

// ---- Creating Routes ---- //

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);
// 👇🏽 mechanism of ctrlWrapper

//contactsRouter.get('/:id', async(req, res, next => {
// try {
// await contactsControllers.getContactByIdController(req, res, next);
// } catch (error) {
// next(error)}
// });

// на випадок, якщо файли у декількох полях -- "upload.fields([{name: "poster", maxCount: 10}, {name: "subposter", maxCount: 3}])"
// на випадок, якщо файлів більше одного -- "upload.array("poster", 10)" -- очікуй в полі постер масив до 10 файлів
contactsRouter.post(
  '/',
  upload.single('poster'), // очікуй 1 файл в полі постер, все інше -- текст
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsControllers.addContactController),
);
// 👇🏽 mechanism of validateBody

// contactsRouter.post(
//   '/',
//   (req, res, next) => {
//     const { error } = contactsAddSchema.validate(req.body, {
//       abortEarly: false,
//     });
//     if (error) {
//       return next(createHttpError(404, error.message));
//     }
//     next();
//   },
//   ctrlWrapper(contactsControllers.addContactController),
// );

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsControllers.upsertContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactsControllers.patchContactController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController),
);

export default contactsRouter;
