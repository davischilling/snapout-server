import { Repository as MemberDbRepo } from '@/data/contracts/repos'
import { Member, MemberPageInfo, Paragraph, Social } from '@/data/entities'
import { FindMemberByIdAndUpdateService } from '@/domain/use-cases'

type setup = (
  memberRepo: MemberDbRepo,
) => FindMemberByIdAndUpdateService

export const setupFindMemberByIdAndUpdate: setup = (memberRepo) => async params => {
  const member: Member = await memberRepo.findById(params.id)
  const { memberPageInfo: memberPageInfoParams, ...updatedMemberParams } = params
  const { paragraphs, socials, ...memberPageInfo } = memberPageInfoParams
  const paragraphEntities = []
  const socialEntities = []
  for (const paragraph of paragraphs) {
    paragraphEntities.push(new Paragraph(paragraph))
  }
  for (const social of socials) {
    socialEntities.push(new Social(social))
  }
  const updatedMemberPageInfo = new MemberPageInfo({
    ...memberPageInfo,
    paragraphs: paragraphEntities,
    socials: socialEntities
  })
  const updatedMember = new Member({ ...member, ...updatedMemberParams, memberPageInfo: updatedMemberPageInfo })
  return await memberRepo.findByIdAndUpdate(params.id, updatedMember)
}
