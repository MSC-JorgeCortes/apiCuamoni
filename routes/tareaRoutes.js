import express from 'express';
import tareaController from '../controllers/tareaController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// 🔍 GET
router.post('/usuario', tareaController.obtenerTareasDeUsuario);
router.post('/usuario/proximas',tareaController.obtenerTareasProximas);
router.post('/usuario/prueba', tareaController.pruebaObtenerTareasDeUsuario);

// 📝 POST
router.post('/', auth, tareaController.crearTareaManual);

// ✏️ PUT
router.put('/:tareaId/completar', auth, tareaController.completarTarea);

export default router;