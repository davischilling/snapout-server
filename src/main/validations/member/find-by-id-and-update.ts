import { SocialTypes } from '@/domain/models'

import Joi from 'joi'

export const findMemberByIdAndUpdateAllowedParams = [
  'id',
  'name',
  'role',
  'image',
  'alt',
  'memberUrlPage',
  'memberPageInfo',
  'pageTitlePicture',
  'title',
  'paragraphs',
  'paragraph',
  'socialsPhrase',
  'socials',
  'socialType',
  'socialUrl'
]

export const findMemberByIdAndUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  role: Joi.string().required(),
  image: Joi.string().required(),
  alt: Joi.string().required(),
  memberUrlPage: Joi.string().required(),
  memberPageInfo: Joi.object({
    pageTitlePicture: Joi.string().required(),
    title: Joi.string().required(),
    paragraphs: Joi.array().items(
      Joi.object({
        paragraph: Joi.string().required()
      })
    ),
    socialsPhrase: Joi.string().required(),
    socials: Joi.array().items(
      Joi.object({
        socialType: Joi.string().valid(
          SocialTypes.facebook,
          SocialTypes.instagram).required(),
        socialUrl: Joi.string().required()
      })
    )
  }).required()
})
