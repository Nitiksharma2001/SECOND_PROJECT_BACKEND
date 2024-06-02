export const httpCodes = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,

  RESPONSE_OK: 200, // You asked for something, and the server was able to deliver it
  CREATED: 201,
  ACCEPTED: 202, // your request might take a while to process, so the server acknowledges receiving it but says, "I'll get to work on that, but it might take a bit
  NO_CONTENT: 204, // Like DELETE REQUEST

  INTERNAL_SERVER_ERROR: 500,
  SERVER_UNAVAILABLE: 503,
}
