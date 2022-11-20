const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
  },
  { timeStamps: true, versionKey: false }
);

const Cart = model("cart", cartSchema);
module.exports = Cart;
