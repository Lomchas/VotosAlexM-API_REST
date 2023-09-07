const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/votaciones-(Alexander_M)-concejo';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
    // Aquí puedes definir modelos y realizar operaciones en la base de datos
  })
  .catch(error => {
    console.error('Error de conexión a la base de datos:', error);
  });
module.exports = mongoose.connection;                   
