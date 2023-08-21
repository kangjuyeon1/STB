const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  weight: { type: Schema.Types.Decimal128, required: true },
});

module.exports = mongoose.model("Users", UsersSchema);
