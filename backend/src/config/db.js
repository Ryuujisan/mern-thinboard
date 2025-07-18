import mongoose from "mongoose";

export const connectDB = async () =>{

    try {
       await mongoose.connect(process.env.MANGO_URI);
       console.log("===== DB Connected successfully.======");
    }catch (error) {
        console.log("=======Error connecting DB=========");
        console.log(error);
        process.exit(1);
    }
}