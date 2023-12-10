import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    barcodeID: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    thresholdValue: {
      type: Number,
      required: true,
    },
    wasted: {
      type: Number,
      required: true, // Change the type according to your requirement
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
