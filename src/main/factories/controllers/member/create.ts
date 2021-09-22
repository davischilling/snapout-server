import { CreateMemberController } from '@/main/controllers'
import { makeCreateMember } from '@/main/factories/services'

export const makeCreateMemberController = async (): Promise<CreateMemberController> => {
  const createMemberService = await makeCreateMember()
  return new CreateMemberController(createMemberService)
}
