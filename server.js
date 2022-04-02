const express = require('express');
const dotenv = require("dotenv").config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const port = process.env.port || 5500;
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use('/user', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))