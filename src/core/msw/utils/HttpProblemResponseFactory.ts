import { HttpResponse } from 'msw'
import { HttpProblem } from '@core/error/types/HttpProblem'

export type HttpStatus = 400 | 401 | 403 | 404 | 500

export class HttpProblemResponseFactory {
  private static instance: HttpProblemResponseFactory

  private constructor() {}

  public static getInstance(): HttpProblemResponseFactory {
    if (!HttpProblemResponseFactory.instance) {
      HttpProblemResponseFactory.instance = new HttpProblemResponseFactory()
    }
    return HttpProblemResponseFactory.instance
  }

  private getTitle(status: HttpStatus): string {
    switch (status) {
      case 400:
        return 'Bad Request'
      case 401:
        return 'Unauthorized'
      case 403:
        return 'Forbidden'
      case 404:
        return 'Not Found'
      case 500:
        return 'Internal Server Error'
    }
  }

  private createProblem(
    status: HttpStatus,
    detail: string,
    instance: string
  ): HttpProblem {
    return {
      type: 'about:blank',
      title: this.getTitle(status),
      status,
      detail,
      instance
    }
  }

  public createResponse(
    status: HttpStatus,
    detail: string,
    instance: string
  ): HttpResponse {
    const problem = this.createProblem(status, detail, instance)

    return new HttpResponse(JSON.stringify(problem), {
      status,
      headers: {
        'Content-Type': 'application/problem+json'
      }
    })
  }

  public badRequest(detail: string, instance: string): HttpResponse {
    return this.createResponse(400, detail, instance)
  }

  public unauthorized(detail: string, instance: string): HttpResponse {
    return this.createResponse(401, detail, instance)
  }

  public forbidden(detail: string, instance: string): HttpResponse {
    return this.createResponse(403, detail, instance)
  }

  public notFound(detail: string, instance: string): HttpResponse {
    return this.createResponse(404, detail, instance)
  }

  public internalServerError(detail: string, instance: string): HttpResponse {
    return this.createResponse(500, detail, instance)
  }
}

export const httpProblemResponseFactory = HttpProblemResponseFactory.getInstance()