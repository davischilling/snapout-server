import { FindTypeOfMeals, FindTypeOfMealsService } from '@/domain/use-cases/typeOfMeal'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindTypeOfMealsController extends Controller {
  constructor (
    private readonly findTypeOfMealsService: FindTypeOfMealsService
  ) {
    super()
  }

  async perform (params: FindTypeOfMeals.Input): Promise<HttpResponse<FindTypeOfMeals.Output>> {
    try {
      const typeOfMeals = await this.findTypeOfMealsService(params)
      return ok(typeOfMeals)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
