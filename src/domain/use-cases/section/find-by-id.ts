import { SectionData } from '@/domain/models'

export type FindSectionByIdService = (params: FindSectionById.Input) => Promise<FindSectionById.Output>

export namespace FindSectionById {
  export type Input = { id: string }
  export type Output = { section: SectionData } | Error
}
