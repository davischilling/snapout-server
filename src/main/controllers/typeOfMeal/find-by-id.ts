import { FindTypeOfMealById, FindTypeOfMealByIdService } from '@/domain/use-cases/typeOfMeal'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindTypeOfMealByIdController extends Controller {
  constructor (
    private readonly findTypeOfMealByIdService: FindTypeOfMealByIdService
  ) {
    super()
  }

  async perform (params: FindTypeOfMealById.Input): Promise<HttpResponse<FindTypeOfMealById.Output>> {
    try {
      const typeOfMeal = await this.findTypeOfMealByIdService(params)
      return ok(typeOfMeal)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
