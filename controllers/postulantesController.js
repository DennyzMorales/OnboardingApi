const db = require('../db');

// Crear un postulante
const crearPostulante = async (req, res) => {
  try {
    const { nombre, email, telefono, documento, password, position, department } = req.body;

    const result = await db.query(
      `INSERT INTO Postulantes (nombre, email, telefono, documento, password, position, department)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, email, telefono, documento, password, position, department]
    );

    res.status(201).json({ mensaje: 'Postulante creado', data: result.rows[0] });
  } catch (error) {
    console.error('Error al crear postulante:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todos los postulantes
const obtenerPostulantes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Postulantes');
    res.status(200).json(result.rows); // Devuelve los postulantes en formato JSON
  } catch (error) {
    console.error('Error al obtener postulantes:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const obtenerPostulantePorUuid = async (req, res) => {
    const { uuid } = req.params;  // Obtener el UUID desde la URL
    console.log("UUID recibido:", uuid);  // Verifica que el UUID recibido es el correcto

    try {
      // Consulta para obtener un postulante por su UUID
      const result = await db.query('SELECT * FROM Postulantes WHERE id = $1', [uuid]);
  
      if (result.rows.length === 0) {
        // Si no se encuentra el postulante, devolver un error
        return res.status(404).json({ error: 'Postulante no encontrado' });
      }
  
      // Si se encuentra, devolver el postulante
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener postulante por UUID:', error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
 // Controlador para actualizar un postulante
const actualizarPostulante = async (req, res) => {
    const { uuid } = req.params;  // Obtener el UUID desde la URL
    const { nombre, email, telefono, documento, password, position, department } = req.body;  // Obtener datos desde el cuerpo de la solicitud
  
    try {
      // Verificar si el postulante existe
      const existe = await db.query('SELECT * FROM Postulantes WHERE id = $1', [uuid]);
      if (existe.rows.length === 0) {
        return res.status(404).json({ error: 'Postulante no encontrado' });
      }
  
      // Actualizar los datos del postulante
      const result = await db.query(`
        UPDATE Postulantes
        SET nombre = $1, email = $2, telefono = $3, documento = $4, password = $5, position = $6, department = $7
        WHERE id = $8 RETURNING *`,
        [nombre, email, telefono, documento, password, position, department, uuid]
      );
  
      res.status(200).json({ mensaje: 'Postulante actualizado', data: result.rows[0] });
    } catch (error) {
      console.error('Error al actualizar postulante:', error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
   
// Controlador para eliminar o marcar como eliminado un postulante
const eliminarPostulante = async (req, res) => {
    const { uuid } = req.params;  // Obtener el UUID desde la URL
  
    try {
      // Verificar si el postulante existe
      const existe = await db.query('SELECT * FROM Postulantes WHERE id = $1', [uuid]);
      if (existe.rows.length === 0) {
        return res.status(404).json({ error: 'Postulante no encontrado' });
      }
  
      // Marcar como eliminado (cambiar el estado 'eliminado' a verdadero)
      const result = await db.query(`
        UPDATE Postulantes
        SET eliminado = TRUE
        WHERE id = $1 RETURNING *`,
        [uuid]
      );
  
      res.status(200).json({ mensaje: 'Postulante marcado como eliminado', data: result.rows[0] });
    } catch (error) {
      console.error('Error al eliminar postulante:', error.message);
      res.status(500).json({ error: 'Error del servidor' });
    }
  };
  
module.exports = { crearPostulante, obtenerPostulantes,obtenerPostulantePorUuid,eliminarPostulante,actualizarPostulante };
