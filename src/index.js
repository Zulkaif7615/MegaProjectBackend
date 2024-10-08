// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
// import { app } from "./App.js";
import { app } from "./app.js";

dotenv.config({
    // path: './env'
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,() => {
     console.log(`server is listen at the port:${process.env.PORT}`);
     
    })
})
.catch((err)=>{
    console.log("MONGO DB CONNECTION ERROR !!!",err);
})















//import express from "express";


// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}` / `${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("Error", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// })();
