let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
let bot = require("../../settings")

async function encontrarUsuario(id){
    
    
        let client = await connectDB()
    const colUsers = client.db().collection('users');
    
    let usuario =  await colUsers.find({id:id}).toArray()
    let verificador;
    
    if (usuario.length==0){verificador = 0 } else { verificador = 1}
    
    return verificador;

    
    }
    
    module.exports = encontrarUsuario;