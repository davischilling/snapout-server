import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateContactController,
  makeFindContactsController,
  makeFindContactByIdController,
  makeFindContactByIdAndUpdateController,
  makeFindContactByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createContactSchema, createContactAllowedParams,
  findContactSchema, findContactAllowedParams,
  findContactByIdSchema, findContactByIdAllowedParams,
  findContactByIdAndUpdateSchema, findContactByIdAndUpdateAllowedParams,
  findContactByIdAndDeleteSchema, findContactByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/contacts',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createContactSchema, createContactAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateContactController()))
  router.get(
    '/contacts',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findContactSchema, findContactAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindContactsController()))
  router.get(
    '/contacts/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findContactByIdSchema, findContactByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindContactByIdController()))
  router.patch(
    '/contacts/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findContactByIdAndUpdateSchema, findContactByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindContactByIdAndUpdateController()))
  router.delete(
    '/contacts/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findContactByIdAndDeleteSchema, findContactByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindContactByIdAndDeleteController()))
}
