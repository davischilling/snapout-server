export type ObjectiveData = {
  isCurrentObjetive: boolean
  type: ObjectiveType
  macroNutrientsRatio: MacroNutrientsRatioType
  amountInGramsOfTheDay: AmountInGramsOfTheDayType
  totalCaloriesForTheDay: number
  currentBodyFat: number
  currentweight: number
  initialDate: Date
  finalDate: Date
}

type ObjectiveType = {
  bulking: BulkingType
  cutting: CuttingType
  maintain: 1
}

enum BulkingType {
  cleanBulking = 5,
  traditionalBulking = 10,
  durtyBulking = 15
}

enum CuttingType {
  moderate = 250,
  medium = 500,
  hardcore = 1000
}

type MacroNutrientsRatioType = {
  fat: number
  carbohydrate: number
  protein: number
}

type AmountInGramsOfTheDayType = {
  fat: number
  carbohydrate: number
  protein: number
}
