const { UserModel } = require('../model/user.model');
const { date } = require('../utils/date');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const config = require('config');
const serverCredentials = config.get("serverCredentials");

var birthList = [
    {"name": "akshata k", "date": '11/22/2019', "email": "nikakshata@gmail.com","message":"Many more happy return of the day"},
    {"name": "Jennifer W", "date": '11/23/2019', "email": "nikaka0792@gmail.com"},
    {"name":"rahul solanki", "date":"09/12/1989","email":"solankirahul680@gmail.com"},
    {"name":"durgesh ghotgalkar", "date":"", "email":""},
    {"name":"Shobha korade", "date":"06/08/1989", "email":"shobhakorade@gmail.com"}
];

module.exports.saveUser = async(req, res, next) => {
    var user = new UserModel(req.body);
    try {
    const userResult = await user.save();
    if(userResult){
        return res.status(200).send(userResult);
    }
    }catch(err){
        return res.status(500).send("UNABLE TO SAVE USER");
    }
};

module.exports.sendMail = async (req, res, next) => {
    try{
    const userData = await UserModel.find();
    userData.forEach((val,index) => {
        if(val.dob.split("/")[0] == date.getCurrentMonth() && val.dob.split("/")[1] == date.getTodassDate()) {
        const oauth2Client = new OAuth2(serverCredentials.googleCredentials.clientId, 
                                        serverCredentials.googleCredentials.clientSecret,
                                        serverCredentials.googleCredentials.googlePlayground)
 
 oauth2Client.setCredentials({
     refresh_token : serverCredentials.googleCredentials.refreshToken
 });
 
 const accessToken = oauth2Client.getAccessToken();
 
 const smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
         type: serverCredentials.googleCredentials.type,
         user: serverCredentials.googleCredentials.user,
         clientId: serverCredentials.googleCredentials.clientId,
         clientSecret: serverCredentials.googleCredentials.clientSecret,
         refreshToken: serverCredentials.googleCredentials.refreshToken,
         accessToken: accessToken
     }
 })

 const mailOptions = {
     from: serverCredentials.googleCredentials.user,
      to: `${val.email}`,
      subject: "Node.js Email with Secure OAuth",
      generateTextFromHTML: true,
      html: "<b>test</b>"
 }
 
 smtpTransport.sendMail(mailOptions, (error, response) => {
     if(error){
        return res.status(500).send(error)
     } else{
        return res.status(200).send("Mails are sent to your friends");
     }
     smtpTransport.close();
 })
        }
    });
    }catch(err){
        return res.status(500).send("Unable to fetch data");
    }
}


