export interface Encripter {
  toHash: (password: string) => Promise<string>
  compare: (dcryptData: Encripter.compareInput) => Promise<boolean>
}

export namespace Encripter {
  export type compareInput = { storedPassword: string, suppliedPassword: string }
}
