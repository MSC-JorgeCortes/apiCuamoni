// routes/usuarioRoutes.js
import express from 'express';
import usuarioController from '../controllers/usuarioController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Nueva ruta para registro de usuario
router.post('/registro', usuarioController.registrarUsuario);

// 🔗 Rutas de Redes Sociales
router.post('/:usuarioId/redes-sociales/conectar', usuarioController.conectarRedSocial);
router.delete('/:usuarioId/redes-sociales/:redSocial', auth, usuarioController.desconectarRedSocial);
router.put('/:usuarioId/redes-sociales/configuracion', auth, usuarioController.configurarPublicacionAutomatica);
router.post('/:usuarioId/redes-sociales/publicar', auth, usuarioController.publicarEnRedes);
router.get('/:usuarioId/redes-sociales/estadisticas', auth, usuarioController.obtenerEstadisticasRedes);

// 👤 Rutas básicas de usuario
router.get('/:usuarioId', usuarioController.obtenerUsuario);
router.put('/:usuarioId', auth, usuarioController.actualizarUsuario);
router.get('/:usuarioId/plantas', auth, usuarioController.obtenerPlantasUsuario);
router.get('/:usuarioId/estadisticas', auth, usuarioController.obtenerEstadisticas);

export default router;