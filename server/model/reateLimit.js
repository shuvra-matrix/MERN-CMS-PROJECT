const mongoos = require("mongoose");

const Schema = mongoos.Schema;

const reateLimitSchema = new Schema({
  ipAddress: { type: String, required: true },
  count: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoos.model("RateLimit", reateLimitSchema);
