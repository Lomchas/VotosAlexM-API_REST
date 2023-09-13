require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const db = require('./config/database');
const Voto = require('./models/Voto');


// Conectar a la base de datos
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const voto = await Voto.find();
    res.json(voto);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de votos!' });
  }
})


// Ruta para incrementar un voto
app.post('/votar', async (req, res) => {
  try {
    let voto = await Voto.findOne();

    // Incrementar si o no según el voto recibido en el cuerpo (si y no) de la solicitud
    if (req.body.si == 1) {
      voto.si += 1;

      // Guardar el voto actualizado
      await voto.save();
      res.json({ message: 'Voto registrado correctamente!' })
    }
    else if (req.body.no == 1) {
      voto.no += 1;

      // Guardar el voto actualizado
      await voto.save();
      res.json({ message: 'Voto registrado correctamente!' })
    }
    else if (req.body.si == 0 && req.body.no == 0 && req.body.usuarios[0]) {
      // Incrementar si o no según el voto recibido en el cuerpo (usuarios) de la solicitud
      if (req.body.usuarios[0].voto == 'si') {
        voto.si += 1;
      }
      else if (req.body.usuarios[0].voto == 'no') {
        voto.no += 1;
      }

      // Agregar el usuario al array de usuarios si se proporcionan datos
      if (req.body.usuarios[0]) {
        voto.usuarios.push(req.body.usuarios[0]);
        voto.usuarios_counter += 1;
      }

      // Guardar el voto actualizado
      await voto.save();
      res.json({ message: 'Voto registrado correctamente!' })
    }
    else{
      res.status(400).json({ message: `No hay información para añadir a la base de datos!`})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error al registrar el voto! - ERROR: => ${error}` })
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}, http://localhost:${PORT}/`);
});