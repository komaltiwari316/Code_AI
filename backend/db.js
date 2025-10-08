const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB CONNECTED : ${connect.connection.host}`)
  } catch (error) {
    console.log(`ERROR : ${error.message}`);
  }
}

module.exports = connectDB;