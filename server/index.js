const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config();
const {errorHandler} = require('./Middleware/errorMiddleware')
const app = express();
const connectDB = require('./database/config')
const port = process.env.PORT || 5000
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended: false}))
connectDB()
app.use('/api/goals', require('./routes/goalsRoute'))

app.use(errorHandler)

app.listen(port, ()=>console.log(`Server started at: ${port}`))


