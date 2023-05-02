import mongoose from "mongoose";

//user: sailesh pass: Lo7nskmZkwmCSM5L
const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req, res);
}

export default connectDb;