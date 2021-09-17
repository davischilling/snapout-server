import { AccessTokenTypes } from '@/main/types'
import { RoleType } from '@/domain/models'
import { adaptExpressRoute as adaptCtrl, adaptExpressMiddleware as adaptMddlwr } from '@/main/adapters'
import {
  makeSignUpController,
  makeSignInController,
  makeCurrentAccountController,
  makeFindAccountByIdAndUpdateController,
  makeUpdateAccountPasswordController,
  makeForgotAccountPasswordController,
  makeRecoverAccountPasswordController,
  makeGenerateFirstAccessRecoverTokenController,
  makeGenerateRecoverTokenController,
  makeCreateAdminAccountController,
  makeSignInAdminAccountController
} from '@/main/factories/controllers'
import {
  makeOperatorAuthenticationMiddleware,
  makeAdminAuthenticationMiddleware,
  makeValidationMiddleware
} from '@/main/factories/middlewares'
import {
  signUpSchema, signUpAllowedParams,
  signInSchema, signInAllowedParams,
  currentAccountSchema, currentAccountAllowedParams,
  findByIdAndUpdateSchema, findByIdAndUpdateAllowedParams,
  updatePasswordSchema, updatePasswordAllowedParams,
  forgotPasswordSchema, forgotPasswordAllowedParams,
  recoverPasswordSchema, recoverPasswordAllowedParams,
  generateFirstAccessRecoverTokenSchema, generateFirstAccessRecoverTokenAllowedParams,
  generateRecoverTokenSchema, generateRecoverTokenAllowedParams,
  createAdminAccountSchema, createAdminAccountAllowedParams,
  signInAdminAccountSchema, signInAdminAccountAllowedParams
} from '@/main/validations'

import { Router } from 'express'
import { MiddlewareTypes } from '../types/middlewares'

export default async (router: Router): Promise<void> => {
  router.post(
    '/sign-up',
    adaptMddlwr(makeValidationMiddleware(signUpSchema, signUpAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeSignUpController())
  )
  router.post(
    '/sign-in',
    adaptMddlwr(makeValidationMiddleware(signInSchema, signInAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeSignInController())
  )
  router.get(
    '/current-account',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(currentAccountSchema, currentAccountAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCurrentAccountController())
  )
  router.patch(
    '/update-account',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(findByIdAndUpdateSchema, findByIdAndUpdateAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeFindAccountByIdAndUpdateController())
  )
  router.patch(
    '/update-password',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(updatePasswordSchema, updatePasswordAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeUpdateAccountPasswordController())
  )
  router.post(
    '/forgot-password',
    adaptMddlwr(makeValidationMiddleware(forgotPasswordSchema, forgotPasswordAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeForgotAccountPasswordController())
  )
  router.post(
    '/recover-password',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.operator], AccessTokenTypes.recover), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(recoverPasswordSchema, recoverPasswordAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeRecoverAccountPasswordController())
  )
  router.post(
    '/generate-first-access-recover-token',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(generateFirstAccessRecoverTokenSchema, generateFirstAccessRecoverTokenAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeGenerateFirstAccessRecoverTokenController())
  )
  router.post(
    '/generate-recover-token',
    adaptMddlwr(await makeOperatorAuthenticationMiddleware([RoleType.admin], AccessTokenTypes.access), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(generateRecoverTokenSchema, generateRecoverTokenAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeGenerateRecoverTokenController())
  )
  router.post(
    '/create-admin-account',
    adaptMddlwr(makeAdminAuthenticationMiddleware(), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(createAdminAccountSchema, createAdminAccountAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeCreateAdminAccountController())
  )
  router.post(
    '/sign-in-admin-account',
    adaptMddlwr(makeAdminAuthenticationMiddleware(), MiddlewareTypes.auth),
    adaptMddlwr(makeValidationMiddleware(signInAdminAccountSchema, signInAdminAccountAllowedParams), MiddlewareTypes.validation),
    adaptCtrl(await makeSignInAdminAccountController())
  )
}
