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
})
app.get('/subdomin/*', (c) => c.text("hello sub"))
app.get('/*', (c) => {
  console.log("-----------------------")
  return c.text('Matched route with .r');
});
showRoutes(app, {
  verbose: true,
})
export default {
  fetch: app.fetch,
  port: 3000
}
