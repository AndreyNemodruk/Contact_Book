const mongoose = require("mongoose");
const { Schema } = mongoose;
const Image = new Schema({
url: { type: String },
});
module.exports = mongoose.model("image", Image);