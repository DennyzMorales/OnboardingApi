const express = require('express');
const router = express.Router();
const {
  crearExamen,
  obtenerExamenes,
  obtenerExamenesPorPostulante,
  actualizarExamen,
  eliminarExamen
} = require('../controllers/examenesController');

router.post('/', crearExamen);
router.get('/', obtenerExamenes);
router.get('/:postulante_id', obtenerExamenesPorPostulante);
router.put('/:examen_id', actualizarExamen);
router.delete('/:examen_id', eliminarExamen);

module.exports = router;
