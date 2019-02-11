// telegramApiURL = "";

module.exports = {
    // init = function(botKey){
    //     telegramApiURL = "https://api.telegram.org/bot{0}/".format(botKey);
    // },

    handleRequest = function (reqBody) {
    /*
    Request Body Format:
    { 
        update_id: UPDATE_ID#,
        message:
        { 
            message_id: MESSAGE_ID#,
            from:
            {
                id: ID_#,
                is_bot: false,
                first_name: 'FIRST_NAME',
                last_name: 'LAST_NAME',
                username: 'USERNAME',
                language_code: 'pt-br' 
            },
            chat:
            {
                id: CHAT_ID#,
                first_name: 'FIRST_NAME',
                last_name: 'LAST_NAME',
                username: 'USERNAME',
                type: 'private' 
            },
            date: DATE_TIME,
            text: 'TEXT_MESSAGE' 
        } 
    }
    */
        console.log(reqBody.message.text);

        var requestResult = '{"method"="sendMessage",'+
                            ' "chat_id"='+reqBody.message.chat.id+','+
                            ' "text"="EITA"}';

        return requestResult;
    }
}