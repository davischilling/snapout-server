import { FindRecipeByIdAndDelete, FindRecipeByIdAndDeleteService } from '@/domain/use-cases/recipe'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeByIdAndDeleteController extends Controller {
  constructor (
    private readonly findRecipeByIdAndDeleteService: FindRecipeByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindRecipeByIdAndDelete.Input): Promise<HttpResponse<FindRecipeByIdAndDelete.Output>> {
    try {
      const id = await this.findRecipeByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
