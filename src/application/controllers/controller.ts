import { HttpResponse, serverError } from '@/application/helpers'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error: any) {
      // if (process.env.NODE_ENV === 'development') {
      //   console.log(error)
      // }
      return serverError(error)
    }
  }
}
