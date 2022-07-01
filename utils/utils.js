// DEPENDENCIES

const { translate, bot } = require('../settings');
let {  yup, keys, labels, BUTTONS } = require('../settings');

// BOT LANGUAGE

function translateMessage (msg, lang, text, replyMarkup, id) {
   
    if(!replyMarkup){
         if (!id){ 
            
            translate(text, {to: lang}).then(res => {
            bot.sendMessage(msg.from.id, res  ) })
            .catch(err => {
                console.error(err)

            });} else {
                
                translate(text, {to: lang}).then(res => {
                bot.sendMessage(msg.from.id, res, {ask: id}  ) })
                .catch(err => {
                console.error(err)})       
       
        }} else {
            
            translate(text, {to: lang}).then(res => {
                
                bot.sendMessage(msg.from.id, res, { replyMarkup }  ) })
                .catch(err => {
                    console.error(err)
                });
                
                
            }
            
        }
    



function translateBtn (lang) {

    let idx = 0, len = labels.length;
    translate(labels, {to: lang})
    .then(res => {
        for (; idx < len - 1 ; idx++){   
            BUTTONS[keys[idx]].label = res[idx];
        }
         
    })
    .catch(err => console.error(err));
}

let log = console.log;

let output = content => ({
    statusCode: 200,
    body: JSON.stringify(content)
});


const schema = yup.object().shape({
    mail: yup.string().email(),
    password: yup.string().min(8).max(15)
});


async function verifica_datos(lang,msg, datos) {
    const num = '0123456789';
    const symbols = '`~!@#$%^&*()_+{}|:"<>?-=[];,./';
    let val = [];
    


    for (let i = 0; i < datos.length; i++){
        if(i == 0){            // Para verificar el correo
            let mail = datos[i];
            let isValid = await schema.isValid({ mail });
            if (isValid){
                // Datos validos
                val.push(1);
            }
            else{
                // Datos invalidos
                val.push(0);
                translateMessage(msg,lang, `Campo 'email' invalido`);
            }
        }
        else if (i == 1){                // Para verificar el nombre
            let name = datos[i];
            for (let j in name){
                if (num.includes(name[j]) || symbols.includes(name[j])){
                    val.push(0);
                    translateMessage(msg,lang, `Campo 'nombre' invalido`);
                }
                else{
                    val.push(1);
                }
            }
        }
        else if (i == 2){           // Para verificar el apellido
            let lastname = datos[i];
            for (let j in lastname){
                if (num.includes(lastname[j]) || symbols.includes(lastname[j])){
                    val.push(0);
                    translateMessage(msg,lang, `Campo 'apellido' invalido`);
                }
                else{
                    val.push(1);
                }
            }
        }
        else if(i==3){                       // Para verificar la ciudad
            let city = datos[i];
            for (let j in city){
                if (num.includes(city[j]) || symbols.includes(city[j])){
                    val.push(0);
                    translateMessage(msg,lang, `Campo 'ciudad' invalido`);
                }
                else{
                    val.push(1);
                }
            }
        } else {
            let pago = datos[i];
            for (let j in pago){
                if (num.includes(pago[j]) || symbols.includes(pago[j])){
                    val.push(0);
                    translateMessage(msg,lang, `Campo 'Método de Pago' invalido`);
                }
                else{
                    val.push(1);
                }
            }
        }
    }

    let isValid = true;
    if (val.includes(0)){
        isValid = false;
        translateMessage(msg,lang, `Oops! Ha ocurrido un error.\nPor favor, ingresa tus datos:`, false, 'datos');
    }

    return isValid

}

module.exports = { translateMessage, translateBtn, log , output, verifica_datos};