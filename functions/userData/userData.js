let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
let bot = require("../../settings")


async function guardarDatos(msg){
    let client = await connectDB()
const colUsers = client.db().collection('users');
let mensaje = await msg;
let datos = mensaje.split(',');



try {
     await colUsers.insertOne({
        correo: datos[0],
        nombre: datos[1] + ' ' + datos[2],
        ciudad: datos[3]
    })
    
} catch (error){
    log (error);
}

}

module.exports = guardarDatos;