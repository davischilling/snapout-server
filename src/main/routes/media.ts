import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateMediaController,
  makeFindMediasController,
  makeFindMediaByIdController,
  makeFindMediaByIdAndUpdateController,
  makeFindMediaByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createMediaSchema, createMediaAllowedParams,
  findMediaSchema, findMediaAllowedParams,
  findMediaByIdSchema, findMediaByIdAllowedParams,
  findMediaByIdAndUpdateSchema, findMediaByIdAndUpdateAllowedParams,
  findMediaByIdAndDeleteSchema, findMediaByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/medias',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createMediaSchema, createMediaAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateMediaController()))
  router.get(
    '/medias',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMediaSchema, findMediaAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMediasController()))
  router.get(
    '/medias/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMediaByIdSchema, findMediaByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMediaByIdController()))
  router.patch(
    '/medias/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMediaByIdAndUpdateSchema, findMediaByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMediaByIdAndUpdateController()))
  router.delete(
    '/medias/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMediaByIdAndDeleteSchema, findMediaByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMediaByIdAndDeleteController()))
}
