let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
let bot = require("../../settings")

async function guardarDatos(msg, id){
let client = await connectDB()
const colUsers = client.db().collection('users');
let mensaje = await msg;
let datos = mensaje.split(',');

try {
     await colUsers.insertOne({
        carrito:{
            productos:
            cantidades
        }
    })
    return log(mensaje)
} catch (error){
    log (error);
}

}

module.exports = guardarDatos;
