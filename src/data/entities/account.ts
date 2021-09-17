import { AccountData, RoleType } from '@/domain/models'

export class Account {
  id?: string
  name?: string
  email: string
  password?: string
  phone?: string
  role?: RoleType

  constructor (
    accountData: AccountData
  ) {
    const {
      id,
      name,
      email,
      password,
      phone,
      role
    } = accountData
    if (id !== undefined) {
      this.id = id
    }
    if (password !== undefined) {
      this.password = password
    }
    this.role = role
    this.email = email
    this.name = name
    this.phone = phone
  }

  static update (account: Account, params: any): Account {
    return new Account({ ...account, ...params })
  }
}
