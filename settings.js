// DEPENDENCIES

const Telebot = require('telebot');
const axios = require('axios');
const translate = require('translate-google');
let connectDB = require('../chat-bot/functions/connectDB/connectDB');


// ENDPOINTS

const ENDPOINT = 'https://fakestoreapi.com/products/category/electronics';
const ENDPOINT_ALT = 'https://api.escuelajs.co/api/v1/categories/2/products?offset=10&limit=20';

// INITIAL LANGUAGE

let lang = 'es';

// KEYBOARD BUTTONS

let BUTTONS = {};

let keys = ["products", "payment", "delivery", "buscar", "close", 
            "carrito", "buscarOtro", "verCarrito", "language", "switch"];

let labels = ["Lista de productos", "Métodos de pago", "Métodos de entrega", "Elegir producto", "Volver al menu inicial",
              "Agregar al carrito", "Elegir otro producto", "Ver carrito", "Cambiar idioma", "/restart"];

let commands = ["/products", "/pay", "/deliver", "/buscar", "/start",
                "/carrito", "/buscar", "/verCarrito", "/lang", "/start"];

let idx = 0, keysLen = keys.length;
for (; idx < keysLen ; idx++) {
    BUTTONS[keys[idx]] = { label: labels[idx], command: commands[idx] };
}

// BOT SETTINGS

const bot = new Telebot({
    token: '5573269354:AAGYsm48IfrPZal9EnhfMJ6qiM2hMVnPcLI',
    usePlugins: ['namedButtons', 'askUser'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});

module.exports = { axios, translate, Telebot, bot, ENDPOINT, lang, 
                   BUTTONS, keys, labels, commands, ENDPOINT_ALT, connectDB};