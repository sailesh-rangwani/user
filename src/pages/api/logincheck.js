import connectDb from "../../../mongodb/mongoconnect";
import User from "../../../mongodb/mongoschema";
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, pass } = req.body;

    try {
      // Retrieve user from MongoDB with the matching email
      const user = await User.findOne({ email });

      // If no user is found, return a 401 Unauthorized response
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the input password with the password stored in the database
      const isMatch = await bcrypt.compare(pass, user.pass);

      if (isMatch) {
        // Passwords match - return a 200 OK response with a message indicating successful login
        return res.status(200).json({ message: "Login successful" });
      } else {
        // Passwords do not match - return a 401 Unauthorized response
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Unable to login" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default connectDb(handler);
