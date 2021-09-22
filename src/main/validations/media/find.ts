import Joi from 'joi'

export const findMediaAllowedParams = [
  'youtubeUrlId', 'videoTitle'
]

export const findMediaSchema = Joi.object({
  youtubeUrlId: Joi.string(),
  videoTitle: Joi.string()
})
