import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateRecipe, CreateRecipeService } from '@/domain/use-cases/recipe'

export class CreateRecipeController extends Controller {
  constructor(
    private readonly createRecipe: CreateRecipeService
  ) {
    super()
  }

  async perform(params: CreateRecipe.Input): Promise<HttpResponse<CreateRecipe.Output>> {
    try {
      const id = await this.createRecipe(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
