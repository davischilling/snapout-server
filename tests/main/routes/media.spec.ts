import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { MediaEntity as MediaRepoModel, MediaAttrs } from '@/infra/mongodb/entities'
import { Media } from '@/data/entities'
import { MediaData } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewMedia = async (media: MediaData): Promise<string> => {
  const mediaAttrs: MediaAttrs = new Media(media)
  const newMedia = MediaRepoModel.build(mediaAttrs)
  const saved = await newMedia.save()
  return saved._id.toString()
}

describe('Media Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let media: MediaData
  let accessToken: string

  beforeAll(async () => {
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  beforeEach(async () => {
    const { accessToken: token } = await signUpSetup({
      email: 'test@test.com', password: '1234'
    })
    accessToken = token
    media = {
      youtubeUrlId: 'any_youtubeUrlId',
      videoTitle: 'any_videoTitle'
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/medias - should return 201 with the new media ID', async () => {
    const { status, body } = await request(app)
      .post('/api/medias')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send(media)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/medias - should return 200 with the number of returned items and list of medias', async () => {
    const mediaId1 = await makeNewMedia(media)
    const mediaId2 = await makeNewMedia(media)

    const { status, body } = await request(app)
      .get('/api/medias')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(mediaId1)
    expect(body.data[1].id).toBe(mediaId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/medias/:id - should return 200 with media', async () => {
    const mediaId1 = await makeNewMedia(media)

    const { status, body } = await request(app)
      .get(`/api/medias/${mediaId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(mediaId1)
  })

  it('PATCH /api/medias/:id - should return 200 with updated media', async () => {
    const mediaId1 = await makeNewMedia(media)

    const { status, body } = await request(app)
      .patch(`/api/medias/${mediaId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        youtubeUrlId: 'any_youtubeUrlId', videoTitle: 'new_videoTitle'
      })

    expect(status).toBe(200)
    expect(body.id).toBe(mediaId1)
    expect(body.videoTitle).toBe('new_videoTitle')
  })

  it('DELETE /api/medias/:id - should return 200 with updated media', async () => {
    const mediaId1 = await makeNewMedia(media)

    const { status, body } = await request(app)
      .delete(`/api/medias/${mediaId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(mediaId1)

    const findMedia = await MediaRepoModel.findById({ _id: mediaId1 })

    expect(findMedia).toBe(null)
  })
})
