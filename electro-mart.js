//  DEPENDENCIES

const { axios, translate, bot, ENDPOINT_ALT } = require("./settings");
let { lang, BUTTONS } = require("./settings");
let { translateMessage, translateBtn } = require("./utils");

// START MENU

bot.on('/start', (msg) => {

    let userName = String(msg.chat.first_name);
    let replyObject = {
        text: `¡Es hora de empezar 🤖!\n\n¿Cómo puedo ayudarte, ${userName}?`,
        replyMarkup: [ [BUTTONS.products.label, BUTTONS.payment.label],
                       [BUTTONS.delivery.label, BUTTONS.language.label] ]
    }

    // let text = `¡Es hora de empezar 🤖!\n\n¿Cómo puedo ayudarte, ${userName}?`;
    // let replyMarkup = bot.keyboard([ [BUTTONS.products.label, BUTTONS.payment.label],
    //                                  [BUTTONS.delivery.label, BUTTONS.language.label] ], { resize: true });
    return translateMessage(msg, lang, replyObject);

});

//  SHOW PRODUCTS

bot.on('/products', (msg) => {

    async function getProducts() {
        try {
            const response = await axios.get(ENDPOINT_ALT);
            let productos = response.data;
            let resultado = `id  |  Nombre                           |  Precio\n`;
            let len = productos.length;
            let i = 0;
            for (; i < len; i++) {
                resultado += `${productos[i].id}  | ${productos[i].title.substring(0,20)} | $${productos[i].price} \n`;
            }
            return bot.sendMessage(msg.chat.id, ` ${resultado}`);

        } catch (error) {
            console.log(error);
        }
    }

    getProducts();
    let replyMarkup = bot.keyboard([ [BUTTONS.close.label]], { resize: true });

    return bot.sendMessage(msg.from.id, 'Elige tu opción favorita', { replyMarkup });
});

//  SEARCH PRODUCT

bot.on('/buscar', (msg) => {

    let texto="A continuacion introduzca el id del producto que desea consultar";
    
    return bot.sendMessage(msg.chat.id, ' A continuacion introduzca el id del producto que desea consultar', {
        ask: 'id'
    });

})

// SELECT PRODUCT

bot.on('ask.id', msg => {
    const id = Number(msg.text);

    if (!id) {
        return bot.sendMessage(msg.chat.id, 'Introduzca un id valido. Ej: 2', {
            ask: 'id'
        });
    } else {
        async function getProductID(id) {
            const response = await axios.get(ENDPOINT + `/${id}`);
            let producto = response.data;
            let resultado = `id: ${producto.id}\n Nombre: ${producto.title}\n 
            Precio: $${producto.price} \n Descripcion: \n ${producto.description} \n ${producto.image} \n
            Categoria: ${producto.category}\n
            Valoracion: promedio ${producto.rating.rate} de ${producto.rating.count} valoraciones \n`;

            return bot.sendMessage(msg.chat.id, `${resultado}`);
        }
        getProductID(id)
        let replyMarkup = bot.keyboard([
            [BUTTONS.buscarOtro.label],
            [BUTTONS.carrito.label],
            [BUTTONS.close.label]
        ], {
            resize: true
        });
        return bot.sendMessage(msg.chat.id, 'Aqui se encuentra el producto solicitado', {
            replyMarkup
        });
    }
});

// PAYMENT METHODS

bot.on('/pay', (msg) => {

    let text = `Los metodos de pago son: \n
    - Efectivo 

    - Transferencia 

    - Criptomonedas recibidas:
        *BTC
        *ETH
        *USTD`

   return translateMessage(msg, lang, text);
});

// DELIVERY METHODS

bot.on('/deliver', (msg) => {

    bot.sendMessage(msg.from.id, '* función en desarrollo *');
    
});

//  CHANGE BOT LANGUAGE

bot.on('/lang', (msg) => {
    
    // use SWITCH for more languages
    lang == "es" ? lang = "en" : lang = "es";
    console.log(lang);
    translateBtn(); // to end
    
    let replyMarkup = bot.keyboard([ [BUTTONS.switch.label] ], { resize: true });
    // let replyObject = {
        //     text: "Ahora hablamos el mismo idioma 😉",
        // }
        
        let text = "Ahora hablamos el mismo idioma 😉";
        
        // let text = translateMessage(msg, lang, replyObject);
        bot.sendMessage(msg.from.id, text, { replyMarkup });
    
    // translate(BUTTONS.switch.label, {to: lang})
    // .then(res => {
    //     BUTTONS.switch.label = res; 
    //     let replyMarkup = bot.keyboard([ [BUTTONS.switch.label] ], { resize: true });
    //     let text = "Ahora hablamos el mismo idioma 😉";
    //     return translateMessage(msg, lang, text, replyMarkup); 
    // })
    // .catch(err => console.error(err));  
});

// START POLLING UPDATES

bot.start(); // also bot.connect()