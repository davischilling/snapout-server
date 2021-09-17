import mongoose from 'mongoose'


export type RecipeAttrs = {
  products: string[],
  meals: string[]
}

export interface RecipeDoc extends mongoose.Document {
  products: string[],
  meals: string[]
}

export interface RecipeModel extends mongoose.Model<RecipeDoc> {
  build: (attrs: RecipeAttrs) => RecipeDoc
}

const recipeSchema = new mongoose.Schema({
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'RecipeItem',
    required: true
  },
  meals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'TypeOfMeal',
    required: true
  }
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

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
  return new Recipe(attrs)
}

const Recipe = mongoose.model<RecipeDoc, RecipeModel>('Recipe', recipeSchema)

export { Recipe as RecipeEntity, recipeSchema }

export default Recipe
