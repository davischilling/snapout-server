import './config/module-alias'
import { app } from '@/main/config/app'
import { env, serverEnv } from '@/main/config/env'

import mongoose from 'mongoose'

const start = async (): Promise<void> => {
  console.log('Starting snapout server...')

  const processEnv = env(['TOKEN_EXPIRATION', 'NODE_ENV', 'PORT', 'DB_NAME', 'MONGO_URI', 'JWT_SECRET', 'CLIENT_URL'])
  if (processEnv instanceof Error) {
    throw processEnv
  }
  const { mongo_uri, db_name, port }: serverEnv = processEnv

  try {
    await mongoose.connect(mongo_uri, {
      dbName: db_name,
      autoIndex: true
    })
    console.log('Connected to mongodb')
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
