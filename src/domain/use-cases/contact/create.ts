export type CreateContactService = (params: CreateContact.input) => Promise<CreateContact.output>

export namespace CreateContact {
  export type ContactInputs = {
    message: string
    email: string
    eventManager: string
    phone: string
  }
  export type input = ContactInputs
  export type output = { id: string } | Error
}
