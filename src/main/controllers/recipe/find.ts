import { FindRecipes, FindRecipesService } from '@/domain/use-cases/recipe'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipesController extends Controller {
  constructor (
    private readonly findRecipesService: FindRecipesService
  ) {
    super()
  }

  async perform (params: FindRecipes.Input): Promise<HttpResponse<FindRecipes.Output>> {
    try {
      const recipes = await this.findRecipesService(params)
      return ok(recipes)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
