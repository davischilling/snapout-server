export type CreateAdminAccountService = (params: CreateAdminAccount.Input) => Promise<CreateAdminAccount.Output>

export namespace CreateAdminAccount {
  export type Input = { email: string }
  export type Output = { accessToken: string } | Error
}
