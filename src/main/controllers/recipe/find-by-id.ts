import { FindRecipeById, FindRecipeByIdService } from '@/domain/use-cases/recipe'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeByIdController extends Controller {
  constructor (
    private readonly findRecipeByIdService: FindRecipeByIdService
  ) {
    super()
  }

  async perform (params: FindRecipeById.Input): Promise<HttpResponse<FindRecipeById.Output>> {
    try {
      const recipe = await this.findRecipeByIdService(params)
      return ok(recipe)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
