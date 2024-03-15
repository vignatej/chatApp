import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.Routes.js";
import messageRoutes from "./Routes/message.Routes.js";
import userRoutes from "./Routes/user.Routes.js";
import { ConnectToMongoDB } from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
// const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.get("/", (req, res)=>{
//     res.send("Hestudrusdllo world");
// });


server.listen(PORT, ()=>{
    ConnectToMongoDB();
    console.log(`server is running on ${PORT}`)
});