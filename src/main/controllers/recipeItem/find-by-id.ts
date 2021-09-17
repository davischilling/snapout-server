import { FindRecipeItemById, FindRecipeItemByIdService } from '@/domain/use-cases/recipeItem'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeItemByIdController extends Controller {
  constructor (
    private readonly findRecipeItemByIdService: FindRecipeItemByIdService
  ) {
    super()
  }

  async perform (params: FindRecipeItemById.Input): Promise<HttpResponse<FindRecipeItemById.Output>> {
    try {
      const recipeItem = await this.findRecipeItemByIdService(params)
      return ok(recipeItem)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
