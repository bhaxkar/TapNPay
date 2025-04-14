import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";

const port = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("Application Error", error);
        process.exit(1);
    });
    app.listen(port, () => {
        console.log(`Application is  running on port ${port}`)
    });
})
.catch(() => {
    console.log("MongoDB connection failed", error)
    process.exit(1);
})
