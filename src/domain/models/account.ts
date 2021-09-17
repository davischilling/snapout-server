export type AccountData = {
  id?: string
  name?: string
  email: string
  password?: string
  phone?: string
  role?: RoleType
}

export enum RoleType {
  admin = 'ADMINISTRATOR',
  operator = 'OPERATOR'
}
