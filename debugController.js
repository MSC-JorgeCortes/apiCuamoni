// debugController.js
import usuarioController from './controllers/usuarioController.js';

console.log('🔍 Métodos disponibles en usuarioController:');
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(usuarioController)));
console.log('desconectarRedSocial existe:', typeof usuarioController.desconectarRedSocial);