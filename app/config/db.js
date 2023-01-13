const mongoose =  require('mongoose');
require('dotenv').config();

const URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'; 

module.exports = async () => {
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(URL);
    }catch(err)
    {
        console.log(err.message);
    }
}