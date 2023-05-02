const mongoose = require('mongoose');

const uSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
});

export default mongoose.model("User", uSchema);
