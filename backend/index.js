const express=require("express");
const voteRoutes = require('./routes/voteRoutes');
const bodyParser = require('body-parser');
const cors=require("cors")
const errorHandler=require("./middlewares/errorMiddleware")

const app=express();
require('dotenv').config();
const Port=8000
app.use(cors())

app.use(bodyParser.json());
app.use(express.json());
app.use('/api', voteRoutes);
app.use(errorHandler)


app.listen(Port,()=>{
    console.log(`listening at ${Port}`)
})