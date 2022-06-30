//1,2, 2,3  
//par = producto
//impar = cantidad del producto par anterior

const { output, log } = require("../../utils/utils");
let connectDB = require('../connectDB/connectDB');




exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;


    let client = await connectDB()
    const colUsers = client.db().collection('users');


    if (method == "GET") {
        try {
            let flag=0;
            let { id } = p;
            let user = await colUsers.find({ id }).toArray();
            let carrito = user[0].carrito;
            let resultado = `Carrito de compras  \n`

            for (let index = 0; index < 20; index++) {
                if (carrito[index].cantidad > 0) {
                    flag=1;
                    resultado += `Id: ${carrito[index].id} \n Nombre: ${carrito[index].name} \n Precio: ${carrito[index].price} \n Cantidad: ${carrito[index].cantidad} \n 
                    ----------------------- \n`;
                }
            }

            if(flag==1){return output(resultado);} else { return output ('No se han añadido productos al carrito')}
            
        } catch (error) {
            log(error);
        }

    }

}
