import { FindRecipeByIdAndUpdate, FindRecipeByIdAndUpdateService } from '@/domain/use-cases/recipe'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeByIdAndUpdateController extends Controller {
  constructor (
    private readonly findRecipeByIdAndUpdateService: FindRecipeByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindRecipeByIdAndUpdate.Input): Promise<HttpResponse<FindRecipeByIdAndUpdate.Output>> {
    try {
      const recipe = await this.findRecipeByIdAndUpdateService(params)
      return ok(recipe)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
