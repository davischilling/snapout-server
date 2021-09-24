import { Repository } from '@/data/contracts/repos/repository'
import { NotFoundError, ServerError } from '@/application/errors'
import { RepoDoc, RepoModel } from '@/tests/infra/mongodb/mocks'

import mongoose, { DocumentDefinition } from 'mongoose'

export class MongoDbRepository implements Repository {
  doc: RepoDoc | undefined

  constructor (
    readonly repo: RepoModel
  ) {}

  static async init (path: string, entity: string): Promise<MongoDbRepository> {
    try {
      const repo = (await import(`${path}/${entity}`)).default
      return new MongoDbRepository(repo)
    } catch (err) {
      throw new ServerError()
    }
  }

  docFormat (repo: DocumentDefinition<any>): any {
    const { _id, __v, ...updatedRepo } = repo._doc
    const id = _id.toString()
    const version = __v
    return {
      id,
      version,
      ...updatedRepo
    }
  }

  async create (params: any): Promise<string> {
    this.doc = this.repo.build(params)
    if (this.doc === undefined) {
      throw new ServerError()
    } else {
      const repo = await this.doc.save()
      return repo._id.toString()
    }
  }

  async find (params: any): Promise<{ items: number, data: any[] }> {
    const repos: any = await this.repo.find(params)
    const formattedRepos = repos.map((repo: mongoose._AllowStringsForIds<mongoose.LeanDocument<any>>) => {
      return this.docFormat(repo)
    })
    return {
      items: repos.length,
      data: formattedRepos
    }
  }

  async findById (id: string): Promise<any> {
    const repo: any = await this.repo.findById(id)
    if (repo === null) {
      throw new NotFoundError()
    } else {
      return this.docFormat(repo as DocumentDefinition<any>)
    }
  }

  async findByIdAndUpdate (id: string, updatedObj: any): Promise<any> {
    const repo: any = await this.repo.findByIdAndUpdate(id, updatedObj, { returnOriginal: false })
    if (repo === null) {
      throw new NotFoundError()
    } else {
      return this.docFormat(repo as DocumentDefinition<any>)
    }
  }

  async findByIdAndDelete (id: string): Promise<string> {
    const repo: any = await this.repo.findByIdAndDelete(id)
    if (repo === null) {
      throw new NotFoundError()
    } else {
      return repo._id.toString()
    }
  }
}
