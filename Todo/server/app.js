const express = require('express');
const dbConnection = require('./config/dbConnection')
const todoRouter = require('./routes/todoRouter');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const mongoose = require('mongoose');

const cors = require('cors')

// ? this for the env file 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const pusher = new Pusher({
  appId: "1251345",
  key: "5f231fdf5bd1effe2383",
  secret: "ece7d2364fba81fa2389",
  cluster: "eu",
  useTLS: true
});


dbConnection();

const db = mongoose.connection;
db.once('open',()=>{
    console.log("Db Connected 2nd time");
    const todoCollection =db.collection('todos');
    const changeStrem = todoCollection.watch();

    changeStrem.on('change',(change) => {
        console.log(change)
        if(change.operationType==="insert"){
            const todoDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                text:todoDetails.text,
                _id:todoDetails._id
            })
        }else{
            console.log('Error Trigger Pusher')
        }
    })
})





app.use('/',todoRouter)



app.listen(7000,()=>console.log('Server Running!'))