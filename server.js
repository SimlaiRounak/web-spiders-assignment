require('dotenv').config();
const express = require('express')
const cors = require('cors')
const serverRoutes = require('./routes');
const { requestLogger } = require('./middlewares')
const { connectDB, seedData } = require('./config/database');

const app = express();
app.use(express.json())
app.use(cors());

app.use(requestLogger())
app.use(serverRoutes)
connectDB()
seedData()

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})