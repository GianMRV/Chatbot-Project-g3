//  DEPENDENCIES
const { bot, API_DATABASE, ENDPOINT_DATABASE } = require("./settings");
let { lang, BUTTONS } = require("./settings");
let { verifica_datos, translateMessage, translateBtn, log } = require("./utils/utils");

// START MENU

bot.on('/start', (msg) => {

    async function registro() {
        try { await API_DATABASE.post(ENDPOINT_DATABASE.createUser + `?id=${msg.from.id}`) }
        catch (Error) { console.log(Error) }
    }



    async function verificando() {

        try {

            let call = await API_DATABASE.get(ENDPOINT_DATABASE.findUser + `?id=${msg.from.id}`)
            let verificador = call.data;


            if (verificador == 0) {
                registro();

            } else {

                let userName = String(msg.chat.first_name);
                let replyMarkup = bot.keyboard([
                    [BUTTONS.products.label, BUTTONS.carrito.label],
                    [BUTTONS.info.label, BUTTONS.opciones.label]
                ], { resize: true });

                let text = `¡Es hora de empezar 🤖!\n\n¿Cómo puedo ayudarte?`

                return translateMessage(msg, lang, text, replyMarkup);

            }

        } catch (Error) { console.log(Error) };
    }

    verificando();



});

//  SHOW PRODUCTS

bot.on('/products', (msg) => {

    async function getProducts() {
        try {

            let call = await API_DATABASE.get("http://localhost:8888/adminDB")
            let producto = call.data;
            let resultado = `id  |  Nombre                           |  Precio\n`;
            let len = producto.length;
            for (let i = 0; i < len; i++) {
                resultado += `${producto[i].id}  | ${producto[i].name.substring(0, 20)} | $${producto[i].price} \n`;
            }

            return bot.sendMessage(msg.chat.id, ` ${resultado}`);

        } catch (error) {
            // console.log(error);
        }
    }

    getProducts();
    let replyMarkup = bot.keyboard([
        [BUTTONS.products.label, BUTTONS.buscar.label],
        [BUTTONS.verCarrito.label, BUTTONS.añadirCarrito.label],
        [BUTTONS.close.label]
    ], { resize: true });

    translateMessage(msg, lang, 'Elige tu opción favorita', replyMarkup);
});

//  SEARCH PRODUCT

bot.on('/buscar', (msg) => {

    let texto = "A continuacion introduzca el id del producto que desea consultar";

    return translateMessage(msg, lang, 'A continuacion introduzca el id del producto que desea consultar', false, 'id');


})

// SELECT PRODUCT

bot.on('ask.id', msg => {
    const id = Number(msg.text);

    if (!id || id <= 0 || id > 20) {
        return translateMessage(msg, lang, 'Introduzca un id valido. Ej: 2', false, 'id');

    }

    async function getProductID(id) {

        let call = await API_DATABASE.get(ENDPOINT_DATABASE.getProducts + `?id=${id}`)
        let producto = call.data;

        let resultado = `id: ${producto[0].id}\n Nombre: ${producto[0].name}\n 
        Precio: $${producto[0].price} \n Descripcion: \n ${producto[0].description} \n ${producto[0].image} \n
        Categoria: ${producto[0].category}\n
        Valoracion: promedio ${producto[0].rating.rate} de ${producto[0].rating.count} valoraciones \n`;

        bot.sendMessage(msg.chat.id, `${resultado}`);
    }

    getProductID(id)

    return translateMessage(msg, lang, 'Aqui se encuentra el producto solicitado');



}



);


// DELIVERY METHODS

bot.on('/info', (msg) => {
    console.log('pepe')
    //SE ENVIA UN STICKER QUE DIGA MÉTODOS DE PAGO
    translateMessage(msg, lang, `Los metodos de pago son: \n
    - Efectivo 

    - Transferencia 

    - Criptomonedas recibidas:
        *BTC
        *ETH
        *USTD`);



});

//  CHANGE BOT LANGUAGE

bot.on('/lang', (msg) => {

    // use SWITCH for more languages
    lang == "es" ? lang = "en" : lang = "es";
    console.log(lang);
    translateBtn(lang); // to end

    let replyMarkup = bot.keyboard([[BUTTONS.switch.label]], { resize: true });
    let text = "Ahora hablamos el mismo idioma 😉";


    // let text = translateMessage(msg, lang, replyObject);
    return translateMessage(msg, lang, text, replyMarkup);


});

// BOT OPTIONS
bot.on('/opciones', (msg) => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.modify.label, BUTTONS.language.label],
        [BUTTONS.close.label]
    ], { resize: true });
    translateMessage(msg, lang, 'Presione la opción deseada: ⌨️', replyMarkup);


});


bot.on('/addToCart', (msg) => {

    translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2 \n ESTO VA A SUMAR A LO QUE YA ESTABA, LUCETE', false, 'prod')


});


