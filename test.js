bot.on('/lang', (msg) => {
    
    // switch for more languages
    lang == "es" ? lang = "en" : lang = "es";
    translateBtn(BUTTONS, lang);
    // remove line on deploy
    
    translate(BUTTONS.switch.label, {to: lang})
    .then(res => {
        BUTTONS.switch.label = res; 
        let replyMarkup = bot.keyboard([ [BUTTONS.switch.label] ], { resize: true });
        let msgLang = "Ahora hablamos el mismo idioma 😉";
        console.log(BUTTONS[keys[0]].label)
        return parseMessage(lang, msgLang, msg, replyMarkup); 
    })
    .catch(err => console.error(err));    
    
    console.log(lang);
});

function parseMessage (lang, text, msg, replyMarkup) {

    if(!replyMarkup){
        
        translate(text, {to: lang})
        .then(res => { bot.sendMessage(msg.from.id, res) })
        .catch(err => { console.error(err)});

    } else {
        
        translate(text, {to: lang})
        .then(res => { bot.sendMessage(msg.from.id, res, { replyMarkup }) })
        .catch(err => { console.error(err) });
   
    }
}

function translateBtn (BUTTONS, lang) {

    let idx = 0, len = keys.length;
    for (; idx < len - 1 ; idx++) {
        translate(BUTTONS[keys[idx]].label, {to: lang})
        .then(res => { BUTTONS[keys[idx]].label = res; })
        .catch(err => { console.error(err); });
    }

    // pass lang buttons text and msg. inside the translation then, set the replymarkup

    // translate(BUTTONS.products.label, {to: lang})
    // .then(res => { BUTTONS.products.label = res; })
    // .catch(err => { console.error(err); });

    // translate(BUTTONS.language.label, {to: lang})
    // .then(res => { BUTTONS.language.label = res; })
    // .catch(err => { console.error(err); });

    // translate(BUTTONS.payment.label, {to: lang})
    // .then(res => { BUTTONS.payment.label = res; })
    // .catch(err => { console.error(err); });

    // translate(BUTTONS.delivery.label, {to: lang})
    // .then(res => { BUTTONS.delivery.label = res; })
    // .catch(err => { console.error(err); });

    // translate(BUTTONS.carrito.label, {to: lang})
    // .then(res => { BUTTONS.carrito.label = res; })
    // .catch(err => { console.error(err); });

    // translate(BUTTONS.buscar.label, {to: lang})
    // .then(res => { BUTTONS.buscar.label = res; })
    // .catch(err => { console.error(err); });
    
    // translate(BUTTONS.close.label, {to: lang})
    // .then(res => { BUTTONS.close.label = res; })
    // .catch(err => { console.error(err); }); 
                
    // translate(BUTTONS.buscarOtro.label, {to: lang})
    // .then(res => { BUTTONS.buscarOtro.label = res; })
    // .catch(err => { console.error(err); }); 
}


var opts ={
    reply_markup: {
        inline_keyboard: [
            [{text:"지옥문", url: "http://masca.dothome.co.kr/"}],
            [{text:"엔더월드 가는법", callback_data: "2"}],
            [{text:"TNT 만드는법", callback_data: "3"}],
            [{text:"케이크 만드는법", callback_data: "4"}],
            [{text:"황금사과 만드는법", callback_data: "5"}],
            [{text:"양털 채집", callback_data: "6"}],
            [{text:"책장 만드는법", callback_data: "7"}],
            [{text:"인첸트 하는법", callback_data: "8"}],
            [{text:"엔더드래곤 잡는법", callback_data: "9"}],
            [{text:"위더 소환법", callback_data: "10"}],
            [{text:"음반 얻는법", callback_data: "11"}],
            [{text:"농사 시작하는법", callback_data: "11"}],
            [{text:"무한 물 만드는법", callback_data: "12"}],
            [{text:"주의사항", callback_data: "13"}]
        ]
    } 
    
};
bot.sendMessage(msg.from.id,"이중 하나를 골라주세요",opts);

bot.on("callback_query", function(data){
    const chatId = msg.id;
    console.log(data);
    // Get the callback data specified
   let callback_data = data.data
   if(callback_data == "13") {
   // ...
     bot.answerCallbackQuery(chatId,'hello'); 
   }
});