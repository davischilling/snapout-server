import { MemberPageInfoData, ParagraphData, SocialData } from '@/domain/models'

export class MemberPageInfo {
  pageTitlePicture: string;
  title: string;
  paragraphs: ParagraphData[];
  socialsPhrase: string;
  socials: SocialData[];

  constructor (
    MemberPageInfoData: MemberPageInfoData
  ) {
    const {
      pageTitlePicture,
      title,
      paragraphs,
      socialsPhrase,
      socials
    } = MemberPageInfoData
    this.pageTitlePicture = pageTitlePicture
    this.title = title
    this.paragraphs = paragraphs
    this.socialsPhrase = socialsPhrase
    this.socials = socials
  }
}
