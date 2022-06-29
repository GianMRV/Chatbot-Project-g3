let { log, output } = require('../../utils/utils');
let connectDB = require('../connectDB/connectDB');


exports.handler = async (event) => {
    
    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;

    let client = await connectDB();
    const colproductos = client.db().collection('productos');

    


    if (method == "GET") {

       let { id }=p;

        try {let productos = await colproductos.find({id}).toArray();
             
        return output(productos);}  
        catch (error) {log(error)}

    
    }





}







