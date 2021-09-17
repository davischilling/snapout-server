import { Crypto } from '@/infra/crypto'

export const makeCryto = (): Crypto => {
  return new Crypto()
}
