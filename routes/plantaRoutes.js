import express from 'express';
import plantaController from '../controllers/plantaController.js';
import { auth } from '../middleware/auth.js';
import { validarPlanta } from '../middleware/validation.js';

const router = express.Router();

// 🔍 GET

router.get('/usuario/:usuarioId', plantaController.obtenerPlantasUsuario);
router.get('/:plantaId', plantaController.obtenerPlantaDetallada);
router.get('/usuario/:usuarioId/estadisticas', plantaController.obtenerEstadisticas);

// 📝 POST
router.post('/', plantaController.crearPlanta);
router.post('/:plantaId/crecimiento', plantaController.registrarCrecimiento);

// ✏️ PUT
router.put('/:plantaId', plantaController.actualizarPlanta);

// 🗑️ DELETE
router.delete('/:plantaId', plantaController.eliminarPlanta);

export default router;