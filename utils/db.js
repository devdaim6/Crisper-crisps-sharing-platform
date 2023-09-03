import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
        isConnected = true;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
    if (isConnected) {
    console.log("MongoDB connected");
        return;
    }

};
 