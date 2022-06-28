// DEPENDENCIES

const Telebot = require('telebot');
const axios = require('axios');
const translate = require('translate-google');
let connectDB = require('./functions/connectDB/connectDB');


// ENDPOINTS

const ENDPOINT = 'https://fakestoreapi.com/products/category/electronics';
const ENDPOINT_ALT = 'https://api.escuelajs.co/api/v1/categories/2/products?offset=10&limit=20';

// INITIAL LANGUAGE

let lang = 'es';

// KEYBOARD BUTTONS

let BUTTONS = {};

let keys = ["products", "carrito", "info", "buscar", "close", 
            "registrar", "buscarOtro", "verCarrito", "language", "opciones", "pago", "modify",
            "deleteCarrito", "modCarrito", "switch"];

let labels = ["Lista de productos", "Carrito de Compra", "Sobre nosotros", "Elegir producto", "Volver al menu inicial",
              "Crear usuario", "Elegir otro producto", "Ver Carrito de Compra", "Cambiar idioma", "Configuraciones", "Métodos de Pago", "Modificar Correo Asociado",
               "Vaciar Carrito", "Modificar Carrito","/restart"];
              

let commands = ["/products", "/carrito", "/info", "/buscar", "/start",
                "/registrar", "/buscar", "/verCarrito", "/lang", "/opciones", "/pay", "/modify",
                "/vaciarCarrito","/modCarrito",  "/start"];

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