const mongoose = require("mongoose");

const DataYSchema = mongoose.Schema(
  {
    uniqueId: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    collection: "datays",
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

module.exports = mongoose.model("DataY", DataYSchema);
