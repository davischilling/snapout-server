import { GenderType, PhysicalActivityLevelType } from '@/domain/models'

import Joi from 'joi'

export const createUserAllowedParams = [
  'gender', 'age', 'height', 'initialWeight', 'initialBodyFat', 'physicalActivityLevel'
]

export const createUserSchema = Joi.object({
  gender: Joi.string()
    .valid(GenderType.masculine, GenderType.feminine)
    .required(),
  age: Joi.number()
    .required(),
  height: Joi.number()
    .required(),
  initialWeight: Joi.number()
    .required(),
  initialBodyFat: Joi.number(),
  physicalActivityLevel: Joi.number()
    .valid(
      PhysicalActivityLevelType.none,
      PhysicalActivityLevelType.oneToTwo,
      PhysicalActivityLevelType.twoToThree,
      PhysicalActivityLevelType.fourToFive,
      PhysicalActivityLevelType.sixToSeven,
      PhysicalActivityLevelType.athlete
    )
    .required()
})
