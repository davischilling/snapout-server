export type CurrentAccountService = (params: CurrentAccount.Input) => Promise<CurrentAccount.Output>

export namespace CurrentAccount {
  type OutputData = {
    id: string
    name?: string
    email: string
    phone?: string
  }
  export type Input = { accountId: string }
  export type Output = { account: OutputData } | Error
}
