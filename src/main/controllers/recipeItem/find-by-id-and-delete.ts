import { FindRecipeItemByIdAndDelete, FindRecipeItemByIdAndDeleteService } from '@/domain/use-cases/recipeItem'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindRecipeItemByIdAndDeleteController extends Controller {
  constructor (
    private readonly findRecipeItemByIdAndDeleteService: FindRecipeItemByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindRecipeItemByIdAndDelete.Input): Promise<HttpResponse<FindRecipeItemByIdAndDelete.Output>> {
    try {
      const id = await this.findRecipeItemByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
