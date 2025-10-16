const express = require('express');
const app = express();
const propiedadRoutes = require('./routes/propiedadRoutes');
app.use(express.json());

// Rutas
app.use('/api/propiedades', propiedadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});