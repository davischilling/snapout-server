import { FindTypeOfMealByIdAndUpdate, FindTypeOfMealByIdAndUpdateService } from '@/domain/use-cases/typeOfMeal'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindTypeOfMealByIdAndUpdateController extends Controller {
  constructor (
    private readonly findTypeOfMealByIdAndUpdateService: FindTypeOfMealByIdAndUpdateService
  ) {
    super()
  }

  async perform (params: FindTypeOfMealByIdAndUpdate.Input): Promise<HttpResponse<FindTypeOfMealByIdAndUpdate.Output>> {
    try {
      const typeOfMeal = await this.findTypeOfMealByIdAndUpdateService(params)
      return ok(typeOfMeal)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
