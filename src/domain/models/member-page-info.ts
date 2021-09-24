import { ParagraphData, SocialData } from '@/domain/models'

export type MemberPageInfoData = {
  pageTitlePicture: string
  title: string
  paragraphs: ParagraphData[]
  socialsPhrase: string
  socials: SocialData[]
}
