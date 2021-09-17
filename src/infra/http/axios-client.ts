import { HttpGetClient } from '@/data/contracts/http'

import axios from 'axios'

type Params = HttpGetClient.Params

export class AxiosHttpClient implements HttpGetClient {
  async get <T = any> ({ url, params }: Params): Promise<T> {
    const { data } = await axios.get(url, { params })
    return data
  }
}
