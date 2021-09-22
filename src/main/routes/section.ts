import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateSectionController,
  makeFindSectionsController,
  makeFindSectionByIdController,
  makeFindSectionByIdAndUpdateController,
  makeFindSectionByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createSectionSchema, createSectionAllowedParams,
  findSectionSchema, findSectionAllowedParams,
  findSectionByIdSchema, findSectionByIdAllowedParams,
  findSectionByIdAndUpdateSchema, findSectionByIdAndUpdateAllowedParams,
  findSectionByIdAndDeleteSchema, findSectionByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/sections',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createSectionSchema, createSectionAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateSectionController()))
  router.get(
    '/sections',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findSectionSchema, findSectionAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindSectionsController()))
  router.get(
    '/sections/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findSectionByIdSchema, findSectionByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindSectionByIdController()))
  router.patch(
    '/sections/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findSectionByIdAndUpdateSchema, findSectionByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindSectionByIdAndUpdateController()))
  router.delete(
    '/sections/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findSectionByIdAndDeleteSchema, findSectionByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindSectionByIdAndDeleteController()))
}
