import express from 'express';
import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();
//middleware
    if(process.env.NODE_ENV !== "production") {
        app.use(
            cors({
                origin: "http://localhost:5173",
            }));
    }
 app.use(express.json());
//app.use(rateLimiter);
app.use("/api/notes", noteRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, `../frontend/dist`)));

    app.get(`*`,(req,res)=>{
        res.sendFile(path.join(__dirname, `../frontend/dist/index.html`));
    })
}

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})


// mongodb+srv://sakurairyuu:iGWHtJBr9FKdFq3J@cluster0.5ksohfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0