import { FindRecipeItems, FindRecipeItemsService } from '@/domain/use-cases/recipeItem'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeItemsController extends Controller {
  constructor (
    private readonly findRecipeItemsService: FindRecipeItemsService
  ) {
    super()
  }

  async perform (params: FindRecipeItems.Input): Promise<HttpResponse<FindRecipeItems.Output>> {
    try {
      const recipeItems = await this.findRecipeItemsService(params)
      return ok(recipeItems)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
