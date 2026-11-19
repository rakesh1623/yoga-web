import dbConnect from "@/lib/dbConnect";

const connectDb = (handler) => async (req, res) => {
    try {
        await dbConnect();
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
