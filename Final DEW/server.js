// Importación de módulos necesarios
const express = require('express'); // Express.js para el servidor web
const mongoose = require('mongoose'); // Mongoose para la interacción con MongoDB
const { Auth, isAuthenticated } = require('./auth.js'); // Módulo de autenticación
const fichaP = require('./controlador.js'); // Módulo de controlador

// Creación de una instancia de Express
const app = express();
app.use(express.json()); // Habilita el uso de JSON en las solicitudes
const port = 5000; // Puerto en el que se ejecutará el servidor

// Función asincrónica para conectar a la base de datos MongoDB
async function conectarDB() {
  try {
    await mongoose.connect(`mongodb://Jefferson10:alex123@mongoSDK:27017/ExfinalDW?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB con Mongoose');
  } catch (error) {
    console.error('Error al conectar a MongoDB con Mongoose:', error);
  }
}
conectarDB(); // Llamada para conectar a la base de datos al iniciar el servidor

// Rutas y controladores
app.post('/registrar-usuario', Auth.register); // Ruta para registrar un usuario
app.post('/login', Auth.login); // Ruta para iniciar sesión
app.post('/create-paciente', fichaP.createPaciente); // Ruta para crear un paciente
app.get('/get-pacientes', fichaP.getPacientes); // Ruta para obtener la lista de pacientes
app.get('/get-paciente/:id', fichaP.getPacienteId); // Ruta para obtener un paciente por ID
app.put('/update-paciete/:id', fichaP.updatePaciente); // Ruta para actualizar la información de un paciente
app.delete('/delete-paciente/:id', fichaP.deletePaciente); // Ruta para eliminar un paciente

// Middleware para servir archivos estáticos (por ejemplo, archivos HTML, CSS, JS)
app.use(express.static(`${__dirname}/public`));

// Ruta principal que sirve un archivo HTML
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// Manejo de rutas no encontradas (404)
app.get('*', (req, res) => {
  res.status(404).send('404 not found');
});

// Inicio del servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
