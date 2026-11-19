import dbConnect from "@/lib/dbConnect";

const connectDb = (handler) => async (req, res) => {
    try {
        await dbConnect();
        return handler(req, res);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        return res.status(500).json({
            success: false,
            message: "Database connection failed",
            code: error.code || error.name || "DB_CONNECTION_ERROR"
        });
    }
};

export default connectDb;
