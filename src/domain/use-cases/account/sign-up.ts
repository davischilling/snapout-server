export type SignUpService = (params: SignUp.Input) => Promise<SignUp.Output>

export namespace SignUp {
  export type Input = {
    name?: string
    phone?: string
    email: string
    password: string
    repeat_password: string
  }
  export type Output = { accessToken: string } | Error
}
