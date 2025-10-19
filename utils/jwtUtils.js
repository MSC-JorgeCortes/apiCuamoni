// utils/jwtUtils.js
import { sign, verify, decode } from 'jsonwebtoken';
import { jwt as _jwt } from '../config/environment';
import { AppError } from '../middleware/errorHandler';

const generateToken = (payload) => {
  return sign(payload, _jwt.secret, {
    expiresIn: _jwt.expiresIn
  });
};

const verifyToken = (token) => {
  try {
    return verify(token, _jwt.secret);
  } catch (error) {
    throw new AppError('Token inválido o expirado', 401);
  }
};

const decodeToken = (token) => {
  return decode(token);
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Formato de autorización inválido', 401);
  }
  return authHeader.split(' ')[1];
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
  extractTokenFromHeader
};