import { type NextRequest } from 'next/server'

const KGS_API_ENDPOINT = 'https://www.gokgs.com/json-cors/access'

const cookieFromRequest = (request: NextRequest) => {
  const sessionIDCookie = request.cookies.get('JSESSIONID')

  return sessionIDCookie
    ? `${sessionIDCookie.name}=${sessionIDCookie.value}`
    : ''
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const cookie = cookieFromRequest(request)

  const response = await fetch(KGS_API_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { cookie },
  })

  return response
}

export async function GET(request: NextRequest) {
  const cookie = cookieFromRequest(request)

  const response = await fetch(KGS_API_ENDPOINT, { headers: { cookie } })

  return response
}
