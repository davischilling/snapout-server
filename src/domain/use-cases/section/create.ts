export type CreateSectionService = (params: CreateSection.Input) => Promise<CreateSection.Output>

export namespace CreateSection {
  export type SectionInputs = {
    menuName: string
    entityName: string
    sectionTitle: string
  }
  export type Input = SectionInputs
  export type Output = { id: string } | Error
}
