export interface Repository {
  docFormat: (repo: any) => any
  create: (params: any) => Promise<string>
  find: (params: any) => Promise<{ items: number, data: any[] }>
  findById: (id: string) => Promise<any>
  findByIdAndUpdate: (id: string, updatedObj: any) => Promise<any>
  findByIdAndDelete: (id: string) => Promise<string>
}
