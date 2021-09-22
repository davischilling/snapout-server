import { Media } from '@/data/entities'
import { MediaData } from '@/domain/models'
import { MediaAttrs, MediaEntity as MediaRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewMedia = async (media: MediaData): Promise<string> => {
  const mediaAttrs: MediaAttrs = new Media(media)
  const newMedia = MediaRepoModel.build(mediaAttrs)
  const saved = await newMedia.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let mediaData: MediaData
  let media: Media
  let sut: MongoDbRepository

  beforeAll(async () => {
    mediaData = {
      youtubeUrlId: 'any_youtubeUrlId', videoTitle: 'any_videoTitle'
    }
    media = new Media(mediaData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.media)
  })

  describe('create', () => {
    it('should create an media and return an id', async () => {
      const id = await sut.create(media)

      const createdMedia = await MediaRepoModel.findById({ _id: id })

      expect(createdMedia).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of medias', async () => {
      const idMedia1 = await makeNewMedia(media)
      const idMedia2 = await makeNewMedia(media)

      const medias = await sut.find({})

      expect(medias.items).toBe(2)
      expect(medias.data[0].id).toBe(idMedia1)
      expect(medias.data[1].id).toBe(idMedia2)
    })
  })

  describe('findById', () => {
    it('should return an media', async () => {
      const mediaId = await makeNewMedia(media)

      const mediaFound = await sut.findById(mediaId)

      expect(mediaFound.id).toBe(mediaId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an media', async () => {
      const mediaId = await makeNewMedia(media)

      const mediaFound = await sut.findByIdAndUpdate(mediaId, { videoTitle: 'new_videoTitle' })

      expect(mediaFound.videoTitle).toBe('new_videoTitle')
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an media', async () => {
      const mediaId = await makeNewMedia(media)
      const mediasFind1 = await sut.find({})

      const mediaDeletedId = await sut.findByIdAndDelete(mediaId)
      const mediasFind2 = await sut.find({})

      expect(mediaId).toBe(mediaDeletedId)
      expect(mediasFind1.items).toBe(1)
      expect(mediasFind2.items).toBe(0)
    })
  })
})
