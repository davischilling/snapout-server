export type FindMemberByIdAndDeleteService = (params: FindMemberByIdAndDelete.Input) => Promise<FindMemberByIdAndDelete.Output>

export namespace FindMemberByIdAndDelete {
  export type Input = { id: string }
  export type Output = { id: string } | Error
}
