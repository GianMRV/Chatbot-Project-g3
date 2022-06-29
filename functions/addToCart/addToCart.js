let { log, output } = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');


exports.handler = async (event) => {

   let {
      httpMethod: method,
      queryStringParameters: p
   } = event;

   let client = await connectDB()
   const colUsers = client.db().collection('users');


   if (method == "PUT") {
      try {

         let {msg} = p;
         let {id} = p;
         
         let mensaje = msg;
         let datos = mensaje.split(',');
         let user = await colUsers.find({ id }).toArray();
         let carrito = user[0].carrito;
         let i = 0;

         

         //carrito[valorpar].cantidad:valorimpar
         for (; i < datos.length; i+2) {
            carrito[datos[i] - 1].cantidad +=  datos[i + 1];
         }
         
         //await colUsers.updateOne({ id: String(p.id)},{$set: {carrito:carrito}} )
         return output(carrito[4].cantidad)  
         
      } catch (error) {
         log(error);
      }

   }

}