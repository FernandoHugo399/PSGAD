export interface ISuccessAuth{
  message?: string
}

export interface IFailedAuth{
  message?: string
  error?: {error: string, message: string}
  headers?: string
  status?: number
  ok?: boolean
}
