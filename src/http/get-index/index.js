// Add simple, fast, scalable persistence: https://docs.begin.com/en/data/begin-data/
// let data = require('@begin/data')

// Add secure sessions, middleware, and more: https://docs.begin.com/en/functions/http/
// let arc = require('@architect/functions')

// TODO: modify the body object!
let body = (req) => `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>tests2text</title>
  </head>
  <body>
    <h1>Tests 2 Text</h1>
    <p>
      What does the code do? See the test descriptions, extracted from the given test file.
      Maybe this allows you to see possible improvements for your tests descriptions, go for it. Improve!
    </p>
    <p>
      queryStringParameters: <pre>${req.queryStringParameters}</pre><br />
      multiValueQueryStringParameters: <pre>${req.multiValueQueryStringParameters}</pre><br />
      pathParameters: <pre>${req.pathParameters}</pre><br />
    </p>

  </body>
</html>
`;

exports.handler = async function http(req) {
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: body(req)
  }
};

// Example responses

/* Forward requester to a new path
exports.handler = async function http (req) {
  return {
    statusCode: 302,
    headers: {'location': '/about'}
  }
}
*/

/* Respond with successful resource creation, CORS enabled
let arc = require('@architect/functions')
exports.handler = arc.http.async (http)
async function http (req) {
  return {
    statusCode: 201,
    headers: {'content-type': 'application/json; charset=utf8'},
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/

/* Deliver client-side JS
exports.handler = async function http (req) {
  return {
    headers: {'content-type': 'text/javascript; charset=utf8'},
    body: 'console.log("Hello world!")',
  }
}
*/
