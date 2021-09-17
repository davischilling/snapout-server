import { AxiosHttpClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let url: string
  let params: object
  let fakeAxios: jest.Mocked<typeof axios>
  let sut: AxiosHttpClient

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_data'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    it('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('should return data on success', async () => {
      const axiosResult = await sut.get({ url, params })

      expect(axiosResult).toEqual('any_data')
    })

    it('should rethrow if axios.get throws', async () => {
      fakeAxios.get.mockRejectedValueOnce(new Error('http_error'))

      const promise = sut.get({ url, params })

      await expect(promise).rejects.toThrow(new Error('http_error'))
    })
  })
  // describe('post', () => {
  //   it('', () => {

  //   })
  // })
})
