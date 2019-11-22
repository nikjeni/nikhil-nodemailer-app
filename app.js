const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
// var sendGrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

// var request = sendGrid.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: {
//         personalizations: [
//             {
//                 to:[
//                     {
//                         email: 'gavalinikhil700@gmail.com'
//                     }
//                 ],
//                 subject: 'Hello World robot 3.0'
//             }
//         ],
//         from: {
//             email: 'nikaka0792@gmail.com'
//         },
//         content:[
//             {
//                 type: 'text/plain',
//                 value: 'Hello, Email!!'
//             }
//         ]
//     }
// });

// sendGrid.API(request)
// .then(response => {
//     console.log(request.statusCode);
//     console.log(request.body);
//     console.log(request.headers);
// }).catch((err) => {
//     console.log(err.response.statusCode);
// })

var birthList = [
    {"name": "akshata k", "date": '11/22/2019', "email": "nikakshata@gmail.com","message":"Many more happy return of the day"},
    {"name": "Jennifer W", "date": '11/21/2019', "email": "nikaka0792@gmail.com"},
    {"name":"rahul solanki", "date":"09/12/1989","email":"solankirahul680@gmail.com"},
    {"name":"durgesh ghotgalkar", "date":"", "email":""}
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
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    })
    
    let info = await transporter.sendMail({
        from: '"Happy New Year 👻" <gavalinikhl700@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Happy new year ✔", // Subject line
        text: `${user.message}`, // plain text body
        html: "<b>`Hello world?`</b>" // html body
    }).then(() => {
        res.status(200).send('Mails are going to your friend list')
    }).catch((err) => {
        res.status(500).send(err);
    })
   }
})

app.listen( process.env.PORT, '0.0.0.0' |2000,() => console.log('Started server at 2000'));