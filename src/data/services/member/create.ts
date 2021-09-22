import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { Member, MemberPageInfo, Paragraph, Social } from '@/data/entities'
import { CreateMemberService } from '@/domain/use-cases'

type setup = (
  memberRepo: MemberDbRepo,
) => CreateMemberService

export const setupCreateMember: setup = (memberRepo) => async (params) => {
  const { memberPageInfo: memberPageInfoParams, ...member } = params
  const { paragraphs, socials, ...memberPageInfo } = memberPageInfoParams
  let paragraphEntities = []
  let socialEntities = []
  for (const paragraph of paragraphs) {
    paragraphEntities.push(new Paragraph(paragraph))
  }
  for (const social of socials) {
    socialEntities.push(new Social(social))
  }
  const newMemberPageInfo = new MemberPageInfo({
    ...memberPageInfo,
    paragraphs: paragraphEntities,
    socials: socialEntities
  })
  const newMember = new Member({ ...member, memberPageInfo: newMemberPageInfo })
  const id = await memberRepo.create(newMember)
  return { id }
}
