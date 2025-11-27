const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

//Configuración de la conexión a la base de datos
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

module.exports = supabase;