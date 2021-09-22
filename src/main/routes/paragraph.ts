import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateParagraphController,
  makeFindParagraphsController,
  makeFindParagraphByIdController,
  makeFindParagraphByIdAndUpdateController,
  makeFindParagraphByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createParagraphSchema, createParagraphAllowedParams,
  findParagraphSchema, findParagraphAllowedParams,
  findParagraphByIdSchema, findParagraphByIdAllowedParams,
  findParagraphByIdAndUpdateSchema, findParagraphByIdAndUpdateAllowedParams,
  findParagraphByIdAndDeleteSchema, findParagraphByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/paragraphs',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createParagraphSchema, createParagraphAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateParagraphController()))
  router.get(
    '/paragraphs',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findParagraphSchema, findParagraphAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindParagraphsController()))
  router.get(
    '/paragraphs/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findParagraphByIdSchema, findParagraphByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindParagraphByIdController()))
  router.patch(
    '/paragraphs/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findParagraphByIdAndUpdateSchema, findParagraphByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindParagraphByIdAndUpdateController()))
  router.delete(
    '/paragraphs/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findParagraphByIdAndDeleteSchema, findParagraphByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindParagraphByIdAndDeleteController()))
}
