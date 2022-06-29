let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
const { API_DATABASE, ENDPOINT_DATABASE, bot } = require("../../settings");



exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
     } = event;
    
let client = await connectDB()
const colUsers = client.db().collection('users');
const colproductos = client.db().collection('productos');






if (method == "POST"){
    let carrito = []
    let call = await API_DATABASE.get(ENDPOINT_DATABASE.adminDB)
    let producto=call.data;
    for (let index = 0; index < 20; index++) {
        carrito[index] = {id: producto[index].id, name: producto[index].name , cantidad: 0, price: producto[index].price};
    }

    try { await colUsers.insertOne({ id: String(p.id), carrito:carrito });
    return output('Usuario Creado Satisfactoriamente')}  catch (error){log (error);}
}

}



