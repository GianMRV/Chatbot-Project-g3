let { log, output } = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');
const { API_DATABASE, ENDPOINT_DATABASE } = require("../../settings");


exports.handler = async (event) => {

   let {
      httpMethod: method,
      queryStringParameters: p
   } = event;

   
   let client = await connectDB()
   const colUsers = client.db().collection('users');
  

   if (method == "PUT") {

      let carrito = []
      let call = await API_DATABASE.get(ENDPOINT_DATABASE.adminDB)
      let producto=call.data;
      for (let index = 0; index < 20; index++) {
          carrito[index] = {id: producto[index].id, name: producto[index].name , cantidad: 0, price: producto[index].price};
      }

         try { await colUsers.updateOne({ id: String(p.id)},{$set: {carrito:carrito}} )
         return output('Carrito vaciado satisfactoriamente');
         }catch (error) {log(error);}
          

      } 

   }
