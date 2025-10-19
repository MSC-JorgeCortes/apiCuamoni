// utils/passwordUtils.js
import { genSalt, hash, compare } from 'bcryptjs';
import { AppError } from '../middleware/errorHandler';

const hashPassword = async (password) => {
  if (!password || password.length < 6) {
    throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
  }
  
  const salt = await genSalt(12);
  return await hash(password, salt);
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  if (!candidatePassword || !hashedPassword) {
    throw new AppError('Contraseña no proporcionada', 400);
  }
  
  return await compare(candidatePassword, hashedPassword);
};

const validatePasswordStrength = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
};

export default {
  hashPassword,
  comparePassword,
  validatePasswordStrength
};