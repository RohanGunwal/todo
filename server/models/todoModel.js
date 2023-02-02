const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    activity: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    time: { type: Date, required: true, default: new Date() },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const todoModel = new mongoose.model("todos", todoSchema);

module.exports = todoModel;
