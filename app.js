const express = require('express');
const app = express();
const nodemailer = require('nodemailer');


var birthList = [
    {"name": "akshata k", "date": '11/22/2019', "email": "nikakshata@gmail.com"},
    {"name": "Jennifer W", "date": '11/21/2019', "email": "nikaka0792@gmail.com"}
];

// Date formation
var today = new Date();
var dd = String(today.getDate()).padStart(2,'0');
var mm = String(today.getMonth() + 1).padStart(2, '0');

var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
console.log("todays date",today);


app.get('/sendMail',async (req, res, next) => {

   var user =  birthList.find(user => user.date === today);

   if(user) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "gavalinikhil700@gmail.com",
            pass: "9880067905"
        }
    })
    
    let info = await transporter.sendMail({
        from: '"Happy New Year 👻" <gavalinikhl700@gmail.com>', // sender address
        to: "nikaka0792@gmail.com, nikakshata@gmail.com", // list of receivers
        subject: "Happy new year ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    }).then(() => {
        res.status(200).send('Mails are going to your friend list')
    }).catch((err) => {
        res.status(500).send(err);
    })
   }
})

app.listen( process.env.PORT |2000,() => console.log('Started server at 2000'));