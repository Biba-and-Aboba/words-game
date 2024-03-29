require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name: String,
    score: {
        type: Number,
        default: 0
    }
})

const statusSchema = new mongoose.Schema({
    usedWords: Array,
    currWord: String 
})

const User = mongoose.model('user', userSchema);
const Status = mongoose.model('status', statusSchema);

module.exports = {
    User, 
    Status
}

// const mongoose=require('mongoose');

// mongoose.connect('mongodb+srv://Admin:123@cluster0.xhsd7.mongodb.net/chainGame?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
// const db=mongoose.connection;
// db.once('open',()=>{
//     console.log('Db connected');
// })
// db.on('error',console.error.bind(console,"connection error"))

// function getDb(){
//     return mongoose;
// }

// module.exports={getDb}