import { FindRecipeItemByIdAndUpdate, FindRecipeItemByIdAndUpdateService } from '@/domain/use-cases/recipeItem'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeItemByIdAndUpdateController extends Controller {
  constructor (
    private readonly findRecipeItemByIdAndUpdateService: FindRecipeItemByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindRecipeItemByIdAndUpdate.Input): Promise<HttpResponse<FindRecipeItemByIdAndUpdate.Output>> {
    try {
      const recipeItem = await this.findRecipeItemByIdAndUpdateService(params)
      return ok(recipeItem)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
