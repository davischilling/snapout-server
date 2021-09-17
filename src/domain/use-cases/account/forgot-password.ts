export type ForgotAccountPasswordService = (params: ForgotAccountPassword.Input) => Promise<ForgotAccountPassword.Output>

export namespace ForgotAccountPassword {
  export type Input = { email: string }
  export type Output = { recoverToken: string } | Error
}
