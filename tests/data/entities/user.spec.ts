/* eslint-disable @typescript-eslint/no-unused-vars */

import { User } from '@/data/entities'
import { GenderType, PhysicalActivityLevelType, UserData } from '@/domain/models'
import { UnauthorizedError } from '@/data/errors'

describe('User', () => {
  let userData: UserData
  let spyKatchMcArdle: any
  let spyMifflinStJeor: any
  let sut: User

  beforeAll(() => {
    spyMifflinStJeor = jest.spyOn(User.prototype, 'mifflinStJeor')
    spyKatchMcArdle = jest.spyOn(User.prototype, 'katchMcArdle') // spy on the method of the prototype
  })

  beforeEach(() => {
    userData = {
      accountId: 'any_user_account_id',
      gender: GenderType.masculine,
      age: 32,
      height: 173,
      initialWeight: 67,
      initialBodyFat: 9,
      physicalActivityLevel: PhysicalActivityLevelType.fourToFive
    }
  })

  it('should fill the attrs on the constructor with correct params', () => {
    sut = new User(userData)

    userData.basalMetabolicRate = sut.basalMetabolicRate
    userData.objectives = []

    expect(sut).toEqual(userData)
  })

  it('should update an user correctly', () => {
    sut = new User(userData)
    sut.id = 'any_user_id'

    const updatedUser = User.update(sut, { age: 33, physicalActivityLevel: PhysicalActivityLevelType.athlete })
    sut.age = 33
    sut.physicalActivityLevel = PhysicalActivityLevelType.athlete

    expect(updatedUser).toEqual(sut)
  })

  it('should call katchMcArdle method if initialBodyFat is present with correct params', () => {
    sut = new User(userData)

    expect(spyKatchMcArdle).toHaveBeenCalledWith(67, 9)
    expect(spyKatchMcArdle).toHaveBeenCalledTimes(1)
  })

  it('should calculate and fill the basalMetabolicRate with the katchMcArdle method', () => {
    sut = new User(userData)

    expect(sut.basalMetabolicRate).toBe(1686.952)
  })

  it('should call mifflinStJeor method if initialBodyFat is empty with correct params', () => {
    delete userData.initialBodyFat

    sut = new User(userData)

    expect(spyMifflinStJeor).toHaveBeenCalledWith(67, 173, 32, GenderType.masculine)
    expect(spyMifflinStJeor).toHaveBeenCalledTimes(1)
  })

  it('should calculate and fill the basalMetabolicRate with the mifflinStJeor method for men', () => {
    delete userData.initialBodyFat

    sut = new User(userData)

    expect(sut.basalMetabolicRate).toBe(1596.25)
  })

  it('should calculate and fill the basalMetabolicRate with the mifflinStJeor method for women', () => {
    delete userData.initialBodyFat
    userData.gender = GenderType.feminine

    sut = new User(userData)

    expect(sut.basalMetabolicRate).toBe(1430.25)
  })
})
