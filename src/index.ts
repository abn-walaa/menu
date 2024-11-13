import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes, } from 'hono/dev'

const app = new Hono({
  getPath: (req) => {
    const result = req.url.match(/(?:http[s]*\:\/\/)*(.*?)\./i);

    if (result !== null)
      return '/subdomin/' + result[1]
    return req.url
  },
});

app.get('/subdomin/*', (c) => c.text("hello sub   " + c.req.path));

app.get('/*', (c) => {
  console.log("-----------------------");
  throw new HTTPException(500, {
    message: ":D", cause: {
      hello: "aa"
    }
  })
  return c.text('Matched route with .r');
});

app.onError((err, c) => {
  return c.json({
    status: "done",
    message: err.message,
    code: err instanceof HTTPException ? err.status : 400
  })
})

showRoutes(app, {
  verbose: true,
})

export default {
  fetch: app.fetch,
  port: 3003
}
