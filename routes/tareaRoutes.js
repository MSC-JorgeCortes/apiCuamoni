import express from 'express';
import tareaController from '../controllers/tareaController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// 🔍 GET
router.get('/usuario/:usuarioId', auth, tareaController.obtenerTareasUsuario);
router.get('/usuario/:usuarioId/proximas', auth, tareaController.obtenerTareasProximas);

// 📝 POST
router.post('/', auth, tareaController.crearTareaManual);

// ✏️ PUT
router.put('/:tareaId/completar', auth, tareaController.completarTarea);

export default router;