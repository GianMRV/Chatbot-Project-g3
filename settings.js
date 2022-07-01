// DEPENDENCIES

const Telebot = require('telebot');
const axios = require('axios');
const translate = require('translate-google');
let connectDB = require('./functions/connectDB/connectDB');
let yup = require("yup");
let nodeMailer = require("nodemailer")
// INITIAL LANGUAGE

let lang = 'es';

// KEYBOARD BUTTONS

let BUTTONS = {};

let keys = ["products", "carrito", "info", "buscar", "close", 
            "registrar", "factura", "verCarrito", "language", "opciones", "pago", "modify",
            "deleteCarrito", "modCarrito","añadirCarrito", "switch"];

let labels = ["Lista de productos", "Carrito de Compra", "Sobre nosotros", "Elegir producto", "Volver al menu inicial",
              "Crear usuario", "Crear Factura", "Ver Carrito de Compra", "Cambiar idioma", "Configuraciones", "Métodos de Pago", "Modificar Correo Asociado",
               "Vaciar Carrito", "Modificar Carrito", "Añadir Productos al Carrito", "/restart"];
              

let commands = ["/products", "/carrito", "/info", "/buscar", "/start",
                "/registrar", "/factura", "/verCarrito", "/lang", "/opciones", "/pay", "/modify",
                "/vaciarCarrito","/modCart", "/addToCart",  "/start"];

let idx = 0, keysLen = keys.length;

for (; idx < keysLen ; idx++) {
    BUTTONS[keys[idx]] = { label: labels[idx], command: commands[idx] };
}

// BOT SETTINGS

const bot = new Telebot({
    token: '5573269354:AAG0Z4nfZAvq-g41dtHavn0yDsTg5DYTtcM',
    usePlugins: ['namedButtons', 'askUser', 'commandButton'],
    pluginConfig: {
        namedButtons: {
            buttons: BUTTONS
        }
    }
});


// Instancia Axios para la base de datos
const API_DATABASE = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 10000,
  });



//  ENDPOINTS
const ENDPOINT_DATABASE = {

    connectDB:"/connectDB",
    findUser:"/findUser",
    createUser:"/createUser",
    getProducts:"/getProducts",
    adminDB:"/adminDB",
    deleteCart:"/putCart",
    showCart:"/showCart",
    addToCart:"/addToCart",
    putCart:"/putCart",
    modCart:"/modCart",
    userData:"/userData",
    createTicket:"/createTicket",
    sendMail:"/sendMail"

}













module.exports = { axios, translate, Telebot, bot, lang, 
                   BUTTONS, keys, labels, commands,  connectDB, API_DATABASE, ENDPOINT_DATABASE, yup, nodeMailer};