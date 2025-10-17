const express = require('express');
const app = express();
const propiedadRoutes = require('./routes/propiedadRoutes');
const usuarioRoutes = require('./routes/usuariosRoutes');
const contactosRoutes = require('./routes/contactosRoutes');
app.use(express.json());

// Rutas
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contactos', contactosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});