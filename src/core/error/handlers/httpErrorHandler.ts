import { AxiosError } from 'axios'
import { HttpError } from '../exceptions/HttpError'
import { HttpProblem } from '../types/HttpProblem'

export const handleHttpError = (error: AxiosError<HttpProblem>): never => {
  if (error.response?.data && HttpError.isProblem(error.response.data)) {
    throw new HttpError(error.response.data, error)
  }
  throw error
}