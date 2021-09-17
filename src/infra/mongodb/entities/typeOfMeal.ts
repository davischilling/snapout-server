import mongoose from 'mongoose'


export type TypeOfMealAttrs = {
  name: string
}

export interface TypeOfMealDoc extends mongoose.Document {
  name: string
}

export interface TypeOfMealModel extends mongoose.Model<TypeOfMealDoc> {
  build: (attrs: TypeOfMealAttrs) => TypeOfMealDoc
}

const typeOfMealSchema = new mongoose.Schema({
  name: { type: String, required: true }
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

typeOfMealSchema.statics.build = (attrs: TypeOfMealAttrs) => {
  return new TypeOfMeal(attrs)
}

const TypeOfMeal = mongoose.model<TypeOfMealDoc, TypeOfMealModel>('TypeOfMeal', typeOfMealSchema)

export { TypeOfMeal as TypeOfMealEntity, typeOfMealSchema }

export default TypeOfMeal
