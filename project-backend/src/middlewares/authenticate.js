import createHttpError from 'http-errors';
import { findSession, findUser } from '../services/auth.js';

// Це middleware виконує 2 задачі:
// 1. Робить усі перелічені нижче перевірки
// 2. Записує в req.user всю інформацію про користувача, що робить запит

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Authorization header is missing'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    return next(createHttpError(401, 'Authorization header must be Bearer'));
  }

  const session = await findSession({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (Date.now > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};
