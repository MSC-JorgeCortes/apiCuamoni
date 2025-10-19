import express from 'express';
import plantaController from '../controllers/plantaController.js';
import { auth } from '../middleware/auth.js';
import { validarPlanta } from '../middleware/validation.js';

const router = express.Router();

// 🔍 GET
router.get('/usuario/:usuarioId', auth, plantaController.obtenerPlantasUsuario);
router.get('/:plantaId', auth, plantaController.obtenerPlantaDetallada);
router.get('/usuario/:usuarioId/estadisticas', auth, plantaController.obtenerEstadisticas);

// 📝 POST
router.post('/', auth, validarPlanta, plantaController.crearPlanta);
router.post('/:plantaId/crecimiento', auth, plantaController.registrarCrecimiento);

// ✏️ PUT
router.put('/:plantaId', auth, plantaController.actualizarPlanta);

// 🗑️ DELETE
router.delete('/:plantaId', auth, plantaController.eliminarPlanta);

export default router;