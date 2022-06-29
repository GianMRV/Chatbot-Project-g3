
let { log, output } = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');


exports.handler = async (event) => {

   let {
      httpMethod: method,
      queryStringParameters: p
   } = event;

   
   let client = await connectDB()
   const colUsers = client.db().collection('users');
  

   if (method == "GET") {

      let { id } = p;
      try {

         let usuario = await colUsers.find({ id }).toArray();
         let verificador;
         if (usuario.length == 0) { verificador = 0 } else { verificador = 1 }
         return output(verificador);

      } catch (error) {log(error);}
   }
}





