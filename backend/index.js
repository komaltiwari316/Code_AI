const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const UserRoutes = require('./Routes/UserRoutes');
const AiRoutes=require('./Routes/AiRoutes')
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
connectDB();

// routes
app.use('/User', UserRoutes);
app.use('/ai',AiRoutes)


app.get('/', (req, res) => {
  res.send("hello World");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
