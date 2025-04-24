const express = require('express');
const router = express.Router();
const {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorPostulante,
  actualizarFormulario,
  eliminarFormulario,
  obtenerFormularioPorId
} = require('../controllers/formulariosController');

router.post('/', crearFormulario);
router.get('/', obtenerFormularios);
router.get('/:postulante_uuid', obtenerFormularioPorPostulante);
router.put('/:postulante_id', actualizarFormulario);
router.put('/:postulante_id', obtenerFormularioPorId);
router.delete('/:postulante_id', eliminarFormulario);


module.exports = router;
