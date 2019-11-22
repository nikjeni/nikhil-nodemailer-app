const { UserModel } = require('../model/user.model');
const { date } = require('../utils/date');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


var birthList = [
    {"name": "akshata k", "date": '11/22/2019', "email": "nikakshata@gmail.com","message":"Many more happy return of the day"},
    {"name": "Jennifer W", "date": '11/23/2019', "email": "nikaka0792@gmail.com"},
    {"name":"rahul solanki", "date":"09/12/1989","email":"solankirahul680@gmail.com"},
    {"name":"durgesh ghotgalkar", "date":"", "email":""},
    {"name":"Shobha korade", "date":"06/08/1989", "email":"shobhakorade@gmail.com"}
];

module.exports.saveUser = async(req, res, next) => {
    console.log(req.body);
    var user = new UserModel(req.body);
    try {
    const userResult = await user.save();
    if(userResult){
        return res.status(200).send(userResult);
    }
    }catch(err){
        console.log("errrrr", err);
        return res.status(500).send("UNABLE TO SAVE USER");
    }
};

module.exports.sendMail = async (req, res, next) => {
 //   var userData =  birthList.find(user => user.date === date.getCurrentDate);
    console.log(date.getCurrentDate());
    try{
    return res.status(200).send(await UserModel.find());
    }catch(err){
        res.status(500).send("Unable to fetch data");
    }
//     if(userData) {
     
//     const oauth2Client = new OAuth2(
//      "258269955972-t17cpd0kdls16d7h4pbau5e8r4u47q5m.apps.googleusercontent.com",
//      "ka7cBXd12UfLO4nyRnCy_oob",
//      "https://developers.google.com/oauthplayground")
 
//  oauth2Client.setCredentials({
//      refresh_token : "1//049fLkRJc5WYTCgYIARAAGAQSNwF-L9IrxXQ9mABWZE6f2XGrRnhCzexQazexdizSeqJsa9S9VJmK1LmziYIOzrw_0HyhDY4BXVQ"
//  });
 
//  const accessToken = oauth2Client.getAccessToken();
 
//  const smtpTransport = nodemailer.createTransport({
//      service: "gmail",
//      auth: {
//          type: "OAuth2",
//          user: "gavalinikhil700@gmail.com",
//          clientId: "258269955972-t17cpd0kdls16d7h4pbau5e8r4u47q5m.apps.googleusercontent.com",
//          clientSecret: "ka7cBXd12UfLO4nyRnCy_oob",
//          refreshToken: "1//049fLkRJc5WYTCgYIARAAGAQSNwF-L9IrxXQ9mABWZE6f2XGrRnhCzexQazexdizSeqJsa9S9VJmK1LmziYIOzrw_0HyhDY4BXVQ",
//          accessToken: accessToken
//      }
//  })
 
//  const mailOptions = {
//      from: "gavalinikhil700@gmail.com",
//       to: `${userData.email}`,
//       subject: "Node.js Email with Secure OAuth",
//       generateTextFromHTML: true,
//       html: "<b>test</b>"
//  }
 
//  smtpTransport.sendMail(mailOptions, (error, response) => {
//      if(error){
//          res.status(500).send(error)
//      } else{
//          res.status(200).send("Mails are sent to your friends");
//      }
//      smtpTransport.close();
//  })
 
//     }
}


