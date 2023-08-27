const express =require("express") 
const dotenv =require("dotenv");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");

const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config();

const connect = async ()=>{
try{
    
await mongoose.connect("mongodb+srv://girija:pRqLDnVQKqnjsGZm@cluster0.vk4swpk.mongodb.net/skyGoal")
console.log("MongoDb is connected")

}
catch(error){
    throw error;
}
}

mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb connection disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("Mongodb connection connected");
})
//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000,()=>{
    connect()
    console.log("Server is running on port 5000")
})