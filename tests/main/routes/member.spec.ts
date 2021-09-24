import { app } from '@/main/config/app'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'
import { signUpSetup } from '@/tests/main/routes/setup'
import { MemberEntity as MemberRepoModel, MemberAttrs } from '@/infra/mongodb/entities'
import { Member } from '@/data/entities'
import { MemberData, RoleType, SocialTypes } from '@/domain/models'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'
import request from 'supertest'

const makeNewMember = async (member: MemberData): Promise<string> => {
  const memberAttrs: MemberAttrs = new Member(member)
  const newMember = MemberRepoModel.build(memberAttrs)
  const saved = await newMember.save()
  return saved._id.toString()
}

describe('Member Routes', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let member: MemberData
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
    member = {
      name: 'any_name',
      role: 'any_role',
      image: 'any_image',
      alt: 'any_alt',
      memberUrlPage: 'any_memberUrlPage',
      memberPageInfo: {
        pageTitlePicture: 'any_pageTitlePicture',
        title: 'any_title',
        paragraphs: [{
          paragraph: 'any_paragraph'
        }],
        socialsPhrase: 'any_socialsPhrase',
        socials: [{
          socialType: SocialTypes.facebook,
          socialUrl: 'any_socialUrl'
        }]
      }
    }
  })

  afterEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  it('POST /api/members - should return 201 with the new member ID', async () => {
    const { accessToken: adminToken } = await signUpSetup({
      email: 'test@test.com', password: '1234', role: RoleType.admin
    })
    const { status, body } = await request(app)
      .post('/api/members')
      .set('Accept', 'application/json')
      .set('Authorization', adminToken)
      .send(member)

    expect(status).toBe(201)
    expect(body.id).toBeDefined()
  })

  it('GET /api/members - should return 200 with the number of returned items and list of members', async () => {
    const memberId1 = await makeNewMember(member)
    const memberId2 = await makeNewMember(member)

    const { status, body } = await request(app)
      .get('/api/members')
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.items).toBe(2)
    expect(body.data[0].id).toBe(memberId1)
    expect(body.data[1].id).toBe(memberId2)
    expect(body.data[2]).toBeUndefined()
  })

  it('GET /api/members/:id - should return 200 with member', async () => {
    const memberId1 = await makeNewMember(member)

    const { status, body } = await request(app)
      .get(`/api/members/${memberId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(memberId1)
  })

  it('PATCH /api/members/:id - should return 200 with updated member', async () => {
    const memberId1 = await makeNewMember(member)

    const { status, body } = await request(app)
      .patch(`/api/members/${memberId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)
      .send({
        name: 'any_name',
        role: 'any_role',
        image: 'any_image',
        alt: 'any_alt',
        memberUrlPage: 'any_memberUrlPage',
        memberPageInfo: {
          pageTitlePicture: 'any_pageTitlePicture',
          title: 'any_title',
          paragraphs: [{
            paragraph: 'any_paragraph'
          }],
          socialsPhrase: 'any_socialsPhrase',
          socials: [{
            socialType: SocialTypes.facebook,
            socialUrl: 'any_socialUrl'
          }, {
            socialType: SocialTypes.instagram,
            socialUrl: 'any_socialUrl1'
          }]
        }
      })

    expect(status).toBe(200)
    expect(body.id).toBe(memberId1)
    expect(body.memberPageInfo.socials.length).toBe(2)
  })

  it('DELETE /api/members/:id - should return 200 with updated member', async () => {
    const memberId1 = await makeNewMember(member)

    const { status, body } = await request(app)
      .delete(`/api/members/${memberId1}`)
      .set('Accept', 'application/json')
      .set('Authorization', accessToken)

    expect(status).toBe(200)
    expect(body.id).toBe(memberId1)

    const findMember = await MemberRepoModel.findById({ _id: memberId1 })

    expect(findMember).toBe(null)
  })
})
