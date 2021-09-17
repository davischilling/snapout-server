import { RoleType } from '@/domain/models'
import { AccessTokenTypes } from '@/main/types'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import {
  makeCreateUserController,
  makeFindUsersController,
  makeFindUserByIdController,
  makeFindUserByIdAndUpdateController,
  makeFindUserByIdAndDeleteController
} from '@/main/factories/controllers'
import { makeOperatorAuthenticationMiddleware } from '@/main/factories/middlewares/operator-authentication'
import { MiddlewareTypes } from '@/main/types/middlewares'
import { makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  createUserSchema, createUserAllowedParams,
  findUserSchema, findUserAllowedParams,
  findUserByIdSchema, findUserByIdAllowedParams,
  findUserByIdAndUpdateSchema, findUserByIdAndUpdateAllowedParams,
  findUserByIdAndDeleteSchema, findUserByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/users',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createUserSchema, createUserAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateUserController())
  )
  router.get(
    '/users',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findUserSchema, findUserAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindUsersController())
  )
  router.get(
    '/users/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findUserByIdSchema, findUserByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindUserByIdController())
  )
  router.patch(
    '/users/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findUserByIdAndUpdateSchema, findUserByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindUserByIdAndUpdateController())
  )
  router.delete(
    '/users/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findUserByIdAndDeleteSchema, findUserByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindUserByIdAndDeleteController())
  )
}
