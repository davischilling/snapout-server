import mongoose, { Connection, Mongoose } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer
let mongoOrm: Mongoose

type ConnectionDB = {
  mongoServer: MongoMemoryServer
  mongoOrm: Mongoose
}

/**
 * Connect to the in-memory database.
 */
export const connect = async (): Promise<ConnectionDB> => {
  mongoServer = await MongoMemoryServer.create()
  mongoOrm = mongoose
  await mongoOrm.connect(mongoServer.getUri(),
    {
      dbName: 'mongodb_test',
      autoIndex: true
    }
  )
  return { mongoServer, mongoOrm }
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async ({ mongoServer, mongoOrm }: ConnectionDB): Promise<void> => {
  await mongoOrm.connection.close()
  await mongoServer.stop()
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async (collections: Connection['collections']): Promise<void> => {
  // const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}
