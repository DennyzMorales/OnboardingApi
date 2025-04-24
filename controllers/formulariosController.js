const db = require('../db');

// Crear un formulario de postulación
const crearFormulario = async (req, res) => {
  try {
    const { postulante_id, campo_extra1, campo_extra2, archivo_cv } = req.body;

    const result = await db.query(
      `INSERT INTO FormularioPostulacion (postulante_id, campo_extra1, campo_extra2, archivo_cv)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [postulante_id, campo_extra1, campo_extra2, archivo_cv]
    );

    res.status(201).json({ mensaje: 'Formulario creado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear formulario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todos los formularios
const obtenerFormularios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM FormularioPostulacion');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener formularios:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener un formulario por ID
const obtenerFormularioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM FormularioPostulacion WHERE formulario_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener formulario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un formulario
const actualizarFormulario = async (req, res) => {
  const { id } = req.params;
  const { campo_extra1, campo_extra2, archivo_cv } = req.body;

  try {
    const result = await db.query(
      `UPDATE FormularioPostulacion 
       SET campo_extra1 = $1, campo_extra2 = $2, archivo_cv = $3 
       WHERE formulario_id = $4 
       RETURNING *`,
      [campo_extra1, campo_extra2, archivo_cv, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Formulario actualizado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al actualizar formulario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar un formulario
const eliminarFormulario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM FormularioPostulacion WHERE formulario_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Formulario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Formulario eliminado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar formulario:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
// Obtener formularios por UUID del postulante
const obtenerFormularioPorPostulante = async (req, res) => {
  const { postulante_id } = req.params;

  try {
    const result = await db.query(
      'SELECT * FROM FormularioPostulacion WHERE postulante_id = $1',
      [postulante_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró formulario para ese postulante' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener formulario por postulante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  crearFormulario,
  obtenerFormularios,
  obtenerFormularioPorId,
  obtenerFormularioPorPostulante,
  actualizarFormulario,
  eliminarFormulario,
};
