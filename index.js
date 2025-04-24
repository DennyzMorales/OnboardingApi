const express = require('express');
const app = express();
const postulantesRoutes = require('./routes/postulantes');
const formulariosRouter = require('./routes/formularios')
const cartasRouter = require('./routes/cartas')
const examenesRouter = require('./routes/examenes')
const encuestasRouter = require('./routes/encuestas')
const cors = require('cors');
const port = process.env.PORT || 4000; 

app.use(cors()); // Habilita CORS

// Usamos express.json() para manejar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

app.use('/api/postulantes', postulantesRoutes);
app.use('/api/formularios', formulariosRouter);
app.use('/api/cartas', cartasRouter);
app.use('/api/examenes', examenesRouter);
app.use('/api/encuestas', encuestasRouter);

app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
