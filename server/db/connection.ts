import mongoose from "mongoose";


export const connect = () => {
    console.log('MONGO_URI: ',process.env.MONGO_URI)
    mongoose
      .connect(String(process.env.MONGO_URI), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database Connected!"))
      .catch((e) => console.log(e));
    
    mongoose.connection.on("error", (err) => {
      console.log(`DB Connection error: ${err.message}`);
    });
}




