import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import { makeOperatorAuthenticationMiddleware, makeValidationMiddleware } from '@/main/factories/middlewares'
import {
  makeCreateMemberController,
  makeFindMembersController,
  makeFindMemberByIdController,
  makeFindMemberByIdAndUpdateController,
  makeFindMemberByIdAndDeleteController
} from '@/main/factories/controllers'
import { MiddlewareTypes } from '@/main/types/middlewares'
import {
  createMemberSchema, createMemberAllowedParams,
  findMemberSchema, findMemberAllowedParams,
  findMemberByIdSchema, findMemberByIdAllowedParams,
  findMemberByIdAndUpdateSchema, findMemberByIdAndUpdateAllowedParams,
  findMemberByIdAndDeleteSchema, findMemberByIdAndDeleteAllowedParams
} from '@/main/validations'

import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/members',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createMemberSchema, createMemberAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateMemberController()))
  router.get(
    '/members',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator, RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMemberSchema, findMemberAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMembersController()))
  router.get(
    '/members/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator, RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMemberByIdSchema, findMemberByIdAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMemberByIdController()))
  router.patch(
    '/members/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator, RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMemberByIdAndUpdateSchema, findMemberByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMemberByIdAndUpdateController()))
  router.delete(
    '/members/:id',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator, RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findMemberByIdAndDeleteSchema, findMemberByIdAndDeleteAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindMemberByIdAndDeleteController()))
}
