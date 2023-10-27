const Paciente = require('./modelado.js'); // Importación del modelo Paciente

const fichaP = {
    // Función para crear un nuevo paciente en la base de datos
    createPaciente: async (req, res) => {
        try {
          const paciente = new Paciente(req.body); // Crea un nuevo objeto Paciente a partir de los datos en la solicitud
          console.log(paciente);
          const pacienteGuardado = await paciente.save(); // Guarda el paciente en la base de datos
          res.status(201).json(pacienteGuardado); // Responde con el paciente creado y un código de estado 201 (Creado)
        } catch (error) {
          res.status(500).json({ error: 'Error al crear el paciente' }); // En caso de error, responde con un error interno del servidor (código 500)
        }
    },
    // Función para obtener la lista de todos los pacientes en la base de datos
    getPacientes: async (req, res) => {
        try {
          const pacientes = await Paciente.find(); // Obtiene todos los pacientes en la base de datos
          res.status(200).json(pacientes); // Responde con la lista de pacientes y un código de estado 200 (Éxito)
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener pacientes' }); // En caso de error, responde con un error interno del servidor (código 500)
        }
    },
    // Función para obtener un paciente por su ID
    getPacienteId: async (req, res) => {
        try {
          const paciente = await Paciente.findById(req.params.id); // Busca un paciente por su ID
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' }); // Si no se encuentra el paciente, responde con un error 404 (No encontrado)
          }
          res.status(200).json(paciente); // Responde con el paciente encontrado y un código de estado 200 (Éxito)
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener el paciente' }); // En caso de error, responde con un error interno del servidor (código 500)
        }
    },
    // Función para actualizar la información de un paciente por su ID
    updatePaciente: async (req, res) => {
        try {
          const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          }); // Actualiza la información del paciente en la base de datos
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' }); // Si no se encuentra el paciente, responde con un error 404 (No encontrado)
          }
          res.status(200).json(paciente); // Responde con el paciente actualizado y un código de estado 200 (Éxito)
        } catch (error) {
          res.status(500).json({ error: 'Error al actualizar el paciente' }); // En caso de error, responde con un error interno del servidor (código 500)
        }
    },
    // Función para eliminar un paciente por su ID
    deletePaciente: async (req, res) => {
        try {
          const paciente = await Paciente.findByIdAndRemove(req.params.id); // Elimina un paciente de la base de datos por su ID
          if (!paciente) {
            return res.status(404).json({ error: 'Paciente no encontrado' }); // Si no se encuentra el paciente, responde con un error 404 (No encontrado)
          }
          res.status(204).send(); // Responde con un código de estado 204 (Sin contenido) para indicar que el paciente fue eliminado con éxito
        } catch (error) {
          res.status(500).json({ error: 'Error al eliminar el paciente' }); // En caso de error, responde con un error interno del servidor (código 500)
        }
    }
};

module.exports = fichaP; // Exporta el objeto fichaP para su uso en otras partes del código
