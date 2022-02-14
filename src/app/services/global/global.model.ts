export default class GlobalVars {
  public static asMessageError: string
  public static asMessageSuccess: string
  public static baseURL: string = 'http://localhost:3333'
}

export interface IRequest{
  error: string
  message: string
  authError: string
}
