const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    cedula: String,
    correo: String,
    voto: String,
})


const votoSchema = new mongoose.Schema({
    si: { type: Number, default: 0},
    no: { type: Number, default: 0},
    usuarios: [usuarioSchema],
    usuarios_counter: {type: Number, default: 0},
},
{
    collection: 'voto',
    versionKey: false,
}
)

module.exports = mongoose.model('voto', votoSchema);