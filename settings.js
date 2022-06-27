// DEPENDENCIES

const Telebot = require('telebot');
const axios = require('axios');
const translate = require('translate-google');

// ENDPOINTS

const ENDPOINT = 'https://fakestoreapi.com/products/category/electronics';
const ENDPOINT_ALT = 'https://api.escuelajs.co/api/v1/categories/2/products?offset=10&limit=20';

// INITIAL LANGUAGE

let lang = 'es';

// KEYBOARD BUTTONS

let BUTTONS = {};

let keys = ["products", "payment", "delivery", "buscar", "close", 
            "carrito", "buscarOtro", "verCarrito", "language", "switch"];

let labels = ["Lista de productos", "Métodos de pago", "Métodos de entrega", "Elegir producto", "Cerrar",
              "Agregar al carrito", "Elegir otro producto", "Ver carrito", "Cambiar idioma", "/restart"];

let commands = ["/products", "/pay", "/deliver", "/buscar", "/start",
                "/carrito", "/buscar", "/verCarrito", "/lang", "/start"];

let idx = 0, keysLen = keys.length;
for (; idx < keysLen ; idx++) {
    BUTTONS[keys[idx]] = { label: labels[idx], command: commands[idx] };
}

// BOT SETTINGS

const bot = new Telebot({
    token: '5388284212:AAHmEF3VaQ12caV7U1QhDwXD1jT19yEsqZw',
    usePlugins: ['namedButtons', 'askUser'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

module.exports = { axios, translate, Telebot, bot, ENDPOINT_ALT, lang, 
                   BUTTONS, keys, labels, commands };