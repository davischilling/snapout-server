import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateProductController,
  makeFindProductsController,
  makeFindProductByIdController,
  makeFindProductByIdAndUpdateController,
  makeFindProductByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createProductSchema, createProductAllowedParams,
  findProductSchema, findProductAllowedParams,
  findProductByIdSchema, findProductByIdAllowedParams,
  findProductByIdAndUpdateSchema, findProductByIdAndUpdateAllowedParams,
  findProductByIdAndDeleteSchema, findProductByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/products',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createProductSchema, createProductAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateProductController()))
  router.get(
    '/products',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findProductSchema, findProductAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindProductsController()))
  router.get(
    '/products/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findProductByIdSchema, findProductByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindProductByIdController()))
  router.patch(
    '/products/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findProductByIdAndUpdateSchema, findProductByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindProductByIdAndUpdateController()))
  router.delete(
    '/products/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findProductByIdAndDeleteSchema, findProductByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindProductByIdAndDeleteController()))
}
