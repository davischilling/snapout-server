export type SignInService = (params: SignIn.Input) => Promise<SignIn.Output>

export namespace SignIn {
  export type Input = { email: string, password: string }
  export type Output = { accessToken: string } | Error
}
