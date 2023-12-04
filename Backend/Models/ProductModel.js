import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // type: mongoose.ObjectId: 
//     This specifies the type of the category field. It's set to mongoose.ObjectId, which means that the value of the category field should be an ObjectId, here it means that datatype of category field of product is id of some mongodb object in this case it the object is some category present in Category model

// ref: "Category": This property is used in conjunction with population in Mongoose. When you populate a field, you're essentially replacing the stored ObjectId with the actual document from another collection. In this case, ref is set to "Category," indicating that the category field is referencing documents in the "Category" collection. This is a way of establishing a relationship between the current collection (probably the "Product" collection) and the "Category" collection.
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
