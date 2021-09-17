export type RecoverAccountPasswordService = (params: RecoverAccountPassword.Input) => Promise<RecoverAccountPassword.Output>

export namespace RecoverAccountPassword {
  export type Input = {
    accountId: string
    password: string
    repeat_password: string
  }
  export type Output = { accessToken: string } | Error
}
