import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { AppError } from './errorHandler.js';
import config from '../config/environment.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new AppError('Acceso denegado. Token no proporcionado.', 401);
    }
  
    const decoded = jwt.verify(token, config.auth.jwt.secret); 
       
    const usuario = await Usuario.findById(decoded.id).select('-password');
    //explicame esta linea 16 
    // Esta línea busca en la base de datos un usuario cuyo ID coincida con el ID decodificado del token JWT.
    // El método select('-password') excluye el campo de la contraseña del usuario para que no sea devuelto ni expuesto.
    // Esto es una medida de seguridad para proteger la información sensible del usuario.
    //pero de donde saco el id decodificado del token jwt?
    
    if (!usuario) {
      throw new AppError('Token inválido - usuario no encontrado', 401);
    }

    if (usuario.estado !== 'activo') {
      throw new AppError('Cuenta desactivada', 401);
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Token inválido', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new AppError('Token expirado', 401));
    } else {
      next(error);
    }
  }
};

export const adminAuth = (req, res, next) => {
  if (req.usuario.rol !== 'administrador') {
    return next(new AppError('Acceso denegado. Se requieren privilegios de administrador.', 403));
  }
  next();
};

export const expertoAuth = (req, res, next) => {
  if (!['experto', 'administrador'].includes(req.usuario.rol)) {
    return next(new AppError('Acceso denegado. Se requieren privilegios de experto.', 403));
  }
  next();
};