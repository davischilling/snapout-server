import { ProductData } from '@/domain/models'
import mongoose from 'mongoose'


export type RecipeItemAttrs = {
  productID: string,
  productYield: number
}

export interface RecipeItemDoc extends mongoose.Document {
  productID: string,
  productYield: number
}

export interface RecipeItemModel extends mongoose.Model<RecipeItemDoc> {
  build: (attrs: RecipeItemAttrs) => RecipeItemDoc
}

const recipeItemSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productYield: { type: Number, required: true }
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

recipeItemSchema.statics.build = (attrs: RecipeItemAttrs) => {
  return new RecipeItem(attrs)
}

const RecipeItem = mongoose.model<RecipeItemDoc, RecipeItemModel>('RecipeItem', recipeItemSchema)

export { RecipeItem as RecipeItemEntity, recipeItemSchema }

export default RecipeItem
