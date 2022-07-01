const { output, log } = require("../../utils/utils");
let connectDB = require('../connectDB/connectDB');




exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;


    let client = await connectDB()
    const colUsers = client.db().collection('users');


    if (method == "POST") {
        try {
            
            let { id } = p;
            let user = await colUsers.find({ id }).toArray();
            let carrito = user[0].carrito;
            let resultado = `ELECTRO-MART  \n FACTURA \n Carrito de compras\n Cliente: ${user.nombre} ${user.apellido} \n correo: ${user.apellido} \n ciudad: ${user.ciudad}  `
            let precioTotal=0;

            for (let index = 0; index < 20; index++) {
                if (carrito[index].cantidad > 0) {
                    flag=1;
                    precioTotal+=carrito[index].price*carrito[index].cantidad;
                    resultado += `Id: ${carrito[index].id} \n Nombre: ${carrito[index].name} \n Precio: ${carrito[index].price} \n Cantidad: ${carrito[index].cantidad} \n 
                    ----------------------- \n`;
                }
            }

            resultado+=`\n Precio Total = ${precioTotal}`
            if(flag==1){return output(resultado);} else { return output ('No se han añadido productos al carrito')}
            
        } catch (error) {
            log(error);
        }

    }

}