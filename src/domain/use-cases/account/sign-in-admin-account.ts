export type SignInAdminAccountService = (params: SignInAdminAccount.Input) => Promise<SignInAdminAccount.Output>

export namespace SignInAdminAccount {
  export type Input = { email: string }
  export type Output = { accessToken: string } | Error
}
