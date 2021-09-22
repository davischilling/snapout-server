export type CreateMediaService = (params: CreateMedia.Input) => Promise<CreateMedia.Output>

export namespace CreateMedia {
  export type MediaInputs = {
    youtubeUrlId: string
    videoTitle: string
  }
  export type Input = MediaInputs
  export type Output = { id: string } | Error
}
