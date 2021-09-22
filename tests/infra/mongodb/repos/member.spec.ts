import { Member } from '@/data/entities'
import { MemberData, SocialTypes } from '@/domain/models'
import { MemberAttrs, MemberEntity as MemberRepoModel } from '@/infra/mongodb/entities'
import { MongoDbRepository } from '@/infra/mongodb/repos'
import { MongoDbRepoTypes } from '@/main/types/mongodb-repo'
import { clearDatabase, closeDatabase, connect } from '@/tests/infra/mongodb/mocks'

import MongoMemoryServer from 'mongodb-memory-server-core'
import { Mongoose } from 'mongoose'

const makeNewMember = async (member: MemberData): Promise<string> => {
  const memberAttrs: MemberAttrs = new Member(member)
  const newMember = MemberRepoModel.build(memberAttrs)
  const saved = await newMember.save()
  return saved._id.toString()
}

describe('MongoDbRepository', () => {
  let mongoServer: MongoMemoryServer
  let mongoOrm: Mongoose
  let memberData: MemberData
  let member: Member
  let sut: MongoDbRepository

  beforeAll(async () => {
    memberData = {
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
    member = new Member(memberData)
    const db = await connect()
    mongoServer = db.mongoServer
    mongoOrm = db.mongoOrm
  })

  afterAll(async () => {
    await closeDatabase({ mongoServer, mongoOrm })
  })

  beforeEach(async () => {
    await clearDatabase(mongoOrm.connection.collections)
    sut = await MongoDbRepository.init('@/infra/mongodb/entities', MongoDbRepoTypes.member)
  })

  describe('create', () => {
    it('should create an member and return an id', async () => {
      const id = await sut.create(member)

      const createdMember = await MemberRepoModel.findById({ _id: id })

      expect(createdMember).toBeDefined()
    })
  })

  describe('find', () => {
    it('should return a list of members', async () => {
      const idMember1 = await makeNewMember(member)
      const idMember2 = await makeNewMember(member)

      const members = await sut.find({})

      expect(members.items).toBe(2)
      expect(members.data[0].id).toBe(idMember1)
      expect(members.data[1].id).toBe(idMember2)
    })
  })

  describe('findById', () => {
    it('should return an member', async () => {
      const memberId = await makeNewMember(member)

      const memberFound = await sut.findById(memberId)

      expect(memberFound.id).toBe(memberId)
    })
  })

  describe('findByIdAndUpdate', () => {
    it('should findById and update an member', async () => {
      const memberId = await makeNewMember(member)

      const memberFound = await sut.findByIdAndUpdate(memberId, {
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
            socialUrl: 'any_socialUrl1'
          }, {
            socialType: SocialTypes.instagram,
            socialUrl: 'any_socialUrl2'
          }]
        }
      })

      expect(memberFound.memberPageInfo.socials.length).toBe(2)
    })
  })

  describe('findByIdAndDelete', () => {
    it('should findById and delete an member', async () => {
      const memberId = await makeNewMember(member)
      const membersFind1 = await sut.find({})

      const memberDeletedId = await sut.findByIdAndDelete(memberId)
      const membersFind2 = await sut.find({})

      expect(memberId).toBe(memberDeletedId)
      expect(membersFind1.items).toBe(1)
      expect(membersFind2.items).toBe(0)
    })
  })
})
