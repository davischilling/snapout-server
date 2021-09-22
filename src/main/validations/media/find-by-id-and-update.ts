import Joi from 'joi'

export const findMediaByIdAndUpdateAllowedParams = [
  'id', 'youtubeUrlId', 'videoTitle'
]

export const findMediaByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  youtubeUrlId: Joi.string().required(),
  videoTitle: Joi.string().required()
})
