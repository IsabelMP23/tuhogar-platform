const express = require('express');
const cors = require('cors');
const app = express();
const propiedadRoutes = require('./routes/propiedadRoutes');
const usuarioRoutes = require('./routes/usuariosRoutes');
const contactosRoutes = require('./routes/contactosRoutes');
const serviciosRoutes = require('./routes/serviciosRoutes');
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contactos', contactosRoutes);
app.use('/api/servicios', serviciosRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});