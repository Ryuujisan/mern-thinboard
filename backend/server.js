import express from 'express';
import noteRoutes from "./src/routes/noteRoutes.js";
import {connectDB} from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import cors from "cors";
const app = express();

//middleware
app.use(cors());
 app.use(express.json());
//app.use(rateLimiter);
app.use("/api/notes", noteRoutes)

const port = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
})


// mongodb+srv://sakurairyuu:iGWHtJBr9FKdFq3J@cluster0.5ksohfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0