import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice: number;
  slug: string;
  category: string;
  image: string;
  tag?: string;
  description: string;
  features: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String },
  description: { type: String, required: true },
  features: [{ type: String }],
  stock: { type: Number, default: 0 },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
