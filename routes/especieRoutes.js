// routes/especieRoutes.js
import express from 'express';
import especieController from '../controllers/especieController.js';
import { auth } from '../middleware/auth.js';
import { validarEspecie, validarCuidados } from '../middleware/validation.js';

const router = express.Router();

// 🔍 GET - Obtener recursos (consultas)
router.get('/', especieController.obtenerTodasEspecies);
router.get('/buscar', especieController.buscarEspecies);
router.get('/{id}', especieController.obtenerEspeciePorId);
router.get('/estadisticas', especieController.obtenerEstadisticasEspecies);
router.get('/categorias', especieController.obtenerCategorias);
router.get('/:especieId', especieController.obtenerEspecieDetallada);
router.get('/familia/:familia', especieController.obtenerEspeciesPorFamilia);
router.get('/origen/:origen', especieController.obtenerEspeciesPorOrigen);
router.get('/cuidados/:especieId/edad/:edadMeses', especieController.obtenerCuidadosPorEdad);
router.get('/:especieId/plantas-registradas', especieController.obtenerPlantasRegistradas);

// 📝 POST - Crear nuevos recursos
router.post('/', 
  auth,
  validarEspecie,
  especieController.crearEspecie
);
router.post('/:especieId/cuidados', 
  auth,
  validarCuidados,
  especieController.agregarCuidadosEspecie
);
router.post('/:especieId/fotos', 
  auth,
  especieController.agregarFotoEspecie
);

// ✏️ PUT - Actualizar recursos existentes
router.put('/:especieId', 
  auth,
  especieController.actualizarEspecie
);
router.put('/:especieId/cuidados/:cuidadoId', 
  auth,
  especieController.actualizarCuidados
);
router.put('/:especieId/estado-conservacion', 
  auth,
  especieController.actualizarEstadoConservacion
);

// 🗑️ DELETE - Eliminar recursos
router.delete('/:especieId', auth,
  especieController.eliminarEspecie
);
router.delete('/:especieId/fotos/:fotoId', auth,
  especieController.eliminarFotoEspecie
);
router.delete('/:especieId/cuidados/:cuidadoId', auth,
  especieController.eliminarCuidados
);

// 🔄 PATCH - Actualizaciones específicas
router.patch('/:especieId/nombres', auth,
  especieController.actualizarNombres
);
router.patch('/:especieId/descripcion', auth,
  especieController.actualizarDescripcion
);
router.patch('/:especieId/requisitos', auth,
  especieController.actualizarRequisitos
);

export default router;