const express = require('express');
const router = express.Router();
const { crearPostulante } = require('../controllers/postulantesController');
const { obtenerPostulantes } = require('../controllers/postulantesController');
const { obtenerPostulantePorUuid } = require('../controllers/postulantesController');
const { eliminarPostulante } = require("../controllers/postulantesController");
const { actualizarPostulante } = require("../controllers/postulantesController");
// Ruta para crear un postulante
router.post('/', crearPostulante);

// Ruta para obtener todos los postulantes
router.get('/', obtenerPostulantes);
router.get('/:uuid', obtenerPostulantePorUuid);  // Ruta para obtener un postulante por ID
router.delete('/:uuid', eliminarPostulante);  // Eliminar o marcar como eliminado
router.put('/:uuid', actualizarPostulante);  // Actualizar postulante

module.exports = router;
