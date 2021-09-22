import { SocialTypes } from '@/domain/models'

import Joi from 'joi'

export const findMemberAllowedParams = [
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

export const findMemberSchema = Joi.object({
  name: Joi.string(),
  role: Joi.string(),
  image: Joi.string(),
  alt: Joi.string(),
  memberUrlPage: Joi.string(),
  memberPageInfo: Joi.object({
    pageTitlePicture: Joi.string(),
    title: Joi.string(),
    paragraphs: Joi.array().items(
      Joi.object({
        paragraph: Joi.string()
      })
    ),
    socialsPhrase: Joi.string(),
    socials: Joi.array().items(
      Joi.object({
        socialType: Joi.string().valid(
          SocialTypes.facebook,
          SocialTypes.instagram),
        socialUrl: Joi.string()
      })
    ),
  })
})
