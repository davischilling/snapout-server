import { AccessTokenTypes } from '@/main/types'

export interface Token {
  generate: (params: Token.GenerateParams) => Promise<Token.GenerateResult>
  validate: (params: Token.ValidateParams) => Promise<Token.ValidateResult>
}

export namespace Token {
  export type GenerateParams = {
    key: { id: string, type: AccessTokenTypes }
    expirationInMs: number
  }
  export type GenerateResult = string

  export type ValidateParams = { token: string }
  export type ValidateResult = { id: string, type: AccessTokenTypes }
}
