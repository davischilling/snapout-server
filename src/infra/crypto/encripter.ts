import { Encripter } from '@/data/contracts/crypto'

import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scryptAsync = promisify(scrypt)

export class Crypto implements Encripter {
  async toHash (password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer

    return `${buf.toString('hex')}.${salt}`
  }

  async compare (encripterInput: Encripter.compareInput): Promise<boolean> {
    const [hashedPassword, salt] = encripterInput.storedPassword.split('.')
    const buf = (await scryptAsync(encripterInput.suppliedPassword, salt, 64)) as Buffer

    return buf.toString('hex') === hashedPassword
  }
}
