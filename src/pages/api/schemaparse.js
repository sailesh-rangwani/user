import connectDb from '../../../mongodb/mongoconnect';
import User from '../../../mongodb/mongoschema';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const data = await User.find();
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};

export default connectDb(handler);
