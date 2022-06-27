// DEPENDENCIES

const { translate, bot } = require('./settings');
let { lang, keys, labels, BUTTONS } = require('./settings');

// BOT LANGUAGE

function translateMessage (msg, lang, text, replyMarkup, id) {
   
    if(!replyMarkup || replyMarkup==false){
         if (!id){ 
            console.log('si');
            translate(text, {to: lang}).then(res => {
            bot.sendMessage(msg.from.id, res  ) })
            .catch(err => {
                console.error(err)

            });} else {
                console.log('no')
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
// translateBtn();

module.exports = { translateMessage, translateBtn };