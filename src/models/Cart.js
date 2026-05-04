const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
        addedDate: { type: Date, default: Date.now },
      },
    ],
    discount: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", CartSchema);
