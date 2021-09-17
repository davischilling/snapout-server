import { GenderType, PhysicalActivityLevelType } from '@/domain/models'

import Joi from 'joi'

export const findUserAllowedParams = [
  'gender', 'age', 'height', 'initialWeight', 'initialBodyFat', 'physicalActivityLevel'
]

export const findUserSchema = Joi.object({
  gender: Joi.string()
    .valid(GenderType.masculine, GenderType.feminine),
  age: Joi.number(),
  height: Joi.number(),
  initialWeight: Joi.number(),
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
})
