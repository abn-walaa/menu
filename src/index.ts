import { Hono, } from 'hono'
import { HTTPException, } from 'hono/http-exception'
import { showRoutes, } from 'hono/dev'
import langs from "@routers/langs"
const app = new Hono({



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

app.route('/langs', langs);
app.onError((err, c) => {
  // console.log(err.constructor.name)
  // console.log(err)

  return c.json({
    status: "done",
    message: err.message,
    code: err instanceof HTTPException ? err.status : 400,
    cause: err.cause
  })
})

showRoutes(app, {
  verbose: true,
})


export default {

  fetch: app.fetch,
  port: 3000
}
