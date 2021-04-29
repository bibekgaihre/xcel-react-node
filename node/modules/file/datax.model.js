const mongoose = require("mongoose");
const DataXSchema = mongoose.Schema(
  {
    sn: {
      type: Number,
    },
    id: {
      type: String,
    },
    uniqueId: {
      type: String,
    },
  },
  {
    collection: "dataxs",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("DataX", DataXSchema);
