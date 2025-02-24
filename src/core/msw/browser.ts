import { setupWorker } from 'msw/browser'
import { handlers } from '@core/msw/handlers'

export const worker = setupWorker(...handlers)