export type GenerateFirstAccessRecoverTokenService = (params: GenerateFirstAccessRecoverToken.Input) => Promise<GenerateFirstAccessRecoverToken.Output>

export namespace GenerateFirstAccessRecoverToken {
  export type Input = { email: string }
  export type Output = { recoverToken: string } | Error
}
