import Joi from 'joi'

export const createMediaAllowedParams = [
  'youtubeUrlId', 'videoTitle'
]

export const createMediaSchema = Joi.object({
  youtubeUrlId: Joi.string().required(),
  videoTitle: Joi.string().required()
})
