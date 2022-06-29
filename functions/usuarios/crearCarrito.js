let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
let bot = require("../../settings")

async function guardarDatos(msg, id){
let client = await connectDB()
const colUsers = client.db().collection('users');
let mensaje = await msg;
let datos = mensaje.split(',');
const colProductos = client.db().collection('productos')
let data = {};
// Obtener array de productos
for (let index = 0; index < datos.length; index++) {
    let producto = await colProductos.find({id: datos[index]})
    
}
}
/*
let perfil = await colUsers.find({id: id, carro: {$exists: false}}).toArray();

if (perfil === []) {
    await colUsers.updateOne({id: id}, {$set: {carro: {
        
    }}});
    
} else {
    
}

return log(perfil)
}
*/ 
/*
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
*/
module.exports = guardarDatos;
