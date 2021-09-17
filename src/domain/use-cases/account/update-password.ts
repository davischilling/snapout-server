export type UpdateAccountPasswordService = (params: UpdateAccountPassword.Input) => Promise<UpdateAccountPassword.Output>

export namespace UpdateAccountPassword {
  export type Input = {
    accountId: string
    old_password: string
    password: string
    repeat_password: string
  }
  type OutputData = {
    name?: string
    email: string
    phone?: string
  }
  export type Output = { Account: OutputData } | Error
}
