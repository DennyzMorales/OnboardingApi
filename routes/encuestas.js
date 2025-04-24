const express = require('express');
const router = express.Router();
const {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestasPorPostulante,
  actualizarEncuesta,
  eliminarEncuesta
} = require('../controllers/encuestasController');

router.post('/', crearEncuesta);
router.get('/', obtenerEncuestas);
router.get('/:postulante_id', obtenerEncuestasPorPostulante);
router.put('/:encuesta_id', actualizarEncuesta);
router.delete('/:encuesta_id', eliminarEncuesta);

module.exports = router;
