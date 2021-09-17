import { FindTypeOfMealByIdAndDelete, FindTypeOfMealByIdAndDeleteService } from '@/domain/use-cases/typeOfMeal'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'

export class FindTypeOfMealByIdAndDeleteController extends Controller {
  constructor (
    private readonly findTypeOfMealByIdAndDeleteService: FindTypeOfMealByIdAndDeleteService
  ) {
    super()
  }

  async perform (params: FindTypeOfMealByIdAndDelete.Input): Promise<HttpResponse<FindTypeOfMealByIdAndDelete.Output>> {
    try {
      const id = await this.findTypeOfMealByIdAndDeleteService(params)
      return ok(id)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
      return unauthorized()
    }
  }
}
