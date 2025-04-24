const db = require('../db');

// Crear una carta de compromiso
const crearCarta = async (req, res) => {
  try {
    const { postulante_id, enlace_descarga, archivo_subido } = req.body;

    const result = await db.query(
      `INSERT INTO CartaCompromiso (postulante_id, enlace_descarga, archivo_subido)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [postulante_id, enlace_descarga, archivo_subido]
    );

    res.status(201).json({ mensaje: 'Carta creada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear carta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todas las cartas de compromiso
const obtenerCartas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM CartaCompromiso');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener cartas:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener cartas por ID de postulante
const obtenerCartasPorPostulante = async (req, res) => {
  const { postulante_id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM CartaCompromiso WHERE postulante_id = $1',
      [postulante_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener cartas por postulante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar una carta
const actualizarCarta = async (req, res) => {
  const { carta_id } = req.params;
  const { enlace_descarga, archivo_subido } = req.body;

  try {
    const result = await db.query(
      `UPDATE CartaCompromiso
       SET enlace_descarga = $1, archivo_subido = $2
       WHERE carta_id = $3
       RETURNING *`,
      [enlace_descarga, archivo_subido, carta_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Carta actualizada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar carta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar una carta
const eliminarCarta = async (req, res) => {
  const { carta_id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM CartaCompromiso WHERE carta_id = $1 RETURNING *',
      [carta_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Carta no encontrada' });
    }

    res.status(200).json({ mensaje: 'Carta eliminada', data: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar carta:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  crearCarta,
  obtenerCartas,
  obtenerCartasPorPostulante,
  actualizarCarta,
  eliminarCarta,
};
