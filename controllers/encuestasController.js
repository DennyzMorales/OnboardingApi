const db = require('../db');

// Crear una nueva encuesta
const crearEncuesta = async (req, res) => {
  try {
    const { postulante_id, calificacion, comentario } = req.body;

    const result = await db.query(
      `INSERT INTO EncuestaSatisfaccion (postulante_id, calificacion, comentario)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [postulante_id, calificacion, comentario]
    );

    res.status(201).json({ mensaje: 'Encuesta creada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear encuesta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todas las encuestas
const obtenerEncuestas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM EncuestaSatisfaccion');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener encuestas:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener encuestas por postulante
const obtenerEncuestasPorPostulante = async (req, res) => {
  const { postulante_id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM EncuestaSatisfaccion WHERE postulante_id = $1',
      [postulante_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener encuestas por postulante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar una encuesta
const actualizarEncuesta = async (req, res) => {
  const { encuesta_id } = req.params;
  const { calificacion, comentario } = req.body;

  try {
    const result = await db.query(
      `UPDATE EncuestaSatisfaccion
       SET calificacion = $1, comentario = $2
       WHERE encuesta_id = $3
       RETURNING *`,
      [calificacion, comentario, encuesta_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Encuesta actualizada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar encuesta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar una encuesta
const eliminarEncuesta = async (req, res) => {
  const { encuesta_id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM EncuestaSatisfaccion WHERE encuesta_id = $1 RETURNING *',
      [encuesta_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Encuesta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Encuesta eliminada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar encuesta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  crearEncuesta,
  obtenerEncuestas,
  obtenerEncuestasPorPostulante,
  actualizarEncuesta,
  eliminarEncuesta,
};
