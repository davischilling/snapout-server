export type GenerateRecoverTokenService = (params: GenerateRecoverToken.Input) => Promise<GenerateRecoverToken.Output>

export namespace GenerateRecoverToken {
  export type Input = { email: string }
  export type Output = { recoverToken: string } | Error
}
