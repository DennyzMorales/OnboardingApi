const express = require('express');
const router = express.Router();
const {
  crearCarta,
  obtenerCartas,
  obtenerCartasPorPostulante,
  actualizarCarta,
  eliminarCarta
} = require('../controllers/cartasController');

router.post('/', crearCarta);
router.get('/', obtenerCartas);
router.get('/:postulante_id', obtenerCartasPorPostulante);
router.put('/:carta_id', actualizarCarta);
router.delete('/:carta_id', eliminarCarta);

module.exports = router;
