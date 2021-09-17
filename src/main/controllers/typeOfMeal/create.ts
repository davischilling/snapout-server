import { Controller } from '@/application/controllers'
import { created, HttpResponse, unauthorized } from '@/application/helpers'
import { CreateTypeOfMeal, CreateTypeOfMealService } from '@/domain/use-cases/typeOfMeal'

export class CreateTypeOfMealController extends Controller {
  constructor(
    private readonly createTypeOfMeal: CreateTypeOfMealService
  ) {
    super()
  }

  async perform(params: CreateTypeOfMeal.Input): Promise<HttpResponse<CreateTypeOfMeal.Output>> {
    try {
      const id = await this.createTypeOfMeal(params)
      return created(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }

}
