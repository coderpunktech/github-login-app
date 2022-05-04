import { handleRequest } from './handler'

declare global {
  const CLIENT_ID: string
  const CLIENT_SECRET: string
  const CLIENT_URL: string
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
