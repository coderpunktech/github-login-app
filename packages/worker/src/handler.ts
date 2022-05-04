export async function handleRequest(request: Request): Promise<Response> {
  const url: URL = new URL(request.url)
  const code: string | null = url.searchParams.get('code')
  
  const response: Response = await fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  })

  // read the body so I can extract the bearer token
  const body: any = await response.json()
  // prepare the cookie
  const newCookie: string = `bearer=${body.access_token}`

  // redirect to the client application with the cookie
  return new Response('', {
    status: 301,
    headers: {
      location: CLIENT_URL,
      'Set-Cookie': newCookie
    }
  })
}
