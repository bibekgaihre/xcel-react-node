const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    sn: {
      type: Number,
    },
    id: {
      type: Number,
    },
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
    collection: "users",
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

module.exports = mongoose.model("User", UserSchema);
