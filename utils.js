// DEPENDENCIES

const { translate, bot } = require('./settings');
let { lang, keys, labels, BUTTONS } = require('./settings');

// BOT LANGUAGE

function translateMessage (msg, lang, trans) {
    
    if (trans.replyMarkup) {

        translate(trans, {to: lang})
        .then(res => {
            // translateBtn();
            let replyMarkup = bot.keyboard(res.replyMarkup, { resize: true });
            bot.sendMessage(msg.from.id, res.text, { replyMarkup });
        })
        .catch(err => console.error(err));

    } else {

        translate(trans, {to: lang})
        .then(res => res.text)
        .catch(err => console.error(err));
    }
    

    // if (!replyMarkup) {

    //     translate(trans, {to: lang})
    //     .then(res => bot.sendMessage(msg.from.id, res))
    //     .catch(err => console.error(err)); 

    // } else {
    //     translate(trans, {to: lang})
    //     .then(res => bot.sendMessage(msg.from.id, res, { replyMarkup }))
    //     .catch(err => console.error(err));
    // }
}

function translateBtn () {

    translate(labels, {to: lang})
    .then(res => {
        let idx = 0, len = labels.length;
        for (; idx < len - 1 ; idx++){   
            BUTTONS[keys[idx]].label = res[idx];
        }
        // console.log(BUTTONS);
    })
    .catch(err => console.error(err));
}
// translateBtn();

module.exports = { translateMessage, translateBtn };