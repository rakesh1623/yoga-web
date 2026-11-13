// import mongoose from "mongoose";

// const  connectDb = handler => async (req,res)=>{
//     if(mongoose.connections[0].readyState){
//         return handler(req,res)
//     }

//     await mongoose.connect(process.env.MONGO_URI)
//     return handler(req,res);
// }

// export default connectDb;




import mongoose from "mongoose";
import dns from "node:dns";

// Configure DNS before any MongoDB connection
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = (handler) => async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        return handler(req, res);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        return res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
};

export default connectDb;
