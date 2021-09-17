export type serverEnv = { mongo_uri: string, db_name: string, port: number }

export const env = (envVariables: string[]): serverEnv | Error => {
  envVariables.forEach(variable => {
    if (process.env[variable] === undefined) {
      return new Error(`${variable} must be defined`)
    }
  })
  return {
    mongo_uri: process.env.MONGO_URI as string,
    db_name: process.env.DB_NAME as string,
    port: Number(process.env.PORT)
  }
}
