import { MemberData, SocialTypes } from '@/domain/models'

export type FindMembersService = (params: FindMembers.Input) => Promise<FindMembers.Output>

export namespace FindMembers {
  export type Input = {
    name?: string
    role?: string
    image?: string
    alt?: string
    memberUrlPage?: string
    memberPageInfo?: {
      pageTitlePicture?: string;
      title?: string;
      paragraphs?: [{
        paragraph: string;
      }];
      socialsPhrase?: string;
      socials?: [{
        socialType?: SocialTypes;
        socialUrl?: string;
    }];
  }
  }
  export type Output = { items: number, data: MemberData[] } | Error
}
