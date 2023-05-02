import connectDb from "../../../mongodb/mongoconnect";
import uSchema from "../../../mongodb/mongoschema";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { name, email, pass } = req.body;
        const saltRounds = 10;
        const hash = await bcrypt.hash(pass, saltRounds);
        const newSchema = new uSchema({
            name,
            email,
            pass: hash
        });
        try {
            await newSchema.save();
            return res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            return res.status(500).json({ message: "Unable to create user" });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
};

export default connectDb(handler);
