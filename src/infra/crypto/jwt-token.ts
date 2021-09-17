import { Token } from '@/data/contracts/crypto'

import { JwtPayload, sign, verify } from 'jsonwebtoken'

export class JwtToken implements Token {
  constructor (
    private readonly secret: string
  ) {}

  async generate ({ key, expirationInMs }: Token.GenerateParams): Promise<Token.GenerateResult> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validate ({ token }: Token.ValidateParams): Promise<Token.ValidateResult> {
    const payload = verify(token, this.secret) as JwtPayload
    return payload.key
  }
}
