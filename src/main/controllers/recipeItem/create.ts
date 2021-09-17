import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateRecipeItem, CreateRecipeItemService } from '@/domain/use-cases/recipeItem'

export class CreateRecipeItemController extends Controller {
  constructor(
    private readonly createRecipeItem: CreateRecipeItemService
  ) {
    super()
  }

  async perform(params: CreateRecipeItem.Input): Promise<HttpResponse<CreateRecipeItem.Output>> {
    try {
      const id = await this.createRecipeItem(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
