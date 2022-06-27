//  DEPENDENCIES


const { axios, translate, bot, ENDPOINT_ALT, ENDPOINT } = require("./settings");
let { lang, BUTTONS } = require("./settings");
let { translateMessage, translateBtn, log } = require("./utils/utils");
let getCollection = require("./functions/getProductos/getProductos");


// START MENU

bot.on('/start', (msg) => {

    let userName = String(msg.chat.first_name);

    let replyMarkup = bot.keyboard([
        [BUTTONS.products.label, BUTTONS.carrito.label],
        [BUTTONS.info.label, BUTTONS.opciones.label]
    ], { resize: true });

    let text = `¡Es hora de empezar 🤖!\n\n¿Cómo puedo ayudarte?`

    return translateMessage(msg, lang, text, replyMarkup);

});

//  SHOW PRODUCTS

bot.on('/products', (msg) => {

    async function getProducts() {
        try {
            let producto = await getCollection('Productos', {});
            let resultado=`id  |  Nombre                           |  Precio\n`;
            let len = producto.length;
            for (let i = 0; i < len; i++) {
                resultado+= `${producto[i].id}  | ${producto[i].name.substring(0, 20)} | $${producto[i].price} \n`;
            }
            return bot.sendMessage(msg.chat.id, ` ${resultado}`);

        } catch (error) {
            console.log(error);
        }
    }

    getProducts();
    let replyMarkup = bot.keyboard([[BUTTONS.close.label, BUTTONS.buscar.label]], { resize: true });

    return translateMessage(msg, lang, 'Elige tu opción favorita', replyMarkup);
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


        const producto = await getCollection('Productos', {id: id});
        let resultado = `id: ${producto[0].id}\n Nombre: ${producto[0].name}\n 
        Precio: $${producto[0].price} \n Descripcion: \n ${producto[0].description} \n ${producto[0].image} \n
        Categoria: ${producto[0].category}\n
        Valoracion: promedio ${producto[0].rating.rate} de ${producto[0].rating.count} valoraciones \n`;

        bot.sendMessage(msg.chat.id, `${resultado}`);
    }

    getProductID(id)
    let replyMarkup = bot.keyboard([
        [BUTTONS.buscarOtro.label],
        [BUTTONS.carrito.label],
        [BUTTONS.close.label]
    ], {
        resize: true
    });
    return translateMessage(msg, lang, 'Aqui se encuentra el producto solicitado', replyMarkup);



}



);



// PAYMENT METHODS



// DELIVERY METHODS

bot.on('/info', (msg) => {

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


bot.on('/opciones', (msg) => {

    let replyMarkup = bot.keyboard([
        [BUTTONS.modify.label, BUTTONS.language.label],
        [BUTTONS.close.label]
    ], { resize: true });
   translateMessage(msg, lang, 'Presione la opción deseada: ⌨️', replyMarkup);


});



// START POLLING UPDATES

bot.start(); // also bot.connect()