bot.on('/modCart', (msg) => {

    translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2 \n ESTO VA A SUSTITUIR NO A AÑADIR, LUCETE SEBAS', false, 'mod')


});

bot.on('ask.prod', (msg) => {


    let datos = msg.text.split(',');
    let datosLen = datos.length;
    if (datosLen % 2 != 0) { return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod') }
    let verifyData = datos.map(el => Number(el));

    if (verifyData.includes(NaN)) { return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod') }

    let i = 0;
    while (i < datosLen) {
        if (verifyData[i] <= 0 || verifyData[i] > 20) {
            return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod')
        }
        i += 2;
    }

    async function addItems() {
        try {await API_DATABASE.put(ENDPOINT_DATABASE.addToCart + `?id=${msg.from.id}&msg=${msg.text}`);} 
        catch (error) {console.log(error);}
    }

    addItems();
    return translateMessage(msg, lang, 'Productos añadidos satisfactoriamente');


});


bot.on('ask.mod', (msg) => {

    let datos = msg.text.split(',');
    let datosLen = datos.length;
    if (datosLen % 2 != 0) { return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod') }
    let verifyData = datos.map(el => Number(el));

    if (verifyData.includes(NaN)) { return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod') }

    let i = 0;
    while (i < datosLen) {
        if (verifyData[i] <= 0 || verifyData[i] > 20) {
            return translateMessage(msg, lang, 'Favor Ingresa los productos de la siguiente manera: \n id_producto, cantidad_de_id_producto: 1,2', false, 'prod')
        }
        i += 2;
    }

    async function addItems() {
        try {await API_DATABASE.put(ENDPOINT_DATABASE.modCart + `?id=${msg.from.id}&msg=${msg.text}`);} 
        catch (error) {console.log(error);}
    }

    addItems();
    return translateMessage(msg, lang, 'Carrito modificado satisfactoriamente');


});


bot.on('/registrar', (msg) => {

    
   return translateMessage(msg, lang, 'NO INGRESAR NADA HASTA HABER LLENADO SATISFACTORIAMENTE, PORFAVOR\nFavor Ingrese los datos de la siguiente manera:\n correo@correo.com, nombre, apellido,ciudad', false, 'datos')

})


bot.on('ask.datos', msg => {
    
    let replyMarkup = bot.keyboard([[BUTTONS.close.label]], { resize: true });

    async function revisa() {

        let datos = msg.text.split(',');
        if (datos.length < 4){
            translateMessage(msg,lang, 'Oops!\nCampos invalidos. Por favor, intentalo nuevamente: ',false,'datos');
        }
        else if(datos.length > 4){
            translateMessage(msg,lang, 'Oops!\nCampos invalidos. Por favor, intentalo nuevamente: ',false,'datos');
        }
        else{
            let valida = await verifica_datos(lang,msg,datos);
            if (valida) {
                
                try {await API_DATABASE.put(ENDPOINT_DATABASE.userData+`?id=${msg.from.id}&msg=${msg.text}`)} 
                catch (error) {log(error)}
                translateMessage(msg, lang, 'Sus datos han sido registrados correctamente', replyMarkup)
            }
            else {

                translateMessage(msg,lang, `Oops! Ha ocurrido un error.\nPor favor, ingresa tus datos:`, false,'datos');

            }
        }
    }
    revisa();
})



bot.on('/carrito', (msg) => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.verCarrito.label, BUTTONS.modCarrito.label],
        [BUTTONS.deleteCarrito.label, BUTTONS.close.label]
    ], { resize: true });

    return translateMessage(msg, lang, 'OPCIONES CARRITO', replyMarkup)

})

bot.on('/verCarrito', (msg) => {


    registro();
    translateMessage(msg, lang, 'Carrito de compras actual:')

    async function registro() {
        try {

            let call = await API_DATABASE.get(ENDPOINT_DATABASE.showCart + `?id=${msg.from.id}`)
            let resultado = call.data;

            const replyMarkup = bot.inlineKeyboard([[bot.inlineButton('Crear Factura', {callback: '/factura'})]]);
            return bot.sendMessage(msg.from.id, `${resultado}`, {replyMarkup} );

        }
        catch (Error) { console.log(Error) }
    }

})


bot.on('/factura', (msg) => {

    async function correo() {
        try {

            let call = await API_DATABASE.post(ENDPOINT_DATABASE.sendMail + `?id=${msg.from.id}`)
            let resultado = call.data;
          
            translateMessage(msg,lang, resultado);

        }
        catch (Error) { console.log(Error) }
    }
   
   correo();

// Send message with keyboard markup
    

})






bot.on('/vaciarCarrito', (msg) => {


    vaciar();


    async function vaciar() {
        try {

            await API_DATABASE.put(ENDPOINT_DATABASE.putCart + `?id=${msg.from.id}`)


            return translateMessage(msg, lang, 'Carrito Vaciado Satisfactoriamente');
        }
        catch (Error) { console.log(Error) }
    }

})
// START POLLING UPDATES

bot.start(); // also bot.connect()