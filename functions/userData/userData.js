let {log, output} = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');



exports.handler = async (event) => {

   let {
      httpMethod: method,
      queryStringParameters: p
   } = event;

   
   let client = await connectDB()
   const colUsers = client.db().collection('users');
   
   if (method == "PUT") {
       
       let {id} =p;
       let {msg} = p;
       let datos=msg.split(',');
       

      try {
          
        await colUsers.updateOne({ id: String(p.id)},{$set: {correo:datos[0], nombre:datos[1], apellidos:datos[2], ciudad:datos[3]    }    } )
        return output('works');
         

      } catch (error) {log(error);}
   }
}


