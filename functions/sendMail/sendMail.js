const { output, log } = require("../../utils/utils");
let connectDB = require('../connectDB/connectDB');
const { API_DATABASE, ENDPOINT_DATABASE, nodeMailer } = require("../../settings");




exports.handler = async (event) => {

    let {
        httpMethod: method,
        queryStringParameters: p
    } = event;


    let client = await connectDB()
    const colUsers = client.db().collection('users');

    if (method == "POST") {
        try {

            let { id } = p;
            let user = await colUsers.find({ id }).toArray();
            let call = await API_DATABASE.post(ENDPOINT_DATABASE.createTicket + `?id=${id}`)
            let ticket = call.data;
            

            

            
            async function main() {
               
                
                let testAccount = await nodemailer.createTestAccount();

                // create reusable transporter object using the default SMTP transport
                let transporter = nodeMailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: testAccount.user, // generated ethereal user
                        pass: testAccount.pass, // generated ethereal password
                    },
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from: testAccount.user, // sender address
                    to: user.correo, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: ticket  // plain text body
                   
                });

                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);




            return output('ola')

        } catch (error) {
            log(error);
        }

    }

}