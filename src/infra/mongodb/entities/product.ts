import { PortionTypes } from '@/domain/models'
import mongoose from 'mongoose'

export type ProductAttrs = {
  name: string
  fat: number
  carbohydrate: number
  protein: number
  portion: PortionTypes
  isConsumableAlone: boolean
}

export interface ProductDoc extends mongoose.Document {
  name: string
  fat: number
  carbohydrate: number
  protein: number
  portion: PortionTypes
  isConsumableAlone: boolean
}

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build: (attrs: ProductAttrs) => ProductDoc
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fat: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  protein: { type: Number, required: true },
  portion: { type: String, enum: [PortionTypes.grams, PortionTypes.unity], required: true },
  isConsumableAlone: { type: Boolean, required: true }
}, {
  timestamps: true,
  // toJSON: {
  //   transform(doc, ret) {
  //     ret.id = ret._id
  //     delete ret._id
  //     delete ret.__v
  //   }
  // }
})

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs)
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema)

export { Product as ProductEntity, productSchema }

export default Product
