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
         try { await colUsers.updateOne({ id: String(p.id)},{$set: {carrito:[]}} )}catch (error) {log(error);}
         return output('Carro')  

      } 

   }
