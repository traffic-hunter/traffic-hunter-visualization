import { AxiosError } from 'axios'
import { HttpProblem } from '../types/HttpProblem'

export class HttpError extends Error {
  constructor(
    public readonly problem: HttpProblem,
    public readonly originalError: AxiosError<HttpProblem>
  ) {
    super(problem.detail)
    this.name = 'HttpError'
  }

  static isProblem(data: unknown): data is HttpProblem {
    if (!data || typeof data !== 'object') return false
    
    return (
      'type' in data &&
      'title' in data &&
      'status' in data &&
      'detail' in data &&
      'instance' in data
    )
  }
}