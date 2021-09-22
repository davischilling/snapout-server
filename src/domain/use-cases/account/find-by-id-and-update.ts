export type FindAccountByIdAndUpdateService = (params: FindAccountByIdAndUpdate.Input) => Promise<FindAccountByIdAndUpdate.Output>

export namespace FindAccountByIdAndUpdate {
  export type Input = {
    accountId: string
    name: string
    phone: string
  }
  type OutputData = {
    name: string
    email: string
    phone: string
  }
  export type Output = { Account: OutputData } | Error
}
