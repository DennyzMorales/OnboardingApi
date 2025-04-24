const db = require('../db');

// Crear un nuevo examen de ingreso
const crearExamen = async (req, res) => {
  try {
    const { postulante_id, intento, puntaje, estado } = req.body;

    const result = await db.query(
      `INSERT INTO ExamenIngreso (postulante_id, intento, puntaje, estado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [postulante_id, intento, puntaje, estado]
    );

    res.status(201).json({ mensaje: 'Examen creado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear examen:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todos los exámenes
const obtenerExamenes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ExamenIngreso');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener exámenes:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener exámenes por ID de postulante
const obtenerExamenesPorPostulante = async (req, res) => {
  const { postulante_id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM ExamenIngreso WHERE postulante_id = $1',
      [postulante_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener exámenes por postulante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un examen específico
const actualizarExamen = async (req, res) => {
  const { examen_id } = req.params;
  const { intento, puntaje, estado } = req.body;

  try {
    const result = await db.query(
      `UPDATE ExamenIngreso
       SET intento = $1, puntaje = $2, estado = $3
       WHERE examen_id = $4
       RETURNING *`,
      [intento, puntaje, estado, examen_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Examen no encontrado' });
    }

    res.status(200).json({ mensaje: 'Examen actualizado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar examen:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar un examen (opcional: eliminación física o lógica)
const eliminarExamen = async (req, res) => {
  const { examen_id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM ExamenIngreso WHERE examen_id = $1 RETURNING *',
      [examen_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Examen no encontrado' });
    }

    res.status(200).json({ mensaje: 'Examen eliminado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar examen:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  crearExamen,
  obtenerExamenes,
  obtenerExamenesPorPostulante,
  actualizarExamen,
  eliminarExamen,
};
