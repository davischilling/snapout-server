import { forbidden, HttpResponse, ok, Middleware } from '@/application/helpers'
import { Repository as AccountDbRepo } from '@/data/contracts/repos'
import { AccessTokenTypes } from '@/main/types'

type HttpRequest = { authorization?: string }
type Model = Error | { accountId: string }
type Authorize = (params: { token: string }) => Promise<{ id: string, type: AccessTokenTypes }>

export class OperatorAuthenticationMiddleware implements Middleware {
  constructor (
    private readonly authorize: Authorize,
    private readonly accountRepo: AccountDbRepo,
    private readonly role: string[],
    private readonly type: AccessTokenTypes
  ) {}

  async handle ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (authorization === '' || authorization === undefined || authorization === null) {
      return forbidden()
    }
    try {
      const { id: accountId, type } = await this.authorize({ token: authorization })
      if (this.type !== type) {
        return forbidden()
      }
      const account = await this.accountRepo.findById(accountId)
      if (!this.role.includes(account.role)) {
        return forbidden()
      }
      return ok({ accountId })
    } catch {
      return forbidden()
    }
  }
}
