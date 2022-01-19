export interface ISuccessLogin{
  message?: string
  token?: string
}

export interface IFailedLogin{
  message?: string
  error?: string
  headers?: string
  status?: number
  ok?: boolean
}
