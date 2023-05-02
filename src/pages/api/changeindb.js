import connectDb from "../../../mongodb/mongoconnect";
import User from "../../../mongodb/mongoschema";
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { id, email, pass } = req.body;

    try {
      // Retrieve user from MongoDB with the matching ID
      const user = await User.findById(id);

      // If no user is found, return a 404 Not Found response
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If a user is found, update the email and password
      user.email = email;

      // Hash the new password using bcrypt before saving it
      const hashedPassword = await bcrypt.hash(pass, 10);
      user.pass = hashedPassword;

      // Save the updated user in the database
      await user.save();

      return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      return res.status(500).json({ message: "Unable to update user" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default connectDb(handler);
