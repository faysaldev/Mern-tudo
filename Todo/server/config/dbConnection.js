const mongoose = require("mongoose")

const dbConnection =()=>{
    mongoose.connect(`${process.env.MONGO_DB_URL}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(()=>console.log("Db Connected")).catch((error)=> console.log(error))

}

module.exports = dbConnection;