const express = require('express');
const app = express();
const { db } =require('./middleware/db');
const bodyParser = require('body-parser');
const {userRouter} = require('./router/user.router');

app.use(bodyParser.json());
app.use(db);
app.use('/user',userRouter);

app.listen(2000,() => console.log('Started server at 2000'));