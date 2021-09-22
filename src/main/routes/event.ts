import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateEventController,
  makeFindEventsController,
  makeFindEventByIdController,
  makeFindEventByIdAndUpdateController,
  makeFindEventByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createEventSchema, createEventAllowedParams,
  findEventSchema, findEventAllowedParams,
  findEventByIdSchema, findEventByIdAllowedParams,
  findEventByIdAndUpdateSchema, findEventByIdAndUpdateAllowedParams,
  findEventByIdAndDeleteSchema, findEventByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/events',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createEventSchema, createEventAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateEventController()))
  router.get(
    '/events',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findEventSchema, findEventAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindEventsController()))
  router.get(
    '/events/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findEventByIdSchema, findEventByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindEventByIdController()))
  router.patch(
    '/events/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findEventByIdAndUpdateSchema, findEventByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindEventByIdAndUpdateController()))
  router.delete(
    '/events/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findEventByIdAndDeleteSchema, findEventByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindEventByIdAndDeleteController()))
}